import { 
    Directive, 
    ElementRef, 
    HostListener, 
    Input, 
    Renderer2
 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @Input('appDropdown') className: string = '';
    showClass: boolean = true;
    constructor(private el: ElementRef, private render: Renderer2) {}

    @HostListener('click')
    toggleOpen() {
        if (this.showClass) {
            this.render.addClass(this.el.nativeElement, 'open');
            this.showClass = false;
        } else {
            this.render.removeClass(this.el.nativeElement, 'open');
            this.showClass = true;
        }
      
    }

}




