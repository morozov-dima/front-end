import { Component} from '@angular/core';
import { AccountsService } from '../shared/account/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  constructor(
      private accountsService: AccountsService
    ) 
    {
      this.accountsService.statusUpdated.subscribe(
        (status: string) => {
          console.log('New Status: ' + status);
          
        }
      );
    }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);

  }
}
