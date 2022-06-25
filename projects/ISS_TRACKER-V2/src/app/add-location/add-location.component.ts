import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveLocationDialogComponent } from '../save-location-dialog/save-location-dialog.component';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { MapPageActions } from '../maps/state/actions';
import { getISSLocationFromAPI } from '../maps/state/maps.selectors';
import { take } from 'rxjs';
import { ISSLocationFromAPI } from '../maps/state/maps.interface';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})

export class AddLocationComponent {

  currentLocation!: ISSLocationFromAPI;
  
  constructor(
    public dialog: MatDialog,
    private store: Store<State>
    ) { }

  // open popup where user can save new location. 
  openDialog() {
    this.getCurrentLocation();
    this.setCurrentLocation();
    this.dialog.open(SaveLocationDialogComponent, {}).afterClosed().subscribe();
  }


  // get current location when user press on 'save' location button on map.
  getCurrentLocation() {
    const currentDate = Date.now().toString();
    this.store.select(getISSLocationFromAPI)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (response) => {
              if(response) {
                this.currentLocation = {
                   iss_position: {
                     longitude: response!.iss_position.longitude,
                     latitude: response!.iss_position.latitude,
                   },
                   timestamp: currentDate
               };
              }
          }
    });
  }

  // save location in the list of 'saved locations'
  setCurrentLocation() {
    if (this.currentLocation) {
      this.store.dispatch(MapPageActions.currentActiveLocation({currentLocation: this.currentLocation})); 
    }
  }



}
