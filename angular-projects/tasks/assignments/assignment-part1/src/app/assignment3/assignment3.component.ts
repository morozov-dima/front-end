import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component {
  showText: boolean = false;
  clicks: number[] = [];


  toggleText() {
    this.showText = !this.showText
    const currentDate = Date.now();
    this.clicks.push(currentDate);
  }


}
