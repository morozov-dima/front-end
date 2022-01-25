import { 
  Directive, 
  ElementRef, 
  HostListener, 
  Input,
  OnInit, 
  Renderer2
 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlightRenderer2]'
})
export class BetterHighlightRenderer2Directive implements OnInit {
  @Input() defaultColorRenderer2: string = 'transparent';
  @Input('appBetterHighlightRenderer2') highlightColor: string = 'blue';
  constructor( private elRef: ElementRef, private renderer: Renderer2 ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.defaultColorRenderer2); 
  }

  @HostListener('mouseenter') onMouseEnter(event: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.highlightColor); 
  }

  @HostListener('mouseleave') onMouseLeave(event: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', this.defaultColorRenderer2); 
  }

}
