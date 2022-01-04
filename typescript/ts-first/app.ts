/*
  run "tsc app.ts" in order to convers "ts" code to "js" code
*/

const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const buttonElement = document.querySelector('button');

function add(a: number, b: number) {
  return a + b;
}

function printResult(result) {
  console.log(result);
}

// const result = add(5, 3);
// const isDone = false;

// console.log(result);

// printResult("Skoda");
// printResult(12);



buttonElement.addEventListener('click', () => {
  const num1 = +num1Input.value; // we add + to convert string info a number
  const num2 = +num2Input.value; // we add + to convert string info a number
  const result = add(num1, num2);
  const resultContainer: { res: number } = {
    res: result
  };
  printResult(resultContainer.res);
});

