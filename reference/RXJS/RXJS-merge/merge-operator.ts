// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************
import {interval, map, merge } from 'rxjs';


const interval1$ = interval(2000);
const interval2$ = interval1$.pipe(
  map(
    result => 10 * result
  )
);
const result$ = merge(interval1$, interval2$);
result$.subscribe(x => console.log(x));



// Results in the following:
// 0
// 1
// 10
// 2
// 20
// 3
// 30
// 4
// 40