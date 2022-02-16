import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {


    static forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {

        // we want right now to simulate the fact that we have
        // an asynchronous task like reaching out to a server.
        // for this reason we add setTimeout
        setTimeout(() => {
            if(control.value === 'test@test.com') {
               // if validation is false
               resolve({'emailIsForbidden': true})
            } else {
                // if validation is successful , you have to pass nothing or null.
                resolve(null)
            }
        }, 1500);


        });

        return promise;
    }


}
