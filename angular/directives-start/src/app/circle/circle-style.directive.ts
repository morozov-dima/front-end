import { 
  Directive, 
  HostBinding, 
  Input, 
  OnInit 
} from '@angular/core';

@Directive({
  selector: '[appCircleStyle]'
})
export class CircleStyleDirective implements OnInit{
  @Input() appCircleStyle: string = '';
  @HostBinding('style.backgroundColor') styleName: string = '';
  constructor() { }


  ngOnInit(): void {
      this.styleName = this.appCircleStyle;
      
  }
}
