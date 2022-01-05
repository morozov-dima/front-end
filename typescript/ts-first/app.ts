/*
  run "tsc app.ts" in order to convers "ts" code to "js" code
*/


class User {
  constructor(
    public name: string,
    private age: number
  ){


  }
}


class Admin extends User {
  constructor(
    name: string,
    age: number,
    private permissions: string[]
  ){
    // we will forward name and age to the super consrtuctor (to the User class)
    super(name, age);
  }
}



const user = new User('Max', 30 );
console.log(user.name);











const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const buttonElement = document.querySelector('button');

function add(a: number, b: number) {
  return a + b;
}

type PrintMode = 'console' | 'alert';
//enum OutputMode { CONSOLE, ALERT };

function printResult(result: string | number, printMode: PrintMode) {
  if (printMode === 'console') {
    console.log(result);
  } else if (printMode === 'alert') {
    alert(result);
  }

}

// const result = add(5, 3);
// const isDone = false;

// console.log(result);

// printResult("Skoda");
// printResult(12);

type CalculationResults = { res: number, print: () => void }[];

const results: CalculationResults = [];
const names = ['Max'];

buttonElement.addEventListener('click', () => {
  const num1 = +num1Input.value; // we add + to convert string info a number
  const num2 = +num2Input.value; // we add + to convert string info a number
  const result = add(num1, num2);
  const resultContainer = {
    res: result,
    print() {
      console.log(this.res);
    }
  };
  results.push(resultContainer);
  // results[0].print();
  printResult(result, 'console');
  printResult(result, 'alert');
});

