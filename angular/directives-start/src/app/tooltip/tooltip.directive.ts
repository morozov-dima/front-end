import { 
  Directive, 
  Input, 
  OnInit, 
  HostListener, 
  Renderer2,
  AfterViewInit,
  ElementRef
 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit{
  @Input() appTooltip: {
                          tooltipTextColor?: string,
                          tooltipBgColor?: string,
                          tooltipText: string
                        } = {
                          tooltipTextColor: '#000000',
                          tooltipBgColor: '#ffffff',
                          tooltipText: ''  
                        };
   e: string = this.el.nativeElement.children[0];                 

  @HostListener('mouseenter') onMouseEnter() {
    // show tooltip
    this.showTooltip();
  }    
  
  @HostListener('mouseleave') onMouseLeave() {
    // hide tooltip
    this.hideTooltip();
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }


    ngOnInit(): void {
      const myText = this.appTooltip.tooltipText;
      const element = this.renderer.createElement('span');
      const text = this.renderer.createText(myText);
      this.renderer.addClass(element, 'tooltiptext');
      this.renderer.addClass(this.el.nativeElement, 'myTooltip');

      this.renderer.setStyle(element, 'color', this.appTooltip.tooltipTextColor);
      this.renderer.setStyle(element, 'background-color', this.appTooltip.tooltipBgColor);
      
      this.renderer.appendChild(element, text);
      this.renderer.appendChild(this.el.nativeElement, element);

      // hide tooltip
      this.hideTooltip();
    }     
    
    ngAfterViewInit(): void {

    }

    hideTooltip() {
      const childElement = this.el.nativeElement.children[0];
      this.renderer.addClass(childElement, 'hide'); 
    }

    showTooltip() {
      const childElement = this.el.nativeElement.children[0];
      this.renderer.removeClass(childElement, 'hide');
    }



}
