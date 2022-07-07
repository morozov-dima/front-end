// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************



// ****************** app.component.ts ******************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




// ********************* save-location-dialog.component.html **********************
<h1 mat-dialog-title>Save location</h1>
<div mat-dialog-content>
    <form [formGroup]="locationsFrom">
        <mat-form-field appearance="standard">
            <mat-label>Name</mat-label>
            <input formControlName="nameValue" type="text" matInput name="nameValue" >
             <mat-error *ngIf="!nameValue.valid && nameValue.touched">The name must be unique and mandatory.</mat-error> 
            </mat-form-field>
    </form>
</div>

<div class="action-buttons" mat-dialog-action [align]="'end'">
     <button mat-stroked-button color="primary" mat-dialog-close>Cancel</button>   
     <button mat-raised-button color="primary" (click)="saveLocation()" [disabled]="!locationsFrom.valid">Save</button> 
</div> 










// ********************* save-location-dialog.component.ts **********************
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









// ********************* validators/location-name.validator.ts **********************
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

import {map} from 'rxjs/operators';
import { LocationsService } from '../locations.service';

/*
    Angular Asynchronous Form Validator.
*/
export function uniqueLocationNameAsynchronousValidator(locations: LocationsService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return locations.getSavedLocations()
            .pipe(
                map(locations => {
                    const location = locations.find(location => location.name.toLowerCase() == control.value.toLowerCase());
                    return location ? {locationExists:true} : null;
                })
            )

    }
}









// *************************** services/locations.service.ts ****************************
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
