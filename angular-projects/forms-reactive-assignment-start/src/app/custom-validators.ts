import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class CustomValidators {
  
   
  
    /*
        Custom validator for name. This is not asynchronous
        validator.

        Static methods can be called without instantiating the class first - so it is 
        important to add static.
    */
    static forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
        // check if 'projectStatus' array contains the value of our control
        if (control.value === 'Test') {
          // if validation false we return this object
          return {'projecNameIsForbidden': true}
        }
        // if validation is successful, you have to pass nothing or null.
        return null;
      }





    /*
        We add asynchronous validotor for email.
        In real app we will get data from some server, here we
        use setTimeout to emulate request/response.

        Static methods can be called without instantiating the class first - so it is 
        important to add static.
    */
    static forbiddenProjectEmailsAsync(control: FormControl): Promise<any> | Observable<any> {
        const forbiddenProjectEmails: string[] = ['test@test123.com'];
        const promise = new Promise<any>(
        (resolve, reject) => {

            // we want right now to simulate the fact that we have
            // an asynchronous task like reaching out to a server.
            // for this reason we add setTimeout
            setTimeout(() => {
            if (forbiddenProjectEmails.indexOf(control.value) !== -1) {
                // if validation false we return this object
                resolve({'projecEmailsIsForbiddenAsync': true})
            } else{
                // if validation is successful, you have to pass nothing or null.
                resolve(null)
            }
            }, 2000);
        }
        );
        return promise;
    }





}