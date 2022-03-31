
export interface ProductState {
    showProductCode: boolean;
    trigger: string; 
    products: Product[];
    error: string;
}


export interface Product {
    userId: number;
    id: number;
    title: string;
    body: string;
}

