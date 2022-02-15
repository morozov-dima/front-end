import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {

  /*
    Asynchronous validators - in case we get some data (forbidden emails) from server
  */
    static forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
     
          // we want right now to simulate the fact that we have
          // an asynchronous task like reaching out to a server.
          // for this reason we add setTimeout
          setTimeout(() => {
            if (control.value === 'test@test.com') {
               resolve({'emailIsForbidden': true})
            } else{
              resolve(null)
            }
          }, 1500);
        });
        return promise;
      }


}
