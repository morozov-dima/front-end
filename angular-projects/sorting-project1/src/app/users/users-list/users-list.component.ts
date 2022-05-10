import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UsersDataService } from "src/app/shared/users-data.service";
import { UsersList } from "src/app/shared/users-interface";


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit, OnDestroy {
    constructor(
        private usersDataService: UsersDataService
    ) {}


    usersSub!: Subscription;
    users: UsersList[] = [];
    usersSorted: UsersList[] = [];

    ngOnInit(): void {
        this.usersSub = this.usersDataService.getUsers().subscribe({
            next: (response) => {
                this.users = response;
                console.log(this.users);
                this.showAllUsers();
            },
            error: () => {
                console.log('error in getUsers');
            },
            complete: () => {
                console.log('getUsers completed ...');
            }
        })
    }  

    onSelecterTab(MatTabChangeEventObject: any) {
        console.log(MatTabChangeEventObject.index);
        this.sortata(MatTabChangeEventObject.index);
    }

    sortata(labelIndex: number) {
        console.log(labelIndex);
        console.log(this.usersSorted);
        
        switch (labelIndex) {
            case 0:
                this.showAllUsers();
                break;
            case 1:
                this.filterByName();
                break;
            case 2:
                this.filterByAge();  
                return;  
            default:
                this.showAllUsers();
                break;
        }
    }

    filterByName() {
        this.usersSorted = this.users.slice(0);
        this.usersSorted.sort((a:any, b: any) => {
            // 'a' and 'b' - returns user object
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
    
            if(nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            // name must be equal
            return 0;
        });
        
    }

    filterByAge() {
        this.usersSorted = this.users.slice(0);
        this.usersSorted.sort((a: any, b: any) => {
          return a.age - b.age;
        } );
    }

    showAllUsers() {
        this.usersSorted = this.users.slice(0); // copy object
    }

    
    ngOnDestroy(): void {
        this.usersSub.unsubscribe();
    }

}