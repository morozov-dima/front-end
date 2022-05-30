import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: any): Observable<any> {
    // here we use empty url (because we want just create test)
    return this.http.post(``, post);
  }

  fetch(): Observable<any[]> {
    // here we use empty url (because we want just create test)
    return this.http.get<any[]>(``)
  }

  remove(id: number): Observable<any> {
    // here we use empty url (because we want just create test)
    return this.http.delete<void>(`${id}`)
  }
}
