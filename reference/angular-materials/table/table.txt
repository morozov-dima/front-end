// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************




// ********************* users-table.component.ts ***********************
import { Component, Input } from "@angular/core";
import { User } from "../../state/users.interface";

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})

export class UsersTableComponent {
    
    constructor() {}

    @Input() users!: User[];
    displayedColumns: string[] = ['id', 'name', 'age', 'email', 'phoneNumber'];

}






// ********************* users-table.component.html ***********************
<div class="table-data">
    <table mat-table [dataSource]="users" class="mat-elevation-z8">

        <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->
    
        <!-- No Column -->
        <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
        </ng-container>
    
        <!-- Name Column -->
        <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
    
        <!-- Age Column -->
        <ng-container matColumnDef="age">
        <th mat-header-cell *matHeaderCellDef> Age </th>
        <td mat-cell *matCellDef="let element"> {{element.age}} </td>
        </ng-container>
    
        <!-- Email Column -->
        <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
        </ng-container>


        <!-- Website Column -->
        <ng-container matColumnDef="phoneNumber">
            <th mat-header-cell *matHeaderCellDef> Phone Number </th>
            <td mat-cell *matCellDef="let element"> {{element.phoneNumber}} </td>
        </ng-container>

    
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
</div> 