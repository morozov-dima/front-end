const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];


// Gets input from input field
function getUserNumberInput() {
   const userData = parseInt(userInput.value);
   return userData;

}

// Generates and write calculation log
function createAndWriteLog(operator, resultBeforeCalc, calcNumber) {
   const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
   outputResult(currentResult, calcDescription); // from vendor file
}


function writeToLog(prerationIdentifier, prevResult, operationNumber, newResult) {
   const logEntry = {
      operation: prerationIdentifier,
      prevResult: prevResult,
      number: operationNumber,
      result: newResult
   };
   logEntries.push(logEntry);
   console.log(logEntries);
}



function calculate(operation) {
   const enteredNumber = getUserNumberInput();
   const initialResult = currentResult;
   let operator;
   if (operation === 'ADD') {
      currentResult += enteredNumber;
      operator = '+';
   } else if (operation === 'SUBTRACT') {
      currentResult -= enteredNumber;
      operator = '+';
   } else if (operation === 'MULTIPLY') {
      currentResult *= enteredNumber;
      operator = '*';
   } else {
      currentResult /= enteredNumber;
      operator = '/';
   }
   createAndWriteLog(operator, initialResult, enteredNumber);
   writeToLog(operation, initialResult, enteredNumber, currentResult);
}


addBtn.addEventListener('click', calculate.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculate.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculate.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calculate.bind(this, 'DIVIDE'));