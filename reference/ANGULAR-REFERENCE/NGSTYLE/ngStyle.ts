// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************

<p [ngStyle]="{backgroundColor: 'red'}">Some text</p>

<p [ngStyle]="{'background-color': 'red'}">Some text</p>

  <div class="interesting">
    <app-quote 
      [ngStyle]="{
        'width': isFavorite ? '600px' : '400px'
      }"
      (click)="isFavorite = !isFavorite"
      [ngClass]="{'favorite super-favorite' : isFavorite}">
    </app-quote>
  </div>











// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************

<p [ngStyle]="{'background-color': getColor()}">some text</p>

getColor() {
  return this.serverStatus === 'online' ? 'green' : 'red';
}











// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ************************ app.component.html *********************
    <div [ngStyle]="{
            backgroundColor: changeBg ? 'blue' : 'unset',
            color: changeBg ? 'white' : 'blue'
        }"
        class="box-view-bg">
        box
    </div>
   <button (click)="changeBg = !changeBg">Change Background</button>

















// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ************************ app.component.html *********************
<section class="assignment3">
  <button (click)="toggleText()">Display Details</button>
  <p *ngIf="showText">Secret Password = tuna</p>

  <ul *ngIf="clicks">
    <li 
      *ngFor="let click of clicks; index as i"
      [ngStyle]="{
          'background-color' : i > 5 ? 'blue' : 'none',
          'color' : i > 5 ? 'white' : 'black'
        }" >
      {{click}} - {{i}}
    </li>
  </ul>

</section>





// ************************ app.component.ts *********************
import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component {
  showText: boolean = false;
  clicks: number[] = [];


  toggleText() {
    this.showText = !this.showText
    const currentDate = Date.now();
    this.clicks.push(currentDate);
  }

}













// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ********************** app.component.html ***********************
<button>Shrink</button>

<p [ngStyle]="{'width.px': widthValue}">Shrink me</p>






// ************************ app.component.ts ***********************
import { Component } from '@angular/core';
import { showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  widthValue: number = 400;
}


