import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showTab: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isLoginUser.subscribe(data => this.showTab = data );
  }

}
