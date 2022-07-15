import {Component, OnInit} from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';
import {Store} from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{


    constructor(private store:Store) {

    }

    ngOnInit() {
        this.store.init();

    }

}
