



// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************

//we can filter data inside our component.


// ***************** event-details.component.html ******************
<div>
  <button [class.active]="filterBy==='all'">All</button>
  <button [class.active]="filterBy==='beginner'">Beginner</button>
  <button [class.active]="filterBy==='advanced'">Advanced</button>
</div>


<session-list [filterBy]="filterBy"></session-list>



// ***************** event-details.component.ts ******************
export class EventDetailsComponent implements OnInit {
  filterBy: string = 'all';

}






// ****************** session-list.component.html ****************
<div class="row" *ngFor="let session of visibleSessions">
  <h6>{{session.name}}</h6>
</div>




// ****************** session-list.component.ts ****************

// filtering Data - without pipes
// we will do this inside component
// we get data from parent component with @Input() decorator.

export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSessions: ISession[] = [];

  ngOnChnages() {
    if(this.sessions) {
      this.filterSessons(this.filterBy);
    }
  }

  filterSessons(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0); // duplicate object
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

}

















// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************


// ************************ users-data.component.html *******************

<div class="users-content">
   
    <div class="users-block">
        <mat-tab-group (selectedTabChange)="switchTabs($event)">

            <mat-tab label="All">
                <app-users-list [filteredUsers]="filteredUsers"></app-users-list>
            </mat-tab>

            <mat-tab label="Beginner">
                <app-users-list [filteredUsers]="filteredUsers"></app-users-list>
            </mat-tab>

            <mat-tab label="Intermediate">
                <app-users-list [filteredUsers]="filteredUsers"></app-users-list>
            </mat-tab>

            <mat-tab label="Advanced">
              <app-users-list [filteredUsers]="filteredUsers"></app-users-list>
            </mat-tab>
            
          </mat-tab-group>
    </div>
</div>








// ************************* users-data.component.ts *********************
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserData } from "src/app/shared/user.data.interface";
import { UsersData } from "src/app/shared/users-data.service";


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






// *********************** users-list.component.html **********************
<div class="table-content">

    <table mat-table [dataSource]="filteredUsers" class="mat-elevation-z8">

        <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->
    
        <!-- Position Column -->
        <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
        </ng-container>
    
        <!-- Name Column -->
        <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
    
        <!-- Weight Column -->
        <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef> Username </th>
        <td mat-cell *matCellDef="let element"> {{element.username}} </td>
        </ng-container>
    
        <!-- Symbol Column -->
        <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
        </ng-container>


        <!-- Symbol Column -->
        <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef> Type </th>
        <td mat-cell *matCellDef="let element"> {{element.type}} </td>
        </ng-container>
    
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

  </div>





// ************************ users-list.component.ts *************************
import { Component, Input, OnInit } from "@angular/core";
import { UserData } from "src/app/shared/user.data.interface";


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
    constructor() {}

    @Input() filteredUsers!: UserData[];
    displayedColumns: string[] = ['id', 'name', 'username', 'email', 'type'];


    ngOnInit(): void {
        console.log(this.filteredUsers);
        
    }
}






// *************************** app.users.module.ts *************************
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialsModule } from "../materials/materials.module";
import { UsersDataComponent } from "./users-data/users-data.component";
import { UsersListComponent } from "./users-data/users-list/users-list.component";
import { UsersRoutingModule } from "./users.routing.module";

@NgModule({
    declarations: [
        UsersDataComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialsModule
    ]
})

export class UsersModule {

}




