import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})

// this pipe reverse string
export class ReversePipe implements PipeTransform {
  transform(value: string): any {
    // We can reverse string by chaining the three methods together
    const resultStr = value.split("").reverse().join("");
    return resultStr;
  }

}
