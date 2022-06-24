import { Component, OnInit } from '@angular/core';
import { ISSLocationFromAPI } from '../maps/state/maps.interface';
import { getAppLocationState, getcurrentActiveLocation, getISSLocationFromAPI } from '../maps/state/maps.selectors';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent implements OnInit {

  constructor(private store: Store<State>) { }

  lat: string = '';
  lng: string = '';
  time: string = ''; 

  isDataLoaded: boolean = false;

  locationFromAPISub!: Subscription;
  activeLocationSub!: Subscription; 

  ngOnInit(): void {

    this.store.select(getAppLocationState).subscribe({
      next: (appStateResponse) => {
        switch (appStateResponse) {
          // The ISS location coorrdinates get updated every 'X' seconds.
          case 1:
            if(this.activeLocationSub) {
              this.activeLocationSub.unsubscribe();
            }
            this.getLocationFromISSAPI();
              break;
          // The map will be focused to chosen location  
          case 2:
              if(this.locationFromAPISub) {
                this.locationFromAPISub.unsubscribe();
              }
             this.getFocusedLocation();
              break;
          // The ISS location coorrdinates get updated every 'X' seconds.
          default:
            if(this.activeLocationSub) {
              this.activeLocationSub.unsubscribe();
            }
            this.getLocationFromISSAPI();
              break;
        }
      }
    });

  }




  getLocationFromISSAPI(){
    this.locationFromAPISub = this.store.select(getISSLocationFromAPI).subscribe({
      next: (response) => {
            if(response) {
              this.isDataLoaded = true;
              this.lat = response.iss_position.latitude;
              this.lng = response.iss_position.longitude;
              this.time = response.timestamp;
            }
      }
    });
  }



  getFocusedLocation(){
    this.activeLocationSub = this.store.select(getcurrentActiveLocation).subscribe({
      next: (response) => {
          if (response) {
            this.isDataLoaded = true;
            this.lat = response.iss_position.latitude;
            this.lng = response.iss_position.longitude;
            this.time = response.timestamp;
          }
      }
    });
  }


  
}
