import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedInUser: boolean = false;
  login: EventEmitter<boolean> = new EventEmitter();
  constructor() {}


}
