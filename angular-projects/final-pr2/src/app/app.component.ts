import { Component, OnInit } from '@angular/core';
import { State } from './state/app.state';
import { Store } from '@ngrx/store';
import { AuthPageActions } from './auth/state/actions';
import { getAuthFeatureState, getUser } from './auth/state/auth.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  showLoader: boolean = true;  

  constructor(
    private store: Store<State>  
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.store.dispatch(AuthPageActions.AutoLogin());
      this.showLoader = false;
    }, 1000);

  }

}
