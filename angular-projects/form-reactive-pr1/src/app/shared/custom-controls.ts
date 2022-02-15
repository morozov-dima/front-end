import { AbstractControl, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';

export class CustomControls {


    /*
        Asynchronous validators - in case we get some data (forbidden emails) from server
    */
    static forbiddenEmailsValidatorAsync(control: AbstractControl): Promise<any> | Observable<any> {
        const forbiddenEmails: string[] = ['test1@gmail.com', 'test2@gmail.com'];

        const promise = new Promise<any>((resolve, reject) => {

               // we want right now to simulate the fact that we have
               // an asynchronous task like reaching out to a server.
               // for this reason we add setTimeout      
               setTimeout(() => {
                    if(forbiddenEmails.indexOf(control.value) !== -1) {
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
