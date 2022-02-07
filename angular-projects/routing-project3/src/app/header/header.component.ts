import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    
    this.loginService.login.subscribe((data) => {
      this.isLogin = data;
    });
    

  }

}
