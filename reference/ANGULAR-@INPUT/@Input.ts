

// *************************************************************
// ************************* Example  **************************
// *************************************************************


// ************************* bank-account.ts ************************
@Component({
  selector: 'bank-account',
  template: `
    Bank Name: {{bankName}}
    Account Id: {{id}}
  `
})
class BankAccount {
  @Input() bankName: string;
  @Input('account-id') id: string;


  normalizedBankName: string;
}



// ************************* app.component.ts ************************
@Component({
  selector: 'app',
  template: `
    <bank-account bankName="RBC" account-id="4747"></bank-account>
  `
})
class App {}










// *************************************************************
// ************************* Example  **************************
// *************************************************************


// **************** users.component.html ******************
<app-user [usersAddress]="usersAddressData"></app-user>





// ************* user.component.ts *****************
import { Component, Input } from '@angular/core';
import { UsersModel } from 'src/app/shared/data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() usersAddress: UsersModel[] = [];

}











// *************************************************************
// ************************* Example  **************************
// *************************************************************


// *********************** game-control.ts ************************
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})

export class GameControlComponent  {
  number: number = 0;
  interval: any;
  oddNumber!: number;
  evenNumber!: number;

  constructor() { }
 
  onStartGame(){
    this.interval = setInterval(() => {
      this.number++;
      this.number % 2 === 0 ? this.evenNumber = this.number : this.oddNumber = this.number;
    }, 1000);
  }

  onStopGame(){
    clearInterval(this.interval);
    this.interval = null;
  }

}







// *********************** game-control.html ************************
<app-odd 
    [oddNumber]="oddNumber" >
</app-odd>

<app-even 
    [evenNumber]="evenNumber" >
</app-even>

<button (click)="onStartGame()">Start Game</button>
<button (click)="onStopGame()">Stop Game</button>








// ********************* even.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  @Input() evenNumber!: number;

  constructor() { }

  ngOnInit(): void {
    
  }

}







// ****************** even.component.html ******************
<p [ngStyle]="{
    'background-color': 'red',
    'color': '#ffffff'
}">
    {{ evenNumber }}
</p>









// ****************** odd.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  @Input() oddNumber!: number;

  constructor() { }

  ngOnInit(): void {
     
  }

}







// ****************** odd.component.html ********************
[ngStyle]="{
    'background-color': 'blue',
    'color': '#ffffff'
}" >{{ oddNumber }}</p>







