


/*
    Example
    1. querySelectorAll
    2. Array.from
*/
// const numbers = [1, 2, 3];
// //console.log(numbers);

// const listItems = document.querySelectorAll('li');
// //console.log(listItems);

// // The Array.from() static method creates a new,
// // shallow-copied Array instance from an array-like or iterable object.
// const arrayListItems = Array.from(listItems);
// //console.log(arrayListItems);

// arrayListItems.forEach(arrayListItem => {
//     //console.log(arrayListItem.outerText);
// });

// const hobbies1 = ['Cooking', 'Sports'];
// const personalData = [30, 'Max', {moreDetail: [1, 2, 3]}];
// for (const pData of personalData) {
//     console.log(pData);
// }
// //console.log(personalData);











/*
    Example
    1. for...of
*/

// // 1. we can create two dimensional arrays.
// // 2. here we use for... of , this is for arrays.
// const analyticsData = [[1, 1.6],[-5.4, 2.1]];
// // loop for main array.
// for (const data of analyticsData) {
//     // loop for internal array.
//     for (const dataPoints of data) {
//          console.log(dataPoints);   
//     }
// }
// console.log(analyticsData.length);   








/*
    Example 3
    1. push
    2. pop
    3. shift
    4. unshift
    5. splice
*/

// // 1. push - add one or more elements to the end of array.
// // 2. pop - remove the last element from array.
// // 3. shift - remove the first element from that array.
// // 4. unshift - add one or more elements to the beginning of an array.
// // 5. splice - method changes the contents of an array by removing or replacing
// //    existing elements and/or adding new elements in place.
// //    To access part of an array without modifying it, see slice().
// const hobbies = ['Sports', 'Cooking']; 
// hobbies.push('Reading');  
// hobbies.unshift('Coding');
// console.log(hobbies);

// const x = hobbies.pop();
// hobbies.shift();
// console.log(hobbies);

// hobbies.splice(1, 0, 'Good Food', 'Good Food2');
// console.log(hobbies);

// hobbies.splice(2); // include current index
// console.log(hobbies);










/*
    Example
    1. concat
    2. push
    3. indexOf
*/

// 1. concat - this method is used to merge two or more arrays.
// 2. push - add one or more elements to the end of an array.
// 3. indexOf - The indexOf() method returns the first index at
//    which a given element can be found in the array, or -1 if it is not present.
// const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedResults = testResults.concat([3.99, 2]);
// testResults.push(5.91);
// console.log(storedResults, testResults);
// console.log(testResults.indexOf(1.5)); // result will be 2








/*
    Example
    1. indexOf
    2. find
    3. findIndex
*/

// 1. we create 'personData' array of objects.
// 2. indexOf - we can't use 'indexOf' for objects, instead we need to use 'find' method.
// 3. findIndex - method returns the index of the first element in the array
//    that satisfies the provided testing function.
// 4. find - we can find method in order to find some value in array,
//    for example we can find some object in our array.
// const personData = [
//     { name: 'Max' },
//     { name: 'Manuel' }
// ];

// console.log(personData.indexOf({name: 'Max'})); // we can't use indexOf for objects

// const manuel = personData.find((person, idx, persons) => {
//     return person.name === 'Manuel';
// });

// console.log(manuel); // {name: 'Manuel'}

// manuel.name = 'Anna';
// console.log(manuel, personData);

// const maxIndex = personData.findIndex((person, idx, persons) => {
//     return person.name === 'Anna';
// });

// console.log(maxIndex);












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

// console.log(taxAdjustedPrices);

















/*
    Example
    1. map() method
    2. push() method
    3. sort() for numbers
    4. reverse() method
    5. filter() method
    6. reduce() method
*/

// // map - map() method creates a new array populated with the results of calling
// // a provided function on every element in the calling array.
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

// // we can calculate sum of array elements.
// const sum = prices.reduce((prevValue, curValue) => prevValue + curValue, 0);

// console.log(sum);














/*
    Example
    1. map() method
    2. reduce() method
    3. spread operator (...)
*/

// 1. split - The split() method divides a string into an ordered list of substrings, 
//    puts these substrings into an array, and returns the array. 
//
// 2. join - The join() method creates and returns a new string by concatenating
//    all of the elements in an array

// const originalArray = [
//     {price: 10.99},
//     {price: 5.99},
//     {price: 29.99}
// ];

// console.log(originalArray);

// // const transformedArray = originalArray.map(obj => obj.price);
// const transformedArray = originalArray
//                         .map(obj => obj.price)
//                         .reduce((sumVal, curVal) => sumVal + curVal, 0);
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

// const copiedPersons = persons.map(
//             (person) => 
//             (
//                 {
//                     name: person.name,
//                     age: person.age 
//                 }
//             ));
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

// console.log(firstName); // Max
// console.log(lastName); //Schwarz
// console.log(otherInformation); // ['Mr', 30]
























/*
    Example
    1. Sets
*/
// const ids = new Set(['Hi', 'from', 'set!']); 
// //ids.add(4);
// ids.add(2); // we can't do this - set values are unique

// ids.delete('Hi');

// for (const entry of ids.entries()) {
//     console.log(entry[0]);
// }



// for (const entry of ids.values()) {
//     console.log(entry);
// }

//  console.log(ids);
//  console.log(ids.has(1));







/*
    Example
    1. Maps
*/
// const person1 = {name: 'Max'};
// const person2 = {name: 'Manuel'};

// const personData = new Map([[person1, [{date: 'yesterday', price: 10}]]]);

// personData.set(person2, [{date: 'two weeks agoo', price: 100}]); // set data to the Map

// // console.log(personData);
// // console.log(personData.get(person1)); // get data from the Map


// for (const [key, value] of personData.entries()) {
//     console.log(key, value);
// }

// for (const key of personData.keys()) {
//     // console.log(key);
// }

// for (const value of personData.values()) {
//     // console.log(value);
// }

// // console.log(personData.size);




































































































