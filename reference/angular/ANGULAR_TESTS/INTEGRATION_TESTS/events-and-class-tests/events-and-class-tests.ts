// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************




// ************************** counter.component.html ***********************
<h1 class="counter" [class.green]="counter % 2 === 0">
    {{counter}}
</h1>

<button id="increment" (click)="increment()">
    Increment
</button>

<button (click)="decrement()">
    Decrement
</button>






// ************************ counter.component.ts ************************
import {Component} from "@angular/core";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  // we will test this property.  
  counter: number = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}






// ********************** counter.component.spec.ts ********************
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import {CounterComponent} from "./counter.component";

describe('CounterComponent', () => {
  // in this 'spec' we will test 'CounterComponent'
  let component: CounterComponent;

  // here we create 'fixture' of type 'ComponentFixture', it is generic type and we will
  // add <CounterComponent>
  let fixture: ComponentFixture<CounterComponent>;


  beforeEach(() => {
    // here we configure our testing module.
    TestBed.configureTestingModule({
      // in this test, we will test 'CounterComponent', and we need declare in.
      declarations: [CounterComponent]
    });

    // 1. we will create our component.
    // 2. here we will use 'createComponent' method.
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    //fixture.debugElement;
    //fixture.nativeElement;
  })



  // we want to check if our component was created.
  it('should be created', () => {
    // here we check if our 'component' was defined.
    expect(component).toBeDefined();
  });



  it('should add green class if counter is even', () => {
    // set counter value to 6
    component.counter = 6;

    // we tell to angular that same chabge was done
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.counter'));
    let el: HTMLElement = de.nativeElement;

    // here we check that our expresion is true.
    // we check that our element contains class 'green'.
    expect(el.classList.contains('green')).toBeTruthy();
  });



  it('should increment counter if increment button was clicked', () => {
      let btn = fixture.debugElement.query(By.css('#increment'));
      
      // we call 'click' method. 
      btn.triggerEventHandler('click', null);  

      expect(component.counter).toBe(1);
  });


})


