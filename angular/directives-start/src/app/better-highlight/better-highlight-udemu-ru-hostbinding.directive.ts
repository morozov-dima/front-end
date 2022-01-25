import { 
  Directive, 
  HostBinding, 
  HostListener, 
  Input 
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlightUdemuRuHostbinding]'
})
export class BetterHighlightUdemuRuHostbindingDirective {
  @Input('appBetterHighlightUdemuRuHostbinding') color: string = 'blue';
  @Input() dStyle: {border?: string, fontWeight?: string, borderRadius?: string} = {};

  @HostBinding('style.color') elColor = '';

  constructor() { }

  @HostListener('click', ['$event.target']) onClick(event: Element) {
    console.log(event);
  }


  @HostListener('mouseenter') onEnter() {
    this.elColor = this.color;
  }

  @HostListener('mouseleave') onLeave() {
    this.elColor = '';
  }

}
