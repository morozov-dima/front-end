// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************


import { timer } from 'rxjs';

// first argument - is initial delay before starting the stream of values.
// second angument is the timer inetrval.
const interval$ = timer(3000, 1000);

interval$.subscribe(val => console.log("stream 1 => " + val));



// Logs: (only after 3 sec the stream is started)
// stream 1 => 0
// stream 1 => 1
// stream 1 => 2
// stream 1 => 4