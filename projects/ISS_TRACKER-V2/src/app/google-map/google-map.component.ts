import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { MapPageActions } from '../maps/state/actions';
import { interval, Subscription } from 'rxjs';
import { getAppLocationState, getcurrentActiveLocation, getISSLocationFromAPI } from '../maps/state/maps.selectors';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMapComponent implements OnInit {
   lat!: number;
   lng!: number ;
   time: number = 2000; // 2 sec interval

   locationFromAPISub!: Subscription;
   activeLocationSub!: Subscription; 

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    
    /*
      * app state 1: The ISS location coorrdinates get updated every 'X' seconds.
      * app state 2: The map will be focused to chosen location
    */
    this.getCurrentLocationAccordingToAppState();

  }


  // set ISS location coorrdinates that apdated each 'X' seconds
  setCurrentLocation() {
    this.locationFromAPISub = this.store.select(getISSLocationFromAPI).subscribe({
      next: (response) => {
          if (response) {
            this.lat = parseFloat(response?.iss_position?.latitude);
            this.lng = parseFloat(response?.iss_position?.longitude);
          }
      }
    });
  }



  // set location when user choose some location from 'saved locations'
  setCurrentFocusedLocation() {
    this.activeLocationSub = this.store.select(getcurrentActiveLocation).subscribe({
      next: (response) => {
          if (response) {
            this.lat = parseFloat(response?.iss_position?.latitude);
            this.lng = parseFloat(response?.iss_position?.longitude);
          }
      }
    });
  }
  


  // get miltiple ISS coordinates from API
  getMultipleISSCoordinates(time: number) {
    const myIntertval = interval(time);
    myIntertval.subscribe({next: () => this.store.dispatch(MapPageActions.loadMaps())});
  }


  //  get current location according to app state
  getCurrentLocationAccordingToAppState(){
    this.store.select(getAppLocationState).subscribe({
      next: (appStateResponse) => {

        switch (appStateResponse) {
          // The ISS location coorrdinates get updated every 'X' seconds.
          case 1:
            
            if(this.activeLocationSub) {
                this.activeLocationSub.unsubscribe();
              }
              this.getMultipleISSCoordinates(this.time); 
              //this.store.dispatch(MapPageActions.loadMaps()); 
              this.setCurrentLocation();
              break;

          // The map will be focused to chosen location  
          case 2:
              if(this.locationFromAPISub) {
                this.locationFromAPISub.unsubscribe();
              }
              this.setCurrentFocusedLocation();
              break;

          // The ISS location coorrdinates get updated every 'X' seconds.    
          default:
            if(this.activeLocationSub) {
                this.activeLocationSub.unsubscribe();
              }
              this.getMultipleISSCoordinates(this.time); 
              //this.store.dispatch(MapPageActions.loadMaps()); 
              this.setCurrentLocation();
              break;
        }
      }
    });
  }

  


}
