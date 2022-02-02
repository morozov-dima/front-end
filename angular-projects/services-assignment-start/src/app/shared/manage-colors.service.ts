import { EventEmitter, Injectable, AfterViewInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageColorsService implements AfterViewInit {

  getColor = new EventEmitter<string>();

  constructor() { }

  ngAfterViewInit() {

  }

}
