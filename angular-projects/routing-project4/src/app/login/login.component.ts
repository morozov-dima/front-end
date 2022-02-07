import { Component, EventEmitter, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: boolean = false;
  isLoginUser: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.loginUser = true;
    this.loginService.isLoginUser.emit(true);
    this.loginService.login = true; 
  }

  onLogout() {
    this.loginUser = false;
    this.loginService.isLoginUser.emit(false);
    this.loginService.login = false;
  }

}
