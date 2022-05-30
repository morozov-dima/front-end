import { EMPTY, of, throwError } from "rxjs";
import { PostsComponent } from "./posts.component";
import { PostsService } from "./posts.service";

describe('PostsComponent', () => {
  // here we create varialbe with our component type.
  let component: PostsComponent;

  // here we create varialbe with our service type.
  let service: PostsService;




  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ["http"]);
    service = new PostsService(spy);
    component = new PostsComponent(service);
  });



  // #################### fetch method test  #####################
  // 1. it this test we test ### ngOnInit service methods ### 
  // 2. in this test we check if our method 'fetch' exist on 'ngOnInit'
  it('should call fetch when ngOnInit', () => {
    // 1. here we will use Jasmine 'spyOn' method.
    // 2. first parameter: our servie.
    // 3. second parameter: is name of method that we want to test 'fetch' from our service.
    const spy = spyOn(service, 'fetch').and.callFake(() => {
      // 'EMPTY' const that imported from rxjs. Observable that emit no items.
      return EMPTY;
    });

    component.ngOnInit();
    // 'toHaveBeenCalled' means that our 'spy' was called.
    expect(spy).toHaveBeenCalled();

  });



  // #################### fetch method test  #####################
  // 1. it this test we test ### ngOnInit service methods ### 
  // 2. in this test we check if our method length 'fetch' not empty.
  // 3. while our methods (fetch) return some data (posts)
  it('should update posts length after ngOnInit', () => {
    // we create this array. then we will convers ot to Observable with 'of' rxjs function.
    // and we will say that method that we test return this Observable (posts).
    const posts = [1, 2, 3, 4];
    // 1. here we will use Jasmine 'spyOn' method.
    // 2. first parameter: our servie.
    // 3. second parameter: is name of method that we want to test 'fetch' from our service.
    // here we use rxjs 'of' method that convers array to Observables.
    spyOn(service, 'fetch').and.returnValue(of(posts));

    component.ngOnInit();
    // 'toHaveBeenCalled' means that our 'spy' was called.
    // our array must be from 3 elements.
    expect(component.posts.length).toBe(posts.length);
  });




  // #######################  add() method test #####################
  // it this test we test ### add() ### service method. here we test that our method can add new post.
  it('should add new post', () => {
    // first we create 'spy' const, we will spy for our service and its method 'create'
    const post = { title: 'test'};
    const spy = spyOn(service, 'create').and.returnValue(of(post));

    // 1. then we can call our component.
    // 2. we call add() method and we pass some string for test.
    // 3. after this call 'test' value added to 'posts' array.
    component.add(post.title)

    // we will check if our 'spy' was called.
    expect(spy).toHaveBeenCalled();

    // and we can also test that now our 'posts' array have one value 'test'
    expect(component.posts.includes(post)).toBeTruthy();
  });




  // #######################  add() method test #####################
  // it this test we test ### add() ### service method. we will test error message.
  it('should set message to error message', () => {
    const error = 'Error message';
    
    // will return Observable that create error.
    // here we throw error.
    spyOn(service, 'create').and.returnValue(throwError(() => error));

    component.add('Post title');

    // and we test
    expect(component.message).toBe(error);
  });





  // #################### delete method test  #####################
  // in case user press 'yes' in confirm popup
  it('should remove post if user confirms', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);

    // user press 'yes' in confirm window.
    spyOn(window, 'confirm').and.returnValue(true);

    // if we delete some post. For example post with id=10
    component.delete(10);

    // then we expect that our 'spy' was called with parameter '10'
    expect(spy).toHaveBeenCalledWith(10);
  });




  // #################### delete method test  #####################
  // in case user press 'no' in confirm popup
  it('should NOT remove post if user doesnt confirm', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);

    // user press 'yes' in confirm window.
    spyOn(window, 'confirm').and.returnValue(false);

    // if we delete some post. For example post with id=10
    component.delete(10);

    // then we expect that our 'spy' was not called.
    expect(spy).not.toHaveBeenCalled();
  });




});
