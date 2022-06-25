import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { MapPageActions } from '../maps/state/actions';
import { ISSLocationSavedByUser } from '../maps/state/maps.interface';
import { getcurrentActiveLocation, getISSLocationSavedByUser } from '../maps/state/maps.selectors';
import { LocationsService } from '../shared/locations.service';
import { uniqueLocationNameAsynchronousValidator } from '../shared/validators/location-name.validator';
import { State } from '../state/app.reducer';

@Component({
  selector: 'app-save-location-dialog',
  templateUrl: './save-location-dialog.component.html',
  styleUrls: ['./save-location-dialog.component.scss']
})

export class SaveLocationDialogComponent implements OnInit {
  locationsFrom!: FormGroup;
  updatedLocation!: ISSLocationSavedByUser; 

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<SaveLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private store: Store<State>,
    private locationsService: LocationsService
    ) { }


    ngOnInit(): void {
      // get location name from user input and validate it.
      this.locationsFrom = this.formBuilder.group({
        nameValue: ['', {
         validators: [ Validators.required ],
            asyncValidators: [uniqueLocationNameAsynchronousValidator(this.locationsService)],
            updateOn: 'blur' 
          }]
      });
    }

    
    // save location when user press 'save' button on dialog (save location) popup.
    saveLocation() {
       this.getCurrentLocation(); 
       if(this.locationsFrom.valid) {
            this.store.dispatch(MapPageActions.saveLocation({updatedLocation: this.updatedLocation})); 
            this.store.select(getISSLocationSavedByUser).subscribe({
              next: responseLocationsSavedByUser => {
                  localStorage.setItem('ISSLocationsSavedByUser', JSON.stringify(responseLocationsSavedByUser));
              }
            });
            this.locationsFrom.reset();
            this.matDialogRef.close('save');
       }
    }

    

    // get current active location (we will take location that was saved when 'save locaton button' was pressed)
    getCurrentLocation() {
      this.store.select(getcurrentActiveLocation)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (response) => {
                 this.updatedLocation = {
                    iss_position: {
                      longitude: response!.iss_position.longitude,
                      latitude: response!.iss_position.latitude,
                    },
                    timestamp: response!.timestamp,
                    name: this.locationsFrom.value.nameValue,
                    id: Date.now(),
                    isLocationSelected: false
                };
            }
      });
    }

  get nameValue() {
      return this.locationsFrom.controls['nameValue'];
  }


 
}
