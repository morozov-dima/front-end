import { Component, Input } from "@angular/core";
import { UserData } from "../../state/users.interface";




@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})

export class UsersTableComponent {
    @Input() userData: UserData[] = [];
    displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website', 'type'];
 

}