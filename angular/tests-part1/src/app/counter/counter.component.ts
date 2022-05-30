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
        // we want test that this emit work with our tests.
        this.counterEmitter.emit(this.counter);
    }

    decrement() {
        this.counter--;
    }
}