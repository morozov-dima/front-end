import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdownHostbindingDirective]'
})
export class DropdownHostbinding {
  @Input() appDropdownHostbindingDirective: string = '';
  @HostBinding('class') className: string = '';
  showElement: boolean = true;
  constructor() { }

  @HostListener('click')
  toggleOpen() {
    if (this.showElement) {
      this.className = this.appDropdownHostbindingDirective;
      this.showElement = false;
    } else {
      this.className = '';
      this.showElement = true;
    }

  }

}
