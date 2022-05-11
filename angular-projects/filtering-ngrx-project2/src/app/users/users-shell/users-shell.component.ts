import { Component, OnInit } from "@angular/core";
import { UsersDataService } from "../state/users-data.service";
import { UserData } from "../state/users.interface";



@Component({
    selector: 'app-users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private usersDataService: UsersDataService
    ) {}

    userData: UserData[] = [];


    ngOnInit(): void {
        this.usersDataService.getUsersData().subscribe(
            (response) => {
                console.log(response);
                this.userData = response;
            }
        );
    }

}