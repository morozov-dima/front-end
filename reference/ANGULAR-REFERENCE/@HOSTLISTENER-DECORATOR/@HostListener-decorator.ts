// ***********************************************************************
// ********************************* Example *****************************
// ***********************************************************************

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent  {

  constructor() { }
  @HostListener('mouseenter', ['$event']) onComponentMouseEnter(event: any) {
      console.log(event);
  }
}








// ***********************************************************************
// ********************************* Example *****************************
// ***********************************************************************
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  constructor(private el:ElementRef) { }

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) testView() {
    if (window.scrollY >= this.el.nativeElement.offsetTop - window.innerHeight) {
        console.log('user see current component !!!');
      }
  }

}


