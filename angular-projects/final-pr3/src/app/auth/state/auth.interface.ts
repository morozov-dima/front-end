import { User } from "./auth-user.model";

export interface AuthState {
    user: User | null;
    error: string;
}

export interface AuthResponseData {
    idToken: string;

}