// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************


// ****************************** compute.ts *******************************
export function compute(x: number) {
    if (x < 0) {
        return 0;
    }

    return x + 1;
}






// **************************** compute.spec.ts *****************************
// here we need import our 'compute' function because we will test this function.
import { compute } from './compute';


/*
    1. This is our test functions.
    2. Here we use Jasmine 'describe' function.
    3. We pass two parameter to 'describe' function. first some string that
       describe our test (name of function that we test), second call back function.  
*/
describe('compute function', () => {
    // 1. we will use Jasmine function 'it'
    // 2. first parameter we pass string with description.
    // 3. second parameter we pass callback function, where we will write our test.
    // 4. 'should return 0 if negative input' this message we will see after our test report.
    it('should return 0 if negative input', () => {
        // here will be our test
        // we will run our 'compute' function from 'compute.ts' and we will pass '-1'
        // and result of current function we will assign to some const.
        const result = compute(-1);

        // 1. then in order to test 'result' const we will use 'expect()' Jasmine function
        // 2. then we will use 'toBe()' Jasmine function
        // 3. here we want that our result will be 0, if we run current test.
        expect(result).toBe(0);
    });



    it('should increment input if positive', () => {
        const result = compute(1);
        expect(result).toBe(2);
    });


});