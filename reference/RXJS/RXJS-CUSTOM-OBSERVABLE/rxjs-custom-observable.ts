// ****************************************************************
// *************************** Example 1 **************************
// ****************************************************************




/*
 * The following is an Observable that pushes the values 1, 2, 3 immediately (synchronously)
 * when subscribed, and the value 4 after one second has passed since the subscribe call, then completes:
 * 
 * more information you ca find here : https://rxjs.dev/guide/observable
 *
*/
import { Observable } from 'rxjs';
 
const myCustomObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});



/*
 * To invoke the Observable and see these values, we need to subscribe to it:
*/
console.log('just before subscribe');
myCustomObservable.subscribe({
  next(response) { console.log('got value ' + response); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');




/*
 * the result of custom Observable after subscribe will be in console:
*/
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
