import { Component, Input, OnInit } from "@angular/core";
import { UserData } from "../../../shared/user.data.interface";


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