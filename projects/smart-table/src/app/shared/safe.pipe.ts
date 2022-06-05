import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeUrl {
    switch (type) {
			case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
  }

}
