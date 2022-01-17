import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  showText: boolean= true;
  logData: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  /*
    Toggle the displaying of paragraph
  */
  toggleParagraph() {
     // push data to array
     this.logData.push({time: new Date()});

      if (this.showText) {
        this.showText = false;
      }
      else {
        this.showText = true;
      }
  }

}
