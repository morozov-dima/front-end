import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { bounce, bounceOutUp, bounceOutDown } from 'ng-animate';

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css'],
  animations: [
    trigger('bounce', [
      // here we use 'useAnimation' method with already created animation
      transition('void => *', useAnimation(bounce)),
      transition('* => void', useAnimation(bounceOutUp, {
        params: {
          timing: 3,
          delay: 0.3 // 300 mili sec
        }
      }))
    ])
  ]
})
export class AnimateComponent implements OnInit {
  visible: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
