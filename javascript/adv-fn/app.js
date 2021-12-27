// Pure function example 
function add(num1, num2) {
    return num1 + num2;
}
//console.log(add(1, 5)); // 6
//console.log(add(12, 15)); // 27





// Impure function example
function addRandom(num1) {
    return num1 + Math.random();
}
//console.log(addRandom(5).toFixed(2));





// Impure function
let previousResult = 0;
function addMoreNumbers(num1, num2) {
    const sum = num1 + num2;   
    previousResult = sum;
    return sum;     
}



// Impure function
const hobbies = ['Sports', 'Cooking'];
function printHobbies(h) {
    h.push('NEW HOBBY');
    console.log(h);
}

printHobbies(hobbies);


function createTaxCalculator(tax) {
    function calculateTax(amount) {
        return amount * tax;
    }
    
    return calculateTax;
}



const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));



let userName = 'Max';

function greetUser() {
    let name = 'Anna';
    console.log('Hi ' + name);
}

let name = 'Maximilian';

userName = 'Manuel';

greetUser();






// ****** Recursion ******
// function powerOf(x, n) {
//     let result = 1;
//     for (let index = 0; index < n; index++) {
//         result *=x;
//     }

//     return result;
// }

function powerOf(x, n) {
    if (n === 1) {
        return x;
    }
    return x * powerOf(x, n-1);
}
console.log(powerOf(2, 3)); // 2 * 2 * 2







































