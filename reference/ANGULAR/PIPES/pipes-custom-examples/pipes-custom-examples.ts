// **********************************************************************
// ****************************** Example *******************************
// **********************************************************************


// ************************** safe.pipe.ts ******************************
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeUrl {
    switch (type) {
			case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
  }

}




// ************************* app.module.ts **************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './shared/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
  bootstrap: [AppComponent]
})
export class AppModule { }







// *********************** app.component.html ************************
<!-- Profile Column -->
<ng-container matColumnDef="thumbnailUrl">
  <th class="thumbnailUrlRow table-title" mat-header-cell *matHeaderCellDef> Profile </th>
  <td class="thumbnailUrlRow" mat-cell *matCellDef="let row">
     <img class="user-profile-img" alt="User Profile" [src]="row.thumbnailUrl | safe: 'url'">
  </td>
</ng-container>



<!-- ID Column -->
<ng-container matColumnDef="id">
  <th class="idRow table-title" mat-header-cell *matHeaderCellDef> ID </th>
  <td class="idRow" mat-cell *matCellDef="let row" [innerHTML]="row.id | safe: 'html'"></td>
</ng-container>













// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


// ********************** shorten.pipe.ts ***********************
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'shorten'
})

/*
    We need implement our pipe with PipeTransform interface - this is good practice.
*/
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number) {
        // here we check if value lenght is greater than 10 characters.
        if (value.length > limit) {
            return value.substr(0, limit) + ' ...';
        }

        // otherwise we will return the unchanged value.
        return value;
    }
}








// ********************* app.component.html **************************
<strong>{{ server.name | shorten:10 }}</strong> | 








// *********************** app.module.ts *************************
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


















// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// ************************ duration.pipe.ts *************************
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform{
    // value - input value that we get from html, in our example this is 'durationValue'
    //
    // we also can add second parameter to our pipe (arg?: number) , 
    // for example number as optional.
    //
    // our pipe return string
    //
    transform(value: number): string {
        let result: string = '';
        switch (value) {
            case 1:
                result = 'Half Hour'
                break;
            case 2:
                result = 'One Hour'
                break;
            case 3:
                result = 'Half Day'
                break;
            case 4:
                result = 'Full Day'
                break        
            default:
                result = value.toString();
                break;
        }
        return result;
    }
}




// ************************** welcome.component.html ************************
<p>
    {{ durationValue | duration }}
</p>



// ************************** welcome.component.ts ***************************
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  durationValue: number = 3;

  ngOnInit(): void {
  }

}




// *************************** app.module.ts ***************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DurationPipe } from './shared/duration.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }







