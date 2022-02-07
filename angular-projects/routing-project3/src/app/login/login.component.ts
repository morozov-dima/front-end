import { Component, EventEmitter, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.loginUser = true;
    this.loginService.isLoggedInUser = true;
     this.loginService.login.emit(true);

  }

  onLogout() {
    this.loginUser = false;
    this.loginService.isLoggedInUser = false;
     this.loginService.login.emit(false);
  }

}
