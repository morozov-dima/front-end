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