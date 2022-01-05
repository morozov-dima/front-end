function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();   /* convert number to string */
  }
  return result;
}


const combinedAges = combine(30, 26);
console.log(combinedAges);   /* output result of combine numbers */


const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);   /* output result of combine strings */







