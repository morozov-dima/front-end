// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************






// *********************** app.component.html ************************
<div [innerHTML]="row.id | safe: 'html'"></div>
<img [src]="row.thumbnailUrl | safe: 'url'">





// ************************** safe.pipe.ts ******************************
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




// ************************* app.module.ts **************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './shared/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
  bootstrap: [AppComponent]
})
export class AppModule { }







