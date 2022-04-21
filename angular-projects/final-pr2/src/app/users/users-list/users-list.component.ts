import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { User } from "../state/users.interface";


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
    @Input() users!: User[];
    @Input() displayEmail!: boolean | null;
    @Input() selectedUser: User | null | undefined;
    @Output() currentUserEvent = new EventEmitter<User>();
    @Output() dispatchEmailEvent = new EventEmitter<boolean>();
    @Output() initializeNewUser = new EventEmitter<void>();

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

    addUser() {
        this.initializeNewUser.emit();
    }


}