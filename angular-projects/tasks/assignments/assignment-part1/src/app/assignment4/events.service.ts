import { Injectable, OnInit } from "@angular/core";
import { interval, Subject, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NumbersService implements OnInit {
    counterEvents: Subject<number> = new Subject<number>()

    constructor() {}

    startCounter() {
        const time = 1000; // 1sec

        // start count from this number
        let number: number = 1;

        // set interval with RxJS
        const numbers = interval(time);
        const takePartOfNumbers = numbers.pipe(
            // take 8 events only
            take(8)
        );

        takePartOfNumbers.subscribe(() => {
            // send events outside 
            this.counterEvents.next(number);
            number++;
        });
    }

    ngOnInit(): void {

    }


    
}