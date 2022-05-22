import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [



    trigger('divState', [
      // first state (initial state)
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),

      // second state
      state('highlighted',style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),

      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ]),





    trigger('wildState', [
      // first state (initial state)
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),

      // second state
      state('highlighted',style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),

      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),

      transition('highlighted => normal', animate(300)),
      transition('normal => highlighted', animate(800)),
      // '*' mean any state.
      transition('shrunken <=> *', [
            style({
              'background-color': 'orange'
            }),
            animate(1000, style({
              borderRadius: '50px'
            })),
            animate(500)
      ]) 
    ])




  ]
})


export class AppComponent {
  state: string = 'normal';
  wildState: string = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onAnimate(){
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }


  onDelete(item: string) {
    console.log(item);  
 
  }

}
