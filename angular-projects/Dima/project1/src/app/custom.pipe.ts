import { Pipe,  PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})

export class ShortenPipe implements PipeTransform {
    transform(message: any, from: number, to: number) {
        const result: string = `${message.substr(1,from)} <strong> ${message.substr(from, to)}</strong> ${message.substr(to)}`;
        return result;
    }
}
