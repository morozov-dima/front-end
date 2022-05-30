import { FormBuilder } from "@angular/forms";
import { CounterComponent } from "./counter.component";

describe('CounterComponent', () => {
    let component: CounterComponent;

    // execute code that inside 'beforeEach' before each test.
    beforeEach(() => {
        // 1. here we will create instance of 'CounterComponent'
        // 2. we can create this instance outside of 'it' functions.
        // 3. and now before each test we create different instance of 'CounterComponent'
        component = new CounterComponent(new FormBuilder());
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
    });



    // we will test our EventEmitter
    // EventEmitters are Observables and we can subscribe.
    it('should increment value by event emitter', () => {
        let result: any = null;

        // now we can subscribe to our 'EventEmitters'
        component.counterEmitter.subscribe(responseFromEmit => {
            result = responseFromEmit;
        });

        component.increment(); // now result 0 -> 1

        // now ewsult should be 1
        expect(result).toBe(1);

    });




    // Form Tests
    // we check if our controls exist.
    it('should create form with 2 controls', () => {
        // here we check if our form have 'login' validator.
        expect(component.form.contains('login')).toBeTruthy();

        // 1. here we check if our form have 'email' validator.
        // 2. we can use Jasmine method 'toBeTruthy' that check if our valie is true.
        //    this is like we write '.toBe(true);'
        expect(component.form.contains('email')).toBeTruthy();
    });



    // Form Tests
    // Here we check if our form validasion work
    // this way we test 'required' validator.
    it('should mark login as invalid if empty value', () => {
        // this way we can get 'login' control.
        const control = component.form.get('login');

        //now we set 'empty value' to our form input.
        control?.setValue('');

        // now we expect that our 'control' will be not valid. Because we set 'empty value'
        // here we can use Jasminbe mmethod that check if our value is falsy 'toBeFalsy'
        expect(control?.valid).toBeFalsy();
    });

});