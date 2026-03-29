import type Product from "./Product";

export default interface Sale {
    date: Date,
    amount: string,
    type: string,
    product: Product
}