
// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************



// For each click event, tick every second from 0 to 3, with no concurrency
import { fromEvent, concatMap, interval, take } from 'rxjs';
 
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  concatMap(ev => interval(1000).pipe(take(4)))
);
result.subscribe(x => console.log(x));
 
// Results in the following:
// (results are not concurrent)
// For every click on the "document" it will emit values 0 to 3 spaced
// on a 1000ms interval
// one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3