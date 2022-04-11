 // In case user not logged in user will be null.
 export interface AuthState {
  user: AuthResponseData | null;
  error: string ;
}






export interface AuthResponseData {
  idToken: string;
  email: string;
  expiresIn: number;
  userId: string;
}