import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserData } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  /*
   * get data from srver with GET method.
   * we will use https://jsonplaceholder.typicode.com/todos/?_limit=4
  */
  getDataFromServer():Observable<UserData[]> {
    const configUrl = 'https://jsonplaceholder.typicode.com/todos/?_limit=4';

    const httpOptions = {
      headers: new HttpHeaders({
        'key': 'xyztrtddffsw'
      }),
      params: new HttpParams({
        fromString: 'a=23232'
      })
    };  

    return this.http.get<UserData[]>(configUrl, httpOptions);
  }

}
