// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************


// ************************** counter.component.ts **************************
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-counter',
    template: `Counter: {{counter}}`
})

export class CounterComponent {
    counter: number = 0;
    @Output() counterEmitter = new EventEmitter<number>();

    increment() {
        this.counter++;
        // we want test that this emit work with our tests.
        this.counterEmitter.emit(this.counter);
    }

    decrement() {
        this.counter--;
    }
}







// ********************** counter.component.spec.ts **********************
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


    // we will test our EventEmitter !!!!!!!
    // EventEmitters are Observables and we can subscribe.
    it('should increment value by event emitter', () => {
        let result: any = null;

        // now we can subscribe to our 'EventEmitters'
        component.counterEmitter.subscribe(responseFromEmit => {
            result = responseFromEmit;
        });

        component.increment(); // now result 0 -> 1

        // now result should be 1
        expect(result).toBe(1);
    })




});