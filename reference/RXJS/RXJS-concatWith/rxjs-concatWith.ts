// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************


/*
 * Emits all of the values from the source observable, then, once it completes,
 * subscribes to each observable source provided, one at a time, emitting all of
 * their values, and not subscribing to the next one until it completes.
 * 
 * more information here : https://v6.rxjs.dev/api/operators/concatWith
 *
*/



// *************************** app.component.ts ***************************
import { Component, OnInit } from '@angular/core';
import { concatWith, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    const source1$ = of(1,2,3);
    const source2$ = of(4,5,6);
    const source3$ = of(7,8,9);
    
    const result$ = source1$.pipe(
      concatWith(
        source2$
      ),
      concatWith(
        source3$
      )
    );

    result$.subscribe(x => console.log(x));
  }
}



// Output
// 1
// 2
// 3

// 4
// 5
// 6

// 7
// 8
// 9

