import { Component, OnInit } from "@angular/core";
import { State } from "../../state/app.reducer";
import { AuthService } from "../state/auth.service";
import { Store } from '@ngrx/store';
import { AuthPageActions } from "../state/actions";


@Component({
    selector: 'app-auth-shell',
    templateUrl: './auth-shell.component.html',
    styleUrls: ['./auth-shell.component.css']
})

export class AuthShellComponent implements OnInit {
    constructor(private authService: AuthService, private store: Store<State>) {}


    ngOnInit(): void {

    }


}