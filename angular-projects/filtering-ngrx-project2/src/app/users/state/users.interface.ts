export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    type: string;
}

export interface UserState {
    users: UserData[];
    selectedTabName: string;
    error: string;
}