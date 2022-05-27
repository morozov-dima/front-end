import { Component } from '@angular/core';
import { clickedStateTrigger, numberEnteredStateTrigger } from './shared/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // here we have to import our triggers
  animations: [
    clickedStateTrigger,
    numberEnteredStateTrigger
  ]
})


export class AppComponent {
  clickInfo: string = 'default';
  paragraphClick: string = 'default';
  numberEntered!: number;

  onClickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
       this.clickInfo = 'default' 
    }, 3000);
  }





}
