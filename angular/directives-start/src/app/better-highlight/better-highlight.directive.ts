import { 
  Directive, 
  HostBinding, 
  HostListener, 
  Input,
  OnInit, 
 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.highlightColor;  
  
  constructor() {}

  ngOnInit(): void {
      this.backgroundColor = this.defaultColor;
  }
  

  @HostListener('mouseenter') onMouseEnter(event: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(event: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
