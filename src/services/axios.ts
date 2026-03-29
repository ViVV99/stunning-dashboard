import axios, { 
  AxiosError, 
  type InternalAxiosRequestConfig, 
} from 'axios';
import { toast } from 'react-toastify';

// Interface para os itens da fila de espera
interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

// Extensão do tipo de configuração para incluir a flag de retentativa
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const httpClient = axios.create({
  baseURL: process.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};


httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;
    
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/auth/refresh' // Evita loop no refresh
    ) {
      if (isRefreshing) {
        // Adiciona à fila as outras requisições que falharam enquanto o refresh acontece
        return new Promise((resolve, reject) => {
          failedQueue.push({ 
            resolve: () => resolve(httpClient(originalRequest)), // Resolve executando a request original
            reject: (err: unknown) => reject(err) 
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await httpClient.post('/auth/refresh');
        
        // Processa a fila com sucesso
        processQueue(null);
        
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Se o refresh falhar, limpe tudo e deslogue o usuário
        processQueue(refreshError as AxiosError);
        
        // Clear auth data on refresh failure
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        
        toast.error("Expired session.");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Only show toast for non-401 errors (401s are handled above or are refresh requests)
    if (error.response?.status !== 401) {
      const message = (error.response?.data as {message ?: string })?.message || "An error has occurred";
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
export default httpClient;