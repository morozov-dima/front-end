// type of data that we get from response.
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;    
    expiresIn: string;
    localId: string;
    // optional parameter
    registered?: boolean;
}


