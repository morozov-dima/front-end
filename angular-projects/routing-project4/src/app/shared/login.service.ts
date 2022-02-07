import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginUser: EventEmitter<boolean> = new EventEmitter();
  login: boolean = false; //data for login-guard
  constructor() { }
}
