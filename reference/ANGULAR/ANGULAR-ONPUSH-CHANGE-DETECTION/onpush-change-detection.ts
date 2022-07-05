// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************



// ************************** app.component.ts ***************************
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDataService } from './get-data.service';
import { Photos } from './photos-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  // here we chnage our change detection strategy from 'default' to 'OnPush'
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  constructor(private getDataService: GetDataService) {}
  userPhotos$: Observable<Photos[]> | null = null;

  ngOnInit(): void {
    this.userPhotos$ = this.getDataService.getPhotos();
  }

}





// ************************ app.component.html *************************
<section class="main-content">
  <div>
     <app-course [userPhotos]="userPhotos$ | async"></app-course> 
  </div>
</section>







// *********************** get-data.service.ts *************************
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photos } from './photos-interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photos[]> {
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8'
      })
   };
    return this.http.get<Photos[]>(url, httpOptions);
  }
}





// ************************* photos-interface.ts ***********************
export interface Photos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string  
}