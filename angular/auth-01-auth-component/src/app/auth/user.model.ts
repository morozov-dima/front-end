// we create class for user Model.
// because we want to store data
// we will store this data in localStorage
export class User {
    
    constructor(
        // we will store 'email' value that is string that we get from server.
        public email: string,

        // we will store 'id' value that is string that we get from server.
        public id: string,

        // we will store '_token' value that is string
        // that we get from server. this is token that we wll add
        // to all our outgoing requests.
        // we can't access '_token' directly. only with get.
        private _token: string,

        // we will store '_tokenExpirationData' value that is Date
        // that we get from server 
        private _tokenExpirationData: Date
    ) {}



    // we can't overwrite this token. because there is 
    // only 'get' and not 'set'.   
    get token() {
        // in case token is expired
        if(!this._tokenExpirationData || new Date() > this._tokenExpirationData) {
            return null;
        }

        // in case token is valid
        return this._token;
    }   


     



}