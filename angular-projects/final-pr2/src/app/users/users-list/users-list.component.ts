import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { User } from "../state/users.interface";


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit, OnDestroy {
    @Input() users!: User[];
    @Input() displayEmail!: boolean | null;
    @Output() currentUserEvent = new EventEmitter<User>();
    @Output() dispatchEmailEvent = new EventEmitter<boolean>();

    constructor(
 
    ) {}

    ngOnInit(): void {
         
    }


    toggleEmail() {
         this.dispatchEmailEvent.emit()
    }

    onChooseCurrentUser(user: User) {
        this.currentUserEvent.emit(user);
    }

    ngOnDestroy(): void {

    }

}