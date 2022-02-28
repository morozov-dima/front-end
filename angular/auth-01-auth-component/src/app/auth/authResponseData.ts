// type of data that we get from response.
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;    
    expireIn: string;
    localId: string;
    // optional parameter
    registered?: boolean;
}


