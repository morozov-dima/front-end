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
    const url = 'https://jsonplaceholder.typicode.com/users';
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


}
