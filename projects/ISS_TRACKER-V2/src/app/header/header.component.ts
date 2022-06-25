import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../state/app.reducer';
import { MapPageActions } from '../maps/state/actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  time: number = environment.apiCallsInterval; // 2 sec interval

  constructor(private store: Store<State>) { }
  ngOnInit(): void {
    const myIntertval = interval(this.time);
    myIntertval.subscribe({next: () => this.store.dispatch(MapPageActions.loadMaps())});
  }
}
