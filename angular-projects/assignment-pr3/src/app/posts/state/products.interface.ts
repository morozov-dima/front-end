export interface ProductState {
    products: Product[],
    error: string;
}

export interface Product {
    postId: number;
    id: number;
    name: number;
    email: string;
    body: string;
}