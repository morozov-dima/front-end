// **********************************************************************
// ****************************** Example *******************************
// **********************************************************************




// ************************ app.component.ts **************************
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RandomUserDataService } from './shared/random-user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private randomUserDataService: RandomUserDataService) {}

  userFirstName$: Observable<string> | null = null;
  userLastName$: Observable<string> | null = null;
  userPicture$: Observable<string> | null = null;

  ngOnInit(): void {
    const randomUserData$ = this.randomUserDataService.getRandonUser();

    this.userFirstName$ = randomUserData$.pipe(
      map(res => res.name.first)
    );

    this.userLastName$ = randomUserData$.pipe(
      map(res => res.name.last)
    );

    this.userPicture$ = randomUserData$.pipe(
      map(res => res.picture.large)
    );
  }

}







// ************************ app.component.html **************************
<section class="random-user">
   <p>First Name : {{userFirstName$ | async}}</p> 
   <p>Last Name: {{userLastName$ | async}}</p>
   <p>
    <img [src]="userPicture$ | async" alt="">
   </p>
</section>







// ********************* random-user-data.ts ***************************
export interface RandomUserData {
    name: {
        first: string;
        last: string;
    }
    picture: {
        large: string;
    }
}






// ********************* random-user-data.service.ts *******************
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RandomUserData } from './random-user-data';

@Injectable({
  providedIn: 'root'
})
export class RandomUserDataService {

  constructor(private http: HttpClient) { }

  getRandonUser(): Observable<RandomUserData> {
    const url = 'https://randomuser.me/api/';
    return this.http.get<any>(url).pipe(
      map((response) => response.results[0] )
    );
  }

}

