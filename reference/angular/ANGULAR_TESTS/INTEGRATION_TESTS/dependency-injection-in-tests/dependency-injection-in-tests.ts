// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************




// **************************** posts.service.ts **************************
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









// ************************ posts.component.ts ****************************
import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';

@Component({
  template: `Posts component`,
  selector: 'app-posts'
})

export class PostsComponent implements OnInit {
  posts: any[] = [];
  message: string= '';

  constructor(private service: PostsService) {}

  ngOnInit(): void {
    // fetch (get) data from srvice
    this.service.fetch().subscribe({
      next: (response) => {
       this.posts = response;
      },
      error: (err) => {
        this.message = err;
      }
    })
  }
  

  // add data to service
  add(title: string) {
    const post = { title };
    this.service.create(post).subscribe({
      next: (p) => {
        this.posts.push(p);
      },
      error: (err) => {
        this.message = err;
      }
    });
  }


  delete(id: number) {
    if (window.confirm('Are you sure?')) {
      this.service.remove(id).subscribe();
    }
  }
}








// *********************** posts.component.spec.ts *********************
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { PostsComponent } from "./posts.component";
import { PostsService } from "./posts.service";

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;
  let service: PostsService;


  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ PostsService ],
      imports: [ HttpClientModule ] 
    });
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PostsService);
  });




  it('should fetch posts on ngOnInit', () => {
    // ngOnInit method should be called now automatically.

    const posts = [1, 2, 3];

    // with 'of' operator we will create Observable from our array. 
    spyOn(service, 'fetch').and.returnValue(of(posts));

    // Angular should update all states.
    fixture.detectChanges();

    expect(component.posts).toEqual(posts);
  });



})


