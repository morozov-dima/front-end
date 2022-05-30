import { greet } from './greet';


describe('greet function', () => {
    it('should include name in result', () => {
        // 1. here we use 'toContain' Jasmine method.
        // 2. In this test we check that result that returned from greet('Angular')
        //    contain 'Angular' word.
        expect(greet('Angular')).toContain('Angular');
    });
});