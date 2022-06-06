// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************


// ************************** counter.component.ts **************************
import { Component } from "@angular/core";
@Component({
    selector: 'app-counter',
    template: `Counter: {{counter}}`
})


export class CounterComponent {
    counter: number = 0;

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }
}







// *********************** counter.component.spec.ts ***********************
import { CounterComponent } from "./counter.component";

describe('CounterComponent', () => {
    let component: CounterComponent;

    // execute code that inside 'beforeEach' before each test.
    beforeEach(() => {
        // 1. here we will create instance of 'CounterComponent'
        // 2. we can create this instance outside of 'it' functions.
        // 3. and now before each test we create different instance of 'CounterComponent'
        component = new CounterComponent();
    })

    
    // ################################### We can also use #################################:
    // beforeAll - we can call this method and this method will be called before all 'its'.
    // afterEach - we can call this method and this method will be called after end of each it.
    // afterAll  - we can call this method and this method will be called after end of 'its'.
    // #####################################################################################:


    // expectation
    it('should increment counter by 1', () => {
        // after we create class instance we can use class methods and properties.
        component.increment();
        // we expect that property of our object will be 1
        expect(component.counter).toBe(1);
    });



    // if we want to pass some test instead 'it' write 'xit'
    it('should decrement counter by 1', () => {
        // after we create class instance we can use class methods and properties.
        component.decrement();
        // we expect that property of our object will be 1
        expect(component.counter).toBe(-1);
    })

});