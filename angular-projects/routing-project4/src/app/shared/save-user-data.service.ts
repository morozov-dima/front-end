import { Injectable } from '@angular/core';
import { UserData } from './user-data';


@Injectable({
  providedIn: 'root'
})
export class SaveUserDataService {
  data: UserData[] = [
    {
      gameId: 101,
      gameName: 'Gameff4'
    },
    {
      gameId: 303,
      gameName: 'Gamedd3'
    },
    {
      gameId: 443,
      gameName: 'Gamedd4'
    }
  ];
  constructor() { }
}
