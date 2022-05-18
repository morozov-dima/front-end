import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIn: boolean = false;


  ngOnInit(): void {
  }

  onAuth() {
    this.isLoggedIn = !this.isLoggedIn;
    this.authService.authUser(this.isLoggedIn);
  }


}
