// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************


// ************************* counter.component.ts **************************
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-counter',
    template: `Counter: {{counter}}`
})

export class CounterComponent {
    counter: number = 0;
    form!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            login: ['',  Validators.required],
            email: ['']
        });
    }

    @Output() counterEmitter = new EventEmitter<number>();

    increment() {
        this.counter++;
        this.counterEmitter.emit(this.counter);
    }

    decrement() {
        this.counter--;
    }
}








// ************************** counter.component.spec.ts ************************
import { FormBuilder } from "@angular/forms";
import { CounterComponent } from "./counter.component";

describe('CounterComponent', () => {
    let component: CounterComponent;

    // execute code that inside 'beforeEach' before each test.
    beforeEach(() => {
        // 1. here we will create instance of 'CounterComponent'
        // 2. we can create this instance outside of 'it' functions.
        // 3. and now before each test we create different instance of 'CounterComponent'
        // 4. for our tests we can pass 'new FormBuilder()' to 'new CounterComponent()'
        component = new CounterComponent(new FormBuilder());
    })





 

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