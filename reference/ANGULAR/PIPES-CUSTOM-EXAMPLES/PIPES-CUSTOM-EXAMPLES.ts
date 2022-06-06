// **********************************************************************
// ****************************** Example *******************************
// **********************************************************************



// ********************** shorten.pipe.ts ***********************
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'shorten'
})

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







