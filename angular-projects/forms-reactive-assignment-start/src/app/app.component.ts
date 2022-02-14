import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// class that contain custom validators
import { CustomValidators } from './custom-validators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profileForm: FormGroup;

  // list of project status for dropdown list
  projectStatus: string[] = ['Stable','Critical','Finished'];


  ngOnInit(): void {
    /* 
      Reactive form approach.
    */
    this.profileForm = new FormGroup({
      'projectName': new FormControl('', [Validators.required, CustomValidators.forbiddenProjectName.bind(this)]),
      'projectEmail': new FormControl('', [Validators.required, Validators.email]),
      'projectEmailAsync': new FormControl('', [Validators.required, Validators.email], CustomValidators.forbiddenProjectEmailsAsync.bind(this)),
      
       // we set default value for our dropdown element 
      'projectStatus': new FormControl('Critical')
    });
  }






  /*
    Submit button in our form
  */
  onSubmit() {
    console.log(this.profileForm);
    //this.profileForm.reset();
  }




  


}
