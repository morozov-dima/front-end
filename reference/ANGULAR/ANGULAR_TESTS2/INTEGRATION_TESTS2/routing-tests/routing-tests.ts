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
