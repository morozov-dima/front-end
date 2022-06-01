// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************


// ********** app.component.html ***********
// 1. here we use [ngSwitch] directive. you can use this declare
//    if you have many values.
// 2. for default we will use 'ngSwitchDefault' case.
<div [ngSwitch]="randomNumber">
    <div *ngSwitchCase="0">number: 0</div>
    <div *ngSwitchCase="1">number: 1</div>
    <div *ngSwitchCase="2">number: 2</div>
    <div *ngSwitchCase="3">number: 3</div>
    <div *ngSwitchCase="4">number: 4</div>
    <div *ngSwitchDefault>default</div>
</div>





// ******** app.component.ts **********
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // expected output: 0, 1 , 2 , 3 or 4
  // in our html template we will use [ngSwitch] directive.
  randomNumber: number = Math.floor(Math.random() * 5); 
}











// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************



