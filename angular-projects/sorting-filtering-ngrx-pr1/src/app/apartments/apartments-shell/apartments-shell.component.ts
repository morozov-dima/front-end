import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Apartment, ApartmentsState } from "../state/apartments-interface";
import {FormControl, FormGroup} from '@angular/forms';


import * as ApartmentsActions from '../state/apartments-actions';
import { selectAllApartments
         } from "../state/apartments-selectors";


@Component({
    selector: 'app-apartment-shell',
    templateUrl: './apartments-shell.component.html',
    styleUrls: ['./apartments-shell.component.css']
})

export class ApartmentsShellComponent implements OnInit {

    constructor (
        private store: Store<ApartmentsState>,
    ) {} 
    

    apartments: Apartment[] = [];
    
    starRating = new FormGroup({
        starRating_1: new FormControl(false),
        starRating_2: new FormControl(false),
        starRating_3: new FormControl(false),
        starRating_4: new FormControl(false),
        starRating_5: new FormControl(false)
    });

    distanceFromBeach = new FormGroup({
        lessThan1Km: new FormControl(false),
        lessThan3Km: new FormControl(false),
        lessThan5Km: new FormControl(false)
    });

    ngOnInit(): void {

        // load all apartments from back-end server and save them in 'store'
        this.loadApartmentsFromBackEnd();

        // select all apartments from 'store'
        this.selectAllApartmentsFromStore();

    }  
    


    loadApartmentsFromBackEnd() {
        this.store.dispatch(ApartmentsActions.loadApartments());
    }

    selectAllApartmentsFromStore() {
        this.store.select(selectAllApartments).subscribe(
            (apartmentsResponse) => {
                this.apartments = apartmentsResponse;
            }
        );
    }


    onCheckboxChangeStarRating(starRatingObject: any) {
        
        this.store.select(selectAllApartments).subscribe(
            response => {
                let updatedApartments: Apartment[] = []; 
                for (const property in starRatingObject) {
                        let lastCharIndex = property.indexOf('_');
                        let starRatingIndex = parseInt(property.substring(lastCharIndex + 1));
                     if (starRatingObject[property]) {
                        for (const apartment of response) {
                            if (apartment.starRating === starRatingIndex) {
                                // add relevant object to the 'updatedApartments' local array.
                                updatedApartments.push(apartment);
                            }
                        }
                    }
                }
                if (updatedApartments.length !== 0) {
                    // if at least one checkbox is checked.
                    this.apartments = updatedApartments;
                } 
                
            }
        );

       
 
    }



    onCheckboxChangeDistanceFromBeach(distanceFromBeachObject: any) {
         this.store.dispatch(ApartmentsActions.filterApartmentsByDistance({ distanceFromBeach: distanceFromBeachObject }));

    }


    changeTabs(event: any) {
       // console.log(this.apartments);
        switch (event.index) {
            case 0: // All (filter by name)

                let allUpdatedApartment: Apartment[] = [];
                allUpdatedApartment = this.apartments.slice(0);
                allUpdatedApartment.sort((a: any, b: any) => a.id - b.id);
                console.log(allUpdatedApartment);
                
                this.apartments = allUpdatedApartment;
                break;
            case 1: // Price (highest first)

                let priceUpdatedApartment: Apartment[] = [];
                priceUpdatedApartment = this.apartments.slice(0);
                priceUpdatedApartment.sort((a: any, b: any) => b.price - a.price);
                console.log(priceUpdatedApartment);
                this.apartments = priceUpdatedApartment;
                break; 
            case 2: // Distance from closest beach

                let distanceUpdatedApartment: Apartment[] = [];
                distanceUpdatedApartment = this.apartments.slice(0);
                distanceUpdatedApartment.sort((a: any, b: any) => a.distanceFromClosestBeach - b.distanceFromClosestBeach);
                console.log(distanceUpdatedApartment);
                this.apartments = distanceUpdatedApartment;
                break;      
            case 3: // Stars (highest first)
                let starsUpdatedApartment: Apartment[] = [];
                starsUpdatedApartment = this.apartments.slice(0);
                starsUpdatedApartment.sort((a: any, b: any) => b.starRating - a.starRating);
                console.log(starsUpdatedApartment);
                this.apartments = starsUpdatedApartment;
                break;   
        }

        
    }

}