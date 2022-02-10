import { Injectable } from '@angular/core';
import { UserDataModel } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {
  subscriptionsData: UserDataModel[] = [
    {
      subscriptionName: 'Basic'
    },
    {
      subscriptionName: 'Advanced'
    },
    {
      subscriptionName: 'Default'
    }
  ];

  constructor() { }
}
