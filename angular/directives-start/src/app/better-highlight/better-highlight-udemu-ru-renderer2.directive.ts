import { 
  Directive, 
  ElementRef, 
  HostListener, 
  Input, 
  Renderer2
 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlightUdemuRuRenderer2]'
})


/* In this example we use Renderer2 */
export class BetterHighlightUdemuRuRenderer2Directive {
  @Input('appBetterHighlightUdemuRuRenderer2') color: string = 'blue';
  @Input() dStyle: {border?: string, fontWeight?: string, borderRadius?: string} = {};
  constructor(private el: ElementRef, private r: Renderer2) {}


  @HostListener('click', ['$event.target']) onClick(event: Element) {
    console.log(event);
  }


  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.el.nativeElement, 'color', this.color);
    this.r.setStyle(this.el.nativeElement, 'fontWQeight', this.dStyle.fontWeight);
    this.r.setStyle(this.el.nativeElement, 'border', this.dStyle.border);
    this.r.setStyle(this.el.nativeElement, 'borderRadius', this.dStyle.borderRadius);
  }

  @HostListener('mouseleave') onLeave() {
    this.r.setStyle(this.el.nativeElement, 'color', null);
    this.r.setStyle(this.el.nativeElement, 'fontWeight', null);
    this.r.setStyle(this.el.nativeElement, 'border', null);
  }


}
