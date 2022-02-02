import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: EventEmitter<string> = new EventEmitter();


  constructor() { }
}
