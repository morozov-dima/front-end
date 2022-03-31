import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../state/app.state';

import * as UserActions from './state/user.actions';

import { getShowUserName } from './state/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<State>) { }

  displayText: boolean = false;
  showUser$!: Observable<boolean>;

  ngOnInit(): void {
    // here we use selector
    // for observable variables we add '$' in the end.
    this.showUser$ = this.store.select(getShowUserName);
  }


  checkChanged() {
    // here we dispatch to this action 'maskUserName'
    this.store.dispatch(UserActions.maskUserName());
  }


}
