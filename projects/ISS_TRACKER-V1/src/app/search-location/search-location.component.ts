import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ISSLocationSavedByUser } from '../maps/state/maps.interface';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { MapPageActions } from '../maps/state/actions';
import { getActiveLocationsHistory, getISSLocationSavedByUser } from '../maps/state/maps.selectors';

export interface PeriodicElement {
  name: string;
  lat: string;
  lng: string;
  timestamp: string;
  actions: string;
}


@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})

export class SearchLocationComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'name', 'lat', 'timestamp'];
  dataSource!: MatTableDataSource<ISSLocationSavedByUser>;
  clickedRows = new Set<PeriodicElement>();
  rowClicked!: number;

  constructor(private store: Store<State>) {}

  dataIsAvailable: boolean = false;
  isFocused: boolean = false;

  ngOnInit(): void {
    this.getLocations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getLocations() {
    this.store.select(getISSLocationSavedByUser).subscribe({
      next: response => {
        response.length > 0 ? this.dataIsAvailable = true : this.dataIsAvailable = false;
        this.dataSource = new MatTableDataSource(response);
      }
    });
  }



  onChoseLocation(focusedLocation: ISSLocationSavedByUser) {
    // toggle background color of selected location.
    this.rowClicked === focusedLocation.id ? this.rowClicked = -1 : this.rowClicked = focusedLocation.id;
    
    if(!this.isFocused) {
      // user select a saved location
      this.store.dispatch(MapPageActions.setInternalAppState({appLocationState: 2}));
      this.store.dispatch(MapPageActions.currentActiveLocation({currentLocation: focusedLocation})); 

      //localStorage.setItem('currentLocation', JSON.stringify(focusedLocation));
      localStorage.setItem('appLocationState', JSON.stringify(2));


      // this.store.select(getActiveLocationsHistory).subscribe({
      //   next: responseGetActiveLocationsHistory => {
      //     localStorage.setItem('ActiveLocationsHistory', JSON.stringify(responseGetActiveLocationsHistory));
      //   }
      // });


      this.isFocused = true;
    }
    else {
      // When a user unselects the location,  the app will return to show the whole map.
      this.store.dispatch(MapPageActions.setInternalAppState({appLocationState: 1}));
      this.store.dispatch(MapPageActions.loadMaps()); 
      this.store.dispatch(MapPageActions.saveLocationsHistory({updatedLocation: focusedLocation})); 
      localStorage.setItem('appLocationState', JSON.stringify(1));
      this.isFocused = false;
    }
  }




  onDeleteLocation(locationId: number) {
       this.store.dispatch(MapPageActions.deleteLocation({id: locationId})); 
  }

}
