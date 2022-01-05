/*
  run "tsc app.ts" in order to convers "ts" code to "js" code
*/
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name + '1';
        this.age = age;
    }
    return User;
}());
var user = new User('Max', 30);
console.log(user.name);
var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var buttonElement = document.querySelector('button');
function add(a, b) {
    return a + b;
}
//enum OutputMode { CONSOLE, ALERT };
function printResult(result, printMode) {
    if (printMode === 'console') {
        console.log(result);
    }
    else if (printMode === 'alert') {
        alert(result);
    }
}
var results = [];
var names = ['Max'];
buttonElement.addEventListener('click', function () {
    var num1 = +num1Input.value; // we add + to convert string info a number
    var num2 = +num2Input.value; // we add + to convert string info a number
    var result = add(num1, num2);
    var resultContainer = {
        res: result,
        print: function () {
            console.log(this.res);
        }
    };
    results.push(resultContainer);
    // results[0].print();
    printResult(result, 'console');
    printResult(result, 'alert');
});
