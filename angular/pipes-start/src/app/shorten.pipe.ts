import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})

/*
    We need implement our pipe with PipeTransform
    interface - this is good practice.
    This pipe shortens my words.
*/
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number) {
        // here we check if value lenght is greater than 10
        // characters.
        if (value.length > limit) {
            return value.substr(0, limit) + ' ...';
        }

        // otherwise we will return the unchanged value.
        return value;
    }
}