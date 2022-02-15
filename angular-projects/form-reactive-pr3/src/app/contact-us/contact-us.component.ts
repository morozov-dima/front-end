import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndustryModel, VisitorsModel } from '../shared/user-data-model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  profileForm!: FormGroup;

  industryUserData: IndustryModel[] = [];
  visitorsUserData: VisitorsModel[] = [];


  constructor(private userDataService: UserDataService) { }

  


  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'fullNameInput': new FormControl('', Validators.required),
      'emailNameInput': new FormControl('', [Validators.required, Validators.email]),
      'companyNameInput': new FormControl('', Validators.required),
      'phoneInput': new FormControl('', [Validators.maxLength(10), Validators.required]),
      'userData': new FormGroup({
        'industrySelect': new FormControl('', Validators.required),
        'visitorsInput': new FormControl('', Validators.required)
      })
    });

    // get industry data from service
    this.industryUserData = this.userDataService.getIndustryData();
   
    // get visitors data from service
    this.visitorsUserData = this.userDataService.getVisitorsData();
  }





  onSubmit() {
    console.log(this.profileForm);

    // reset form after submit
    //this.profileForm.reset();
    
  }



  // we can always access any form control through the get method
  get fullNameInput() { return this.profileForm.get('fullNameInput')!;  }
  get emailNameInput() { return this.profileForm.get('emailNameInput')!; }
  get companyNameInput() { return this.profileForm.get('companyNameInput')!; }
  get phoneInput() { return this.profileForm.get('phoneInput')!; }
  get industrySelect() { return this.profileForm.get('userData.industrySelect')!; }
  get visitorsInput() { return this.profileForm.get('userData.visitorsInput')!; }

}
