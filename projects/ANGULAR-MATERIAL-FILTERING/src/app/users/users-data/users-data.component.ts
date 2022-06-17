import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserData } from "../../shared/user.data.interface";
import { UsersData } from "../../shared/users-data.service";



@Component({
    selector: 'app-users-data',
    templateUrl: './users-data.component.html',
    styleUrls: ['./users-data.component.css']
})

export class UsersDataComponent implements OnInit, OnDestroy {
    constructor(
        private usersData: UsersData
    ) {}

    users: UserData[] = [];
    filteredUsers: UserData[] = [];
    usersSub!: Subscription;
    filterBy: string = 'all';    



    ngOnInit(): void {
        this.loadUsers()     
    }


    loadUsers() {
       this.usersSub = this.usersData.getUsers().subscribe({
           next: (response) => {
               this.users = response;
               console.log(this.users);
               this.showAllUsers();   
           },
           error: () => {
               console.log('error in loadUsers method');
           },
           complete: () => {
               console.log('getUsers completed ...');
           }
       }); 
    }



    switchTabs(a: any) {
        // get 'mat-tab' label name
        const tabLabelName = a.tab.textLabel.toLowerCase(); 
        console.log(tabLabelName);
        
        // get 'mat-tab' index
        console.log(a.index); 
        this.filterBy = tabLabelName;

        if (this.users) {
            this.filterData(this.filterBy);
        }
    }

   
 

    
    filterData(filterType: string) {
        if (filterType === 'all') {
            this.showAllUsers();
        }
        else {
            this.filteredUsers = this.users.filter(data => {
                return data.type === filterType;
            });
        }
    }


    showAllUsers() {
        // create deep copy of object
        this.filteredUsers = this.users.slice(0);
    }
    
    ngOnDestroy(): void {
        this.usersSub.unsubscribe();
    }

}