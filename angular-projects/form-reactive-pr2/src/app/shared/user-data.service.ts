import { Injectable } from '@angular/core';
import { UserDataModel } from './user-data-model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData: UserDataModel[] = [];

  constructor() { }


  saveUserData(userD: UserDataModel) { 
    console.log(userD);
    
    this.userData.push(userD);
  }

  

}
