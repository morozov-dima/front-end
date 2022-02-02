import { 
  Component, 
  OnInit
 } from '@angular/core';

import { AccountsService } from './shared/account/account.service';
import { CounterService } from './shared/counter/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(
      private accountsService: AccountsService,
      private counterService: CounterService
    ) {}  

  ngOnInit(): void {
      this.accounts = this.accountsService.accounts;
  }



}
