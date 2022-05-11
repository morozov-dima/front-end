export interface UsersState {
    users: User[];
    usersSorted: User[],
    error: string;
    userType: string;
}


export interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    phoneNumber: string;
}