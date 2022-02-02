import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-user-data-result',
  templateUrl: './user-data-result.component.html',
  styleUrls: ['./user-data-result.component.css']
})
export class UserDataResultComponent implements OnInit {
  result: string = '';
  items: number[] = [];
  message: string = 'please enter valid number';
  showErrorMessage: boolean = false;

  showYear: number = 0;
  showMonth: number = 0;
  showDay: number = 0;
  showHours: number = 0;
  showMinutes: number = 0;
  showSeconds: number = 0;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {  
    this.userDataService.userData.subscribe((data) => {
      const dataInt = parseInt(data);

      if(!isNaN(dataInt)) {
        this.showErrorMessage = false;
        this.items.push(dataInt);
      } 
      else {
        this.showErrorMessage = true;
      }
    });


    this.showDate();

  }



  showDate() {
    const today = new Date();
    console.log(today);
    
    this.showYear = today.getFullYear();
    this.showHours = today.getHours();
    this.showDay = today.getDay();
    this.showMonth = today.getMonth();
    this.showMinutes = today.getMinutes();
    this.showSeconds - today.getSeconds();
  }


}
