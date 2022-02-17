import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  // default string lenght is 10
  transform(str: string, lenght: number = 10): any {
    if (str.length > lenght) {
      // get sub string from main string
      const strResult: string = str.substring(0, lenght);

      // pipe will return new value with '...' in the end
      return `${strResult} ...`;
    }
    
    // in case 'str' that we get in pipe less then 'lenght'
    // we will return 'str' without changes.
    return str;
  }

}
