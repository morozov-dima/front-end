
export interface ProductState {
    showProductCode: boolean;
    trigger: string; 
    currentProductId: number | null; // number or null
    products: Product[];
    error: string;
}


export interface Product {
    userId: number;
    id: number;
    title: string;
    body: string;
}

