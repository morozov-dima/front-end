import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';


describe('Async Testing Examples', () => {




    // not recommended
    it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {

            console.log('running assertions');

            test = true;

            expect(test).toBeTruthy();

            done();

        }, 1000);
    });





    // Async test with setTimeout
    it('Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;

        // async operation
        setTimeout(() => {
        });

        // async operation
        setTimeout(() => {

            console.log('running assertions setTimeout()');

            test = true;

        }, 1000);

        flush();

        expect(test).toBeTruthy();
    }));







    // Async test with Promise - recommended
    it('Asynchronous test example - plain Promise', fakeAsync(() => {
        let test = false;

        console.log('Creating promise');

        Promise.resolve()
        .then(() => {

            console.log('Promise first then() evaluated successfully');

            return Promise.resolve();
        })
        .then(() => {

            console.log('Promise second then() evaluated successfully');

            test = true;

        });

        flushMicrotasks();

        console.log('Running test assertions');

        expect(test).toBeTruthy();
    }));








    // Async test with setTimeout + Promise - recommended
    it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
        let counter = 0;

        Promise.resolve()
            .then(() => {

               counter+=10;

               setTimeout(() => {

                   counter += 1;

               }, 1000);

            });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(10);

        tick(500);

        expect(counter).toBe(11);
    }));








    // Async test with Observables- recommended
    it('Asynchronous test example - Observables', fakeAsync(() => {
        let test = false;

        console.log('Creating Observable');

        const test$ = of(test).pipe(delay(1000)); // here we add some delay, 1 sec.

        test$.subscribe(() => {

            test = true;

        });

        tick(1000); // wait 1sec

        console.log('Running test assertions');

        expect(test).toBe(true);
    }));









});
















