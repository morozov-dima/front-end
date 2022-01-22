import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  circleBgs: string = '';
  newCircleBgColors: string[] = [
    'red',
    'blue',
    'green'
  ];
  counter: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateBgColor() {
    this.circleBgs = this.newCircleBgColors[this.counter];
    this.counter++;
    if (this.counter > this.newCircleBgColors.length) {
      this.counter = 0;
    }
  }

}
