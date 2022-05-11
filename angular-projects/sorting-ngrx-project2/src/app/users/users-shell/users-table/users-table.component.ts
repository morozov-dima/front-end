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