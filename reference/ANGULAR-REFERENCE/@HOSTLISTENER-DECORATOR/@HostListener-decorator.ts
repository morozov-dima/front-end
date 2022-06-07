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
