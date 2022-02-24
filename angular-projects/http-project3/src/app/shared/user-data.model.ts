/*
 * we will use : https://jsonplaceholder.typicode.com/posts
 * and https://jsonplaceholder.typicode.com/comments
*/

export interface UserData {
    title: string;
    email: string;
}


export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

