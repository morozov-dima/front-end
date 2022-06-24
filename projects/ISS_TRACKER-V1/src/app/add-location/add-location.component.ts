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
  currentLocation!: ISSLocationFromAPI | null;
  constructor(
    public dialog: MatDialog,
    private store: Store<State>
    ) { }


  openDialog() {
    this.getCurrentLocation();
    this.setCurrentLocation();
    this.dialog.open(SaveLocationDialogComponent, {}).afterClosed().subscribe();
  }



  getCurrentLocation() {
    const currentDate = Date.now().toString();
    this.store.select(getISSLocationFromAPI)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (response) => {
               this.currentLocation = {
                  iss_position: {
                    longitude: response!.iss_position.longitude,
                    latitude: response!.iss_position.latitude,
                  },
                  timestamp: currentDate
              };
          }
    });
  }


  setCurrentLocation() {
    if (this.currentLocation) {
      this.store.dispatch(MapPageActions.currentActiveLocation({currentLocation: this.currentLocation})); 
    }
  }



}
