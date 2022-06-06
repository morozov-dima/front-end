// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************





// *********************** posts.component.spec.ts *********************
import { of } from "rxjs";
import { WelcomeComponent } from "../welcome/welcome.component";
import { UserDataService } from "./user-data.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";



describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let component: WelcomeComponent;
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [ UserDataService ],
      imports: [ HttpClientModule ] 
    });
    
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(UserDataService);
  });


  it('should fetch posts on ngOnInit', () => {
    // ngOnInit method should be called now automatically.
    const data = [
    {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
      },
      {
        albumId: 1,
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
      }
    ];

      // with 'of' operator we will create Observable from our array. 
      spyOn(service, 'fetchUserData').and.returnValue(of(data));

      // Angular should update all states.
      fixture.detectChanges();

      expect(component.data).toEqual(data);
  });

});










// **************************** posts.service.ts **************************
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserDataInterface } from "./user-data.interface";

@Injectable({
    providedIn: 'root'
})

export class UserDataService {

    constructor(private http: HttpClient) {}

    fetchUserData(): Observable<UserDataInterface[]> {
        const url = 'https://jsonplaceholderd.typicode.com/photos?_limit=10';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8'
            }),
          };
        return this.http.get<UserDataInterface[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );  
    }



    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }

}








// ************************ posts.component.ts ****************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataInterface } from '../shared/user-data.interface';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(private userDataService: UserDataService) { }

  userDataSub!: Subscription;
  data: UserDataInterface[] = [];

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userDataSub = this.userDataService.fetchUserData().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed !!!');
      }
    });
  }

  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }

}

