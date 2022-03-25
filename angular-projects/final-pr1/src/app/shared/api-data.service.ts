import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersModel } from './data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiDataService {

  constructor(private http: HttpClient) { }


  getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users/?_limit=3';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: 'my-auth-token'
      })
    };
    return this.http.get<UsersModel>(
      url,
      httpOptions
    )
  }




  getUsersAddress() {
    const url = 'https://jsonplaceholder.typicode.com/users/?_limit=3';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: 'my-auth-token'
      })
    };
    return this.http.get<any>(
      url,
      httpOptions
    )
    // 1. here we want change our response.
    // 2. we will use map() operator in order to change object 
    //    that we get from server as responce.
    // 3. we declare new object 'userAddressData' and we will
    //    assign to this object values from object that we get 
    //    from response.
    .pipe(
      map(
        usersData => {
         // create new object according to our interface. 
         const userAddressData: UsersModel[] = []; 
       
         // 1. we loop for our array of objects.
         // 2. 'userData' is each object in our array.
         for (const userData of usersData) {
           // 1. we assign new vakues to 'userAddressData'
           //    array of objects. Then we will return this new object
           //    and in html page we will subscribe to current method and we will
           //    get new updated object according to our 'UsersModel' interface.
           userAddressData.push({
            id: userData.id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            city: userData.address.city,
            street: userData.address.street
           });
           
         }
          // 1. here we return new updated object.
          // 2. this object take only part of values from object 
          //    that we get from response.
          return userAddressData;
        }
      )
    );
  }


}
