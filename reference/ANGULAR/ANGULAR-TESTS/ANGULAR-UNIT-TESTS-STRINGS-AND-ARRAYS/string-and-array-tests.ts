// *************************************************************************
// ************************** Example - string test  ***********************
// *************************************************************************


// ******************************** greet.ts *******************************
// we will test this 'string'
export function greet(name: string) {
    return `Hello, ${name}`;
}




// ******************************* greet.spec.ts ***************************
import { greet } from './greet';

describe('greet function', () => {
    it('should include name in result', () => {
        // 1. here we use 'toContain' Jasmine method.
        // 2. In this test we check that result that returned from greet('Angular')
        //    contain 'Angular' word.
        expect(greet('Angular')).toContain('Angular');
    });
});










// *************************************************************************
// ************************** Example - array test  ************************
// *************************************************************************


// ****************************** countries.ts *****************************
export function countries() {
   return ['RU', 'UA', 'BY'];
}



// ***************************** countries.spec.ts *************************
import { countries } from "./countries";

// here we will test 'Array'
describe('countries', () => {
    it('should contain countries codes', () => {
        // here we get our array.
        const result = countries();

        // and then we can test
        expect(result).toContain('RU');    
        expect(result).toContain('UA');   
        expect(result).toContain('BY');   
    })
});