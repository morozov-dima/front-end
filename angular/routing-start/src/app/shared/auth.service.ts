export class AuthService {
    loggedIn: boolean = false;


    isAuthenticated() {
       // this method takes some time to finish
       // because maybe we reach out to a server.
       // therefore here, I will return a promise.
       const promise = new Promise(
           (resolve, reject) => {
               setTimeout(() => {
                   resolve(this.loggedIn);
               }, 800);
           }
       );
       return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

}