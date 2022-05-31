// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



// ********************** users-shell.component.ts **********************
import { Component, OnInit } from "@angular/core";

import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as UsersActions from '../state/users.actions';
import { User } from '../state/users.interface';
import { selectAllUsers, selectSortedUsers, selectUsersByAge, selectUsersByName } from "../state/users.selectors";


@Component({
    selector: 'app.users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

    users: User[] = [];
    usersSorted: User[] = [];



    ngOnInit(): void {  
        this.store.dispatch(UsersActions.loadUsers()); 


        // selectAllUsers selector
        this.store.select(selectAllUsers).subscribe(
            (responseUsers) => {
                this.users = responseUsers;
                this.usersSorted = responseUsers;
            }
        );

    }



    onSelecterTab(MatTabChangeEventObject: any) {
        this.sortData(MatTabChangeEventObject.index);
    }


    sortData(labelIndex: number) {
        switch (labelIndex) {
            case 0:
                // selectAllUsers selector   
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
            case 1:
                // selectUsersByName selector    
                this.store.select(selectUsersByName).subscribe(
                    (responseSortedUsersByName) => {
                        this.usersSorted = responseSortedUsersByName;
                    }
                );

                break;
            case 2:
                // selectUsersByAge selector    
                this.store.select(selectUsersByAge)
                .subscribe( responseSortedUsersByAge => this.usersSorted = responseSortedUsersByAge );
                break;    
        
            default:
                // selectAllUsers selector  
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
        }
    }

    
}













// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// *********************** users-shell.component.ts *********************

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UsersDataService } from "../state/users-data.service";
import { UserData, UserState } from "../state/users.interface";

import * as UsersAction from '../state/users.actions';
import { selectAllUsers, selectUsersByType } from "../state/users.selectors";

@Component({
    selector: 'app-users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<UserState>
    ) {}

    userData: UserData[] = [];

    ngOnInit(): void {
        
        // load Users from back-end
        this.store.dispatch(UsersAction.loadUsers());

        // select all users
        this.store.select(selectAllUsers).subscribe(
            (responseAllUsers) => {
                this.userData = responseAllUsers;
            }
        );
    }


    selectTab(tabEvent: any) {
        const tabLabelName = tabEvent.tab.textLabel.toLowerCase();
        this.store.dispatch(UsersAction.selectedTab( {selectedTabName: tabLabelName} ));
        this.store.select(selectUsersByType).subscribe(
            (resultUsersByType) => {
                this.userData = resultUsersByType;
            }
        );
    }


}

















// **********************************************************************
// **************************** Example 3 *******************************
// **********************************************************************


// ********************* apartments-shell.component.ts ******************

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Apartment, ApartmentsState } from "../state/apartments-interface";
import {FormControl, FormGroup} from '@angular/forms';


import * as ApartmentsActions from '../state/apartments-actions';
import { 
    selectAllApartments,
    selectApartmentsByPriceHighestFirst,
    selectUsersByDistanceFromClosestBeach,
    selectApartmentsByStarsHighestFirst,
    selectApartmentsStarRating,
    selectApartmentsDistance
     } from "../state/apartments-selectors";


@Component({
    selector: 'app-apartment-shell',
    templateUrl: './apartments-shell.component.html',
    styleUrls: ['./apartments-shell.component.css']
})

export class ApartmentsShellComponent implements OnInit {

    constructor (
        private store: Store<ApartmentsState>,
    ) {

    } 
    

    apartments: Apartment[] = [];
    
    starRating = new FormGroup({
        starRating_1: new FormControl(''),
        starRating_2: new FormControl(''),
        starRating_3: new FormControl(''),
        starRating_4: new FormControl(''),
        starRating_5: new FormControl('')
    });

    distanceFromBeach = new FormGroup({
        lessThan1Km: new FormControl(''),
        lessThan3Km: new FormControl(''),
        lessThan5Km: new FormControl('')
    });

    ngOnInit(): void {

        // load all apartments from back-end server and save them in 'store'
        this.store.dispatch(ApartmentsActions.loadApartments());


        // select all apartments from 'store'
        this.store.select(selectAllApartments).subscribe(
            (apartmentsResponse) => {
                this.apartments = apartmentsResponse;
            }
        );


        this.store.select(selectApartmentsStarRating).subscribe(
            (response) => {
                // update form values
                if (response) {
                    this.starRating.patchValue({
                        starRating_1: response.starRating_1,
                        starRating_2: response.starRating_2,
                        starRating_3: response.starRating_3,
                        starRating_4: response.starRating_4,
                        starRating_5: response.starRating_5
                      });
                }
             }
        );   
               


        this.store.select(selectApartmentsDistance).subscribe(
            (response) => {
                if (response) {
                    // update form values
                    this.distanceFromBeach.patchValue({
                        lessThan1Km: response.lessThan1Km,
                        lessThan3Km: response.lessThan3Km,
                        lessThan5Km: response.lessThan5Km
                      });
                }
             }
        ); 



    }    




    onCheckboxChangeStarRating(starRatingObject: any) {
        this.store.dispatch(ApartmentsActions.filterApartmentsByStars({ starRating: starRatingObject }));  
      }

      onCheckboxChangeDistanceFromBeach(distanceFromBeachObject: any) {
          this.store.dispatch(ApartmentsActions.filterApartmentsByDistance({ distanceFromBeach: distanceFromBeachObject }));
      }


    changeTabs(event: any) {
        console.log(event.index);
        switch (event.index) {
            case 0: // All
                this.store.select(selectAllApartments).subscribe((response) => {
                    this.apartments = response;
                });
                break;
            case 1: // Price (highest first)
                this.store.select(selectApartmentsByPriceHighestFirst).subscribe((response) => {
                    this.apartments = response;
                });
                break; 
            case 2: // Distance from closest beach
                this.store.select(selectUsersByDistanceFromClosestBeach).subscribe((response) => {
                    this.apartments = response;
                });
                break;      
            case 3: // Distance from closest beach
                this.store.select(selectApartmentsByStarsHighestFirst).subscribe((response) => {
                    this.apartments = response;
                });
                break;          
        
            default:
                break;
        }
        
    }

}