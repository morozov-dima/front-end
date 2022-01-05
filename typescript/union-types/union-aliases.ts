type Combinable = number | string;  /* we use type alias */
type ConversionDescriptor = 'as-number' | 'as-text';  /* we use type alias */

function combine(
    input1: number | string,
    input2: number | string,
    resultConversion: ConversionDescriptor
    ) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2; /* each input will be converted to a number */
  } else {
    result = input1.toString() + input2.toString();   /* convert number to string */
  }

  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);   /* output result of combine numbers */

const combinedStringAges = combine('30', '26', 'as-number'); 
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);   /* output result of combine strings */
