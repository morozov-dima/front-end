import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profileForm: FormGroup;

  projectStatus: string[] = ['Stable','Critical','Finished'];
  forbiddenProjectNames: string[] = ['Test'];

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, this.forbiddenProjectName.bind(this)]),
      projectEmail: new FormControl('', [Validators.required, Validators.email]),
      projectEmailAsync: new FormControl('', [Validators.required, Validators.email], this.forbiddenProjectEmailsAsync),
      projectStatus: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.profileForm);
    //this.profileForm.reset();
  }



  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    // check if 'projectStatus' array contains the value of our control
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'projecNameIsForbidden': true}
    }
    // if validation is successful, you have to pass nothing or null.
    return null;
  }





  forbiddenProjectEmailsAsync(control: FormControl): Promise<any> | Observable<any> {
    const forbiddenProjectEmails: string[] = ['test@test123.com'];
    const promise = new Promise<any>(
      (resolve, reject) => {

        // we want right now to simulate the fact that we have
        // an asynchronous task like reaching out to a server.
        // for this reason we add setTimeout
        setTimeout(() => {
          if (forbiddenProjectEmails.indexOf(control.value) !== -1) {
            resolve({'projecEmailsIsForbiddenAsync': true})
          } else{
            resolve(null)
          }
        }, 1500);
      }
    );
    return promise;
  }


  


}
