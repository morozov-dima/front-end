/*
  run "tsc app.ts" in order to convers "ts" code to "js" code
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.print = function () {
        console.log(this.name);
    };
    return User;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(name, age, permissions) {
        var _this = 
        // we will forward name and age to the super consrtuctor (to the User class)
        _super.call(this, name, age) || this;
        _this.permissions = permissions;
        return _this;
    }
    return Admin;
}(User));
var user = new User('Max', 30);
console.log(user.name);
var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var buttonElement = document.querySelector('button');
function add(a, b) {
    return a + b;
}
function printResult(result, printMode) {
    if (printMode === 'console') {
        console.log(result);
    }
    else if (printMode === 'alert') {
        alert(result);
    }
}
//type CalculationResults = { res: number, print: () => void }[];
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
