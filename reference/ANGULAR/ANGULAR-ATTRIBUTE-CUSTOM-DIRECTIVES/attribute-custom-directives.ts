// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************


// ********************** highlighted.directive.ts *************************
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HighlightedBg } from './highlighted.interface';

@Directive({
  selector: '[appHighlightedBg]'
})
export class HighlightedDirective  {
  @Input() appHighlightedBg: HighlightedBg = { color: 'blue', bgColor: 'black' };

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.appHighlightedBg.color && this.appHighlightedBg.bgColor) {
      this.highlight(this.appHighlightedBg.color, this.appHighlightedBg.bgColor);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('', '');
  }
  
  private highlight(color: string ,bgColor: string) {
   this.el.nativeElement.style.backgroundColor = bgColor;
   this.el.nativeElement.style.color = color;
  }

}






// ********************** app.component.html *************************
<div>
  Lorem, ipsum dolor <a [appHighlightedBg]="newStyle" href="#">some link</a>, cumque aut quae quis excepturi
</div>








// ********************** app.component.ts *************************
import { Component, OnInit } from '@angular/core';
import { HighlightedBg } from './shared/highlighted.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  newStyle!: HighlightedBg;

  ngOnInit(): void {
    this.newStyle = {
      color: 'red',
      bgColor: 'black'
    };
  }
    
}








// ************************ app.module.ts ****************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HighlightedDirective } from './shared/highlighted.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightedDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
