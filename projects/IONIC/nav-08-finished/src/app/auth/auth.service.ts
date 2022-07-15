import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() {}

  // login method
  login() {
    this._userIsAuthenticated = true;
  }

  // logout method
  logout() {
    this._userIsAuthenticated = false;
  }
}
