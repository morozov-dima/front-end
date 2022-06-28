// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************


// ****************************** from.ts *********************************

import { Component, OnInit } from '@angular/core';
import { getISSLocationSavedByUser } from '../maps/state/maps.selectors';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';

@Component({
  selector: 'app-save-location-dialog',
  templateUrl: './save-location-dialog.component.html',
  styleUrls: ['./save-location-dialog.component.scss']
})

export class SaveLocationDialogComponent implements OnInit {
  constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.store.select(getISSLocationSavedByUser).subscribe({
            next: responseLocationsSavedByUser => {
                localStorage.setItem('ISSLocationsSavedByUser', JSON.stringify(responseLocationsSavedByUser));
            }
            });
    }
}




// ******************************** to.ts ******************************
const ISSLocationSavedByUser: ISSLocationSavedByUser[] = JSON.parse(localStorage.getItem('ISSLocationsSavedByUser') || '{}');
this.store.dispatch( 
    MapPageActions.saveRestoredLocations(
        { 
            restoredLocations: ISSLocationSavedByUser
        }
    ) 
);