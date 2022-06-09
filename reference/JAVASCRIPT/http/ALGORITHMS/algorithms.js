
/* Example 1:
 * In this example we have array of numbers, and we need find group of numbers
 * that sum of this numbers equal to target.
 *
 *  [1, 2, 3, 4, 5, 6 ,7]
 *  target = 7
 *  result will be :  [[1,6],[2,5], [3,4]]
 *  
 */

const myarr = [1, 2, 3, 4, 5, 6 ,7];
const target = 7;
const res = [];

function culc(array, target) {
  for (let i = 0; i < array.length; i++) {
    const element_i = array[i];
        for (let j = i + 1; j < array.length; j++) {
          const element_j = array[j];
            if (element_i + element_j === target) {
              res.push([element_i, element_j]);
            }
        }
  }
  return res;
}


let result = culc(myarr, target);
console.log(result);













