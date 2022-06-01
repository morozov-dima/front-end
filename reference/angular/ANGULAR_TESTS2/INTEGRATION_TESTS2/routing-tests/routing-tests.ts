// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************




// ************************** routing.component.ts ***********************
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








// ************************ routing.component.spec.ts *********************
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RoutingComponent } from './routing.component';

// we can create our classes.
class RouterStub {
  navigate(path: string) {}
}

class ActivatedRouteStub {
  params!: Observable<Params>
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


});



