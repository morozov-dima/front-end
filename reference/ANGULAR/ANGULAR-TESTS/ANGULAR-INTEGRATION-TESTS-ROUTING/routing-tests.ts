// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************




// ************************** navbar.component.html **********************
<nav>
    <a routerLink="/posts">Posts</a>
    <a routerLink="/home">Home</a>
    <a routerLink="/about">About</a>
    <a routerLink="/about">About</a>
</nav>
  




// ************************ navbar.component.spec.ts *********************
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have link to posts page', () => {
     let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
     console.log(debugElements);
     
     let index = debugElements.findIndex(e => e.properties['pathname'] === '/posts');
     console.log(index);
      

     expect(index).toBeGreaterThan(-1);
   });


});




// ************************ navbar.component.ts *********************
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] === 0) {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack() {
    // navigate to posts page
    this.router.navigate(['/posts']);
  }

}




















// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************ routing.component.spec.ts *********************
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RoutingComponent } from './routing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// we can create our classes.
class RouterStub {
  // here we will create this angular method
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
      imports: [
        RouterTestingModule
      ],
      providers: [
                // instead 'Router' use 'RouterStub'
                {provide: Router, useClass: RouterStub},
                 // instead 'ActivatedRoute' use 'ActivatedRouteStub'
                {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      schemas: [
        // now rest components that we are not testing now will be ignored.
        NO_ERRORS_SCHEMA
      ]
    })

    fixture = TestBed.createComponent(RoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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




   it('should navigate to 404 if id = 0', () => {
     let router = fixture.debugElement.injector.get(Router);
     let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
     let spy = spyOn(router, 'navigate');
     route.push({id: 0});
     expect(spy).toHaveBeenCalledWith(['/404']);
   });



   it('should have router-outlet diretive', () => {
     let de = fixture.debugElement.query(By.directive(RouterOutlet));
     expect(de).not.toBeNull();
   });



});







// ************************ routing.component.ts *********************
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] === 0) {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack() {
    // navigate to posts page
    this.router.navigate(['/posts']);
  }

}




// ************************ routing.component.html *********************
<app-navbar></app-navbar>

<router-outlet></router-outlet>
