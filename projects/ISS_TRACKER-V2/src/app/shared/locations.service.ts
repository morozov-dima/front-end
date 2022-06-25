import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { getISSLocationSavedByUser } from '../maps/state/maps.selectors';
import { ISSLocationSavedByUser } from '../maps/state/maps.interface';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {

  constructor(private store: Store<State>) { }
  locations!: ISSLocationSavedByUser[];

  getSavedLocations(): Observable<ISSLocationSavedByUser[]> {
    this.store.select(getISSLocationSavedByUser).subscribe({next: response => this.locations = response});
    return of(this.locations);
  }

}
