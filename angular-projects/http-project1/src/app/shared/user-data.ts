
// https://jsonplaceholder.typicode.com/posts/1/comments
export interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}



// https://jsonplaceholder.typicode.com/posts?_limit=10
export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}



