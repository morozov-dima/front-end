// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************




// *************** Install Angular Google Maps - Step 1 ********************
// install angular google map with:
npm install @agm/core







// *************** Update your @NgModule with apiKey - Step 2 ****************
/*
 *  Go to your app.module.ts and import the AgmCoreModule module.
 *  You also need to add 'Google Maps API key'. You next register and and then 
 *  you will get this 'API key'.
 *  
 *  You can read more about 'Google API key' here : https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
 *  
 * 
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    })
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}





// **************************** app.component.ts ****************************
/*
 *  In your ts code set some values to 'lat' and to 'lng'
 * 
*/
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  lat = 33.333333;
  lng = 3.33333;
}






// **************************** app.component.html ****************************
/*
 *  In your html code connect 'agm' and 'agm-marker' 
 * 
*/
<agm-map [latitude]="lat" [longitude]="lng">
  <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
</agm-map>





// **************************** app.component.css ****************************
// Height is required !!!
agm-map {
    height: 500px;
}