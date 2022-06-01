import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { RoutingComponent } from './routing.component';

// we can create our classes.
class RouterStub {
  navigate(path: string) {}
}

class ActivatedRouteStub {
  private subject = new Subject<Params>();

  push(params: Params) {
    this.subject.next(params);
  }

  get params() {
    return this.subject.asObservable();
  }

 // params!: Observable<Params>
}


describe('RoutingComponent', () => {
  let component: RoutingComponent;
  let fixture: ComponentFixture<RoutingComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ RoutingComponent ],
      providers: [
                // instead 'Router' use 'RouterStub'
                {provide: Router, useClass: RouterStub},
                 // instead 'ActivatedRoute' use 'ActivatedRouteStub'
                {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })

    fixture = TestBed.createComponent(RoutingComponent);
    component = fixture.componentInstance;
  });



  it('should be defined', () => {
    expect(component).toBeDefined();
  });




  it('should navigate to posts if go back', () => {
    let router = fixture.debugElement.injector.get(Router);
    let spy = spyOn(router, 'navigate');

    // call 'goBack' method.
    component.goBack();

    expect(spy).toHaveBeenCalledOnceWith(['/posts']);
  });




  // it('should navigate to 404 if id = 0', () => {
  //   let router = fixture.debugElement.injector.get(Router);
  //   let spy = spyOn(router, 'navigate');

 

  //   expect(spy).toHaveBeenCalledWith(['/404']);
  // });



});
