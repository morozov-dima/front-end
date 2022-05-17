export interface UsersState {
    users: User[];
    error: string;
}


export interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    phoneNumber: string;
}