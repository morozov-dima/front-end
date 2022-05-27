import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) {}

  courseGoals = [
    {
      title: 'Master Angular Styling',
      isActiveGoal: true
    },
    {
      title: 'Understand Angular Animations',
      isActiveGoal: false
    },
    {
      title: 'Master Angular Animations',
      isActiveGoal: false
    }
  ];

  isFavorite = false;
  onShowboring(element: HTMLElement) {
    // argument 1: element.
    // argument 2: witch style we want to set.
    // argument 3: value of our style. 
    this.renderer.setStyle(element, 'display', 'block');
  }

  ngOnInit(): void {
    
  }
}
