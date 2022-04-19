

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationData: Date
    ) {}

        get token() {
            // if our token is expired we will retrn 'null'
            if (!this._tokenExpirationData || new Date() > this._tokenExpirationData) {
                return null;
            }
            // return token in case our token is not expired
            return this._token;
        }

}