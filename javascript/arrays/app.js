


/*
    Example
    1. querySelectorAll
    2. Array.from
*/
// const numbers = [1, 2, 3];
//console.log(numbers);

// const listItems = document.querySelectorAll('li');
//console.log(listItems);
// const arrayListItems = Array.from(listItems);
//console.log(arrayListItems);

// const hobbies1 = ['Cooking', 'Sports'];
// const personalData = [30, 'Max', {moreDetail: [1, 2, 3]}];
//console.log(personalData);







/*
    Example
    1. for...of
*/
// const analyticsData = [[1, 1.6],[-5.4, 2.1]];
// for (const data of analyticsData) {
//     for (const dataPoints of data) {
//          //console.log(dataPoints);   
//     }
// }
//console.log(analyticsData.length);   








/*
    Example
    1. push
    2. unshift
    3. shift
    4. splice
*/
// const hobbies = ['Sports', 'Cooking'];
// hobbies.push('Reading');
// hobbies.unshift('Coding');
// const x = hobbies.pop();
// hobbies.shift();
//console.log(hobbies);
// hobbies.splice(1, 0, 'Good Food', 'Good Food2');
//console.log(hobbies);
// hobbies.splice(2);
//console.log(hobbies);








/*
    Example
    1. concat
    2. push
    3. indexOf
*/
// const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedResults = testResults.concat([3.99, 2]);
// testResults.push(5.91);
//console.log(storedResults, testResults);
//console.log(testResults);
//console.log(testResults.indexOf(1.5));








/*
    Example
    1. indexOf
    2. find
    3. findIndex
*/
// const personData = [
//     { name: 'Max' },
//     { name: 'Manuel' }
// ];

//console.log(personData.indexOf({name: 'Max'})); // we can't use indexOf for objects

// const manuel = personData.find((person, idx, persons) => {
//     return person.name === 'Manuel';
// });

// manuel.name = 'Anna';
//console.log(manuel, personData);

// const maxIndex = personData.findIndex((person, idx, persons) => {
//     return person.name === 'Max';
// });

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
    3. sort() for numbers
    4. reverse() method
    5. filter() method
    6. reduce() method
*/
// const prices = [10.99, 5.99, 3.99, 6.59];
// const tax = 0.19;

// const taxAdjustedPrices = prices.map((price, idx, prices) => {
//     const priceObj = {index: idx, taxAdjPrice: price * (1 + tax)}
//     return priceObj;
// });

// console.log(prices, taxAdjustedPrices);

// const sortedPrices = prices.sort((a, b) => {
//     if (a > b) {
//        return 1; 
//     } else if (a === b) {
//         return 0;
//     } else {
//         return -1;
//     }
// });

// console.log(sortedPrices.reverse());
// console.log(sortedPrices);

// // const filteredArray = prices.filter((price, ind, prices) => {
// //     return price > 6;
// // });


// const filteredArray = prices.filter(price => price > 6);
// console.log(filteredArray);



// let sum2 = 0;
// prices.forEach(price => {
//     sum2 += price;
// });
// console.log(sum2);


// // const sum = prices.reduce((prevValue, curValue, curIndex, prices) => {
// //     return prevValue + curValue;
// // }, 0);

// const sum = prices.reduce((prevValue, curValue) => prevValue + curValue, 0);

// console.log(sum);










/*
    Example
    1. map() method
    2. reduce() method
    3. spread operator (...)
*/
// const originalArray = [
//     {price: 10.99},
//     {price: 5.99},
//     {price: 29.99}
// ];

// console.log(originalArray);

// // const transformedArray = originalArray.map(obj => obj.price);
// const transformedArray = originalArray.map(obj => obj.price).reduce((sumVal, curVal) => sumVal + curVal, 0);
// console.log(transformedArray);

// //const sum = transformedArray.reduce((sumVal, curVal) => sumVal + curVal, 0);
// // console.log(sum);



// const data = 'new york;10.99;2000';
// const transformedData = data.split(';');
// console.log(transformedData);


// const nameFragements = ['Max', 'Schwarz'];
// const name = nameFragements.join(' ');
// console.log(name);


// // we can copy arrays with SPREAD operator (...)
// const copiedNameFragments = [...nameFragements];
// nameFragements.push('Mr');
// console.log(nameFragements, copiedNameFragments);



// // we can find min/max values in array with spread (...) operator
// const prices = [10.99, 5.99, 3.99, 6.59];
// //console.log(Math.min(prices)); // we get NaN
// console.log(Math.min(...prices));
// console.log(Math.max(...prices));



// const persons = [
//     { name: 'Max', age: 30},
//     { name: 'Manuel', age: 31}
// ];

// const copiedPersons = persons.map((person) => ({name: person.name, age: person.age }));
// persons.push({name: 'Anna', age: 29});

// persons[0].age = 31;

// console.log(persons, copiedPersons);









/*
    Example
    1. array destructing
    2. REST operator
*/
// const nameData = ['Max', 'Schwarz', 'Mr', 30];
// // const firstName = nameData[0];
// // const lestName = nameData[1];

// const [ firstName, lastName , ...otherInformation] = nameData;

// console.log(firstName);
// console.log(lastName);
// console.log(otherInformation);


























































































