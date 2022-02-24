export interface UserData {
    title: string;
    email: string;
    albumTitle: string;
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


export interface Albums {
    userId: number;
    id: number;
    title: string;
}