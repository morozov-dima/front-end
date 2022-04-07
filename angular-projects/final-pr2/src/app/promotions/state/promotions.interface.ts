export interface PromotionState {
    promotions: Promotion[];
    error: string;
}

export interface Promotion {
    id: number;
    title: string;
    body: string;
}