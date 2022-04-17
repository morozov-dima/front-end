
export interface PromotionsState {
    posts: PostsResponse[];
    error: string;
}


export interface PostsResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}