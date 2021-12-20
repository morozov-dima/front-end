


/*
    Example
    1. querySelectorAll
    2. Array.from
*/
const numbers = [1, 2, 3];
//console.log(numbers);

const listItems = document.querySelectorAll('li');
//console.log(listItems);
const arrayListItems = Array.from(listItems);
//console.log(arrayListItems);

const hobbies1 = ['Cooking', 'Sports'];
const personalData = [30, 'Max', {moreDetail: [1, 2, 3]}];
//console.log(personalData);







/*
    Example
    1. for...of
*/
const analyticsData = [[1, 1.6],[-5.4, 2.1]];
for (const data of analyticsData) {
    for (const dataPoints of data) {
         //console.log(dataPoints);   
    }
}
//console.log(analyticsData.length);   








/*
    Example
    1. push
    2. unshift
    3. shift
    4. splice
*/
const hobbies = ['Sports', 'Cooking'];
hobbies.push('Reading');
hobbies.unshift('Coding');
const x = hobbies.pop();
hobbies.shift();
//console.log(hobbies);
hobbies.splice(1, 0, 'Good Food', 'Good Food2');
//console.log(hobbies);
hobbies.splice(2);
//console.log(hobbies);








/*
    Example
    1. concat
    2. push
    3. indexOf
*/
const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
const storedResults = testResults.concat([3.99, 2]);
testResults.push(5.91);
//console.log(storedResults, testResults);
//console.log(testResults);
//console.log(testResults.indexOf(1.5));








/*
    Example
    1. indexOf
    2. find
    3. findIndex
*/
const personData = [
    { name: 'Max' },
    { name: 'Manuel' }
];

//console.log(personData.indexOf({name: 'Max'})); // we can't use indexOf for objects

const manuel = personData.find((person, idx, persons) => {
    return person.name === 'Manuel';
});

manuel.name = 'Anna';
//console.log(manuel, personData);

const maxIndex = personData.findIndex((person, idx, persons) => {
    return person.name === 'Max';
});

//console.log(maxIndex);












/*
    Example
    1. for...of
    2. forEach
    3. push
*/
// const prices = [10.99, 5.99, 3.99, 6.59];
// const tax = 0.19;
// const taxAdjustedPrices = [];

// for (const price of prices) {
//     taxAdjustedPrices.push(price * (1 + tax));
// }

// prices.forEach((price, idx, prices) => {
//     const priceObj = {index: idx, taxAdjPrice: price * (1 + tax)}
//     taxAdjustedPrices.push(priceObj);
// });

//console.log(taxAdjustedPrices);










/*
    Example
    1. map() method
    2. push() method
*/
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

const taxAdjustedPrices = prices.map((price, idx, prices) => {
    const priceObj = {index: idx, taxAdjPrice: price * (1 + tax)}
    return priceObj;
});

//console.log(prices, taxAdjustedPrices);



























