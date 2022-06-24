import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.reducer';
import { MapPageActions } from './maps/state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(    private store: Store<State>) {}

  ngOnInit(): void {
    // restore state of the application
    this.store.dispatch(MapPageActions.restoreData()); 
  }

}
