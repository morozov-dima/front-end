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
