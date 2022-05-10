import { Component, Input } from "@angular/core";
import { UsersList } from "src/app/shared/users-interface";

@Component({
    selector: 'app-users-data',
    templateUrl: './users-data.component.html',
    styleUrls: ['./users-data.component.css']
})

export class UsersDataComponent {
    @Input() users!: UsersList[];
    displayedColumns: string[] = ['id', 'name', 'age', 'email', 'phoneNumber'];

    constructor() {}

}