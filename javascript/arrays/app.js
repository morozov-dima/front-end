// const numbers = [1, 2, 3];
// console.log(numbers);


// const listItems = document.querySelectorAll('li');
// console.log(listItems);
// const arrayListItems = Array.from(listItems);
// console.log(arrayListItems);




// const hobbies = ['Cooking', 'Sports'];
// const personalData = [30, 'Max', {moreDetail: [1, 2, 3]}];
// console.log(personalData);





// const analyticsData = [[1, 1.6],[-5.4, 2.1]];
// for (const data of analyticsData) {
//     for (const dataPoints of data) {
//          console.log(dataPoints);   
//     }
// }
// console.log(analyticsData.length);   





// add new data to our array
// const hobbies = ['Sports', 'Cooking'];
// hobbies.push('Reading');
// hobbies.unshift('Coding');
// const x = hobbies.pop();
// hobbies.shift();
// console.log(hobbies);
// hobbies.splice(1, 0, 'Good Food', 'Good Food2');
// console.log(hobbies);
// hobbies.splice(2);
// console.log(hobbies);






// const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedResults = testResults.concat([3.99, 2]);
// testResults.push(5.91);
// console.log(storedResults, testResults);
// console.log(testResults);
// console.log(testResults.indexOf(1.5));







// #####################################
// Finding Stuff: find() and findIndex()
// #####################################
// const personData = [
//     { name: 'Max' },
//     { name: 'Manuel' }
// ];

// console.log(personData.indexOf({name: 'Max'}));

// const manuel = personData.find((person, idx, persons) => {
//     return person.name === 'Manuel';
// });

// manuel.name = 'Anna';
// console.log(manuel, personData);

// const maxIndex = personData.findIndex((person, idx, persons) => {
//     return person.name === 'Max';
// });

// console.log(maxIndex);
































