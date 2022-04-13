import { Component, OnInit } from '@angular/core';
import { State } from './state/app.state';
import { Store } from '@ngrx/store';
import { AuthPageActions } from './auth/state/actions';
import { getAuthFeatureState } from './auth/state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private store: Store<State>  
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.store.dispatch(AuthPageActions.AutoLogin());
    }, 1500);
  }



}
