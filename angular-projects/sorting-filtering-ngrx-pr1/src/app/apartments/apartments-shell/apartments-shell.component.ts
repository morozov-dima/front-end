import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Apartment, ApartmentsState } from "../state/apartments-interface";
import {FormControl, FormGroup} from '@angular/forms';


import * as ApartmentsActions from '../state/apartments-actions';
import { selectAllApartments,
        // selectApartmentsSortedByStarRating,
         selectFilteredApartments
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
    filteredApartments: Apartment[] = [];
    
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
                this.filteredApartments = apartmentsResponse;
            }
        );
    }

    // TO DO
    onCheckboxChangeStarRating(starRatingObject: any) {
        this.store.dispatch(ApartmentsActions.filterApartmentsByStars({ starRating: starRatingObject }));  
        this.store.select(selectFilteredApartments).subscribe((response) => {
            console.log(response);
            this.filteredApartments = response;
        });
    }


    // TO DO
    onCheckboxChangeDistanceFromBeach(distanceFromBeachObject: any) {
         this.store.dispatch(ApartmentsActions.filterApartmentsByDistance({ distanceFromBeach: distanceFromBeachObject }));
        // this.store.select(selectFilteredApartments).subscribe((response) => {
        //     console.log(response);
        //     this.filteredApartments = response;
        // });
    }


    changeTabs(event: any) {
        switch (event.index) {
            case 0: // All
                this.store.dispatch(ApartmentsActions.showAllApartments());
                break;
            case 1: // Price (highest first)
                this.store.dispatch(ApartmentsActions.sortApartmentsByPriceHighestFirst());
                break; 
            case 2: // Distance from closest beach
                this.store.dispatch(ApartmentsActions.sortApartmentsByDistanceFromClosestBeach());
                break;      
            case 3: // Distance from closest beach
                this.store.dispatch(ApartmentsActions.sortApartmentsByStarsHighestFirst())
                break;          
        
            default:
                this.store.dispatch(ApartmentsActions.showAllApartments());
                break;
        }

        this.store.select(selectFilteredApartments).subscribe((response) => {
            this.filteredApartments = response;
        });
        
    }

}