

// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************


/ ************************* app.component.html ***************************
<button (click)="onAnimate()">animate</button>
<button (click)="boxState = 'special'">Set Special State</button>
<hr>
<div class="wrap">
  <div class="box" [@box]="boxState">
    <h4>
      {{ boxState | uppercase }}
    </h4>
  </div>
</div>







// *********************** app.animations.ts *****************************
import { animate, group, keyframes, query, state, style, transition, trigger } from "@angular/animations";

export const boxAnimation =  trigger('box', [

    // state name 'start'
    state('start', style({
      background: 'blue'      // style for 'start' state.
    })),


    // state name 'end'
    state('end', style({
      background: 'red',      // style for 'end' state.
      transform: 'scale(1.2)' // style for 'end' state (element will be bigger)
    })),

    // state name 'special'
    state('special', style({
      background: 'orange',     // style for 'special' state.
      transform: 'scale(0.5)',  // style for 'special' state (element will be smaller)
      borderRadius: '50%'       // style for 'special' state.
    })),


    transition('start => end', animate(450)), // 450 mili sec (fadeIn)


    transition('end => start', animate('800ms ease-in-out')), // 800 mili sec (fadeOut)

    // from 'special' state to 'any' state and from 'any' state to 'special' state
    // we can create animation steps.
    transition('special <=> *', [ 

      // we want execute our methods in parallel.
      group([
        query('h4', animate(1500, style({
          fontSize: '.5rem',
          color: 'red'
        }))),
        style({ background: 'green' }), // first we set this style
        animate('1s', style({ // when our animation end we can set new style: background: 'pink'
          background: 'pink'
        })),
        animate(750) // our background: 'pink' will be animated during 750 mili sec.
      ])
    ]),



    // 'void => *' we can write this ':enter'
    // this is like - 'show'
    // 'void' - this is when element dosen't exist (any element that dosen't exist)
    // from 'void' to 'any' state
    transition(':enter', [
      animate('4s', keyframes([
        style({ background: 'red', offset: 0 }),       // step 1 
        style({ background: 'black', offset: 0.2 }),   // step 2, 20% from 4 sec
        style({ background: 'orange', offset: 0.3 }),  // step 3,  30% from 4 sec
        style({ background: 'blue', offset: 1 })       // step 4
      ]))
      //style({ opacity: 0 }),
      //animate('850ms ease-out')
    ]),




    // from 'any' state to 'void' 
    // this is like 'hide'.
    // '* => void' we can write this ':leave'
    transition(':leave', [
      style({opacity: 1}), // from 'opacity: 1' - initial state.

          // 'group' - run animations in parallel !!!!!!!!!
          //
          //
          // ####### sequence #######
          // we can also add method 'sequence' this is default. in this case animations will run after each other.
          //
          // this two animations will be in parallel.
          // animation 1 will be parallel to animation 2.
          group([
            // animation 1
            animate(750, style({
              opacity: 0, // to 'opacity: 0'
              transform: 'scale(1.2)' // our element will be bigger.
            })),
            // animation 2
            animate(300, style({
              color: '#000000',
              fontWeight: 'bold'
            }))
          ])

    ])

  ])











// ************************* app.component.ts *****************************
import { AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { boxAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ boxAnimation]
})

export class AppComponent implements OnInit {

  // set initial state
  boxState: string = 'start'

  visible: boolean = true;

  ngOnInit(): void {
    
  }

  onAnimate() {
    this.boxState = this.boxState === 'end' ? 'start' : 'end';
  }


  // our event have special tyle : "AnimationEvent"
  animationStarted(event: AnimationEvent) {
    console.log(event);
  }


  animationDone(event: AnimationEvent) {
    console.log(event);
  }   

}









// ************************ app.component.css ************************
.wrap {
  padding-top: 3rem;
  width:  500px;
  margin: 0 auto;  
  display: flex;
  justify-content: center;
  flex-direction: row;
}



.box {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    color:#ffffff;
}









// ************************* app.module.ts ****************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





























// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************

// ************************* app.component.html ****************************
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h1>Animations</h1>
      <button (click)="onAnimate()" class="btn btn-primary">Animate!</button>
      <button (click)="onShrink()" class="btn btn-primary">Shrink!</button>
      <hr>

      <div 
        class="box"
        [@divState]="state"
        (@divState.start)="animationStarted($event)"
        (@divState.done)="animationEnded($event)"
        >some div</div>
      </div>


      <div 
        class="box"
        [@wildState]="wildState">some div</div>
      </div>


  </div>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <input type="text" #input>
      <button class="btn btn-primary" (click)="onAdd(input.value)">Add Item!</button>
      <hr>
      <ul class="list-group">
        <li
          class="list-group-item"
          (click)="onDelete(item)"
          [@list1]
          *ngFor="let item of list">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <ul class="list-group">
        <li
          class="list-group-item"
          [@list2]
          (click)="onDelete(item)"
          *ngFor="let item of list">
          {{ item }}
        </li>
      </ul>
    </div>
</div>








// *********************** app.component.ts **************************
import { animate, keyframes, state, style, transition, trigger, group, AnimationEvent } from '@angular/animations';
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
    ]),








    trigger('list1', [
      // first state (initial state)
      state('in', style({
        opacity: '1', // element will be visible
        transform: 'translateX(0)'
      })),
   
      // from void (element hasn't been added yet) to 'in' state.
      // we use 'void' for element that wasn't added to the DOM at the beginning.
      transition('void => *', [
        // initial style for our animation
        style({
          opacity: 0,
          transform: 'translateX(-100px)' // outside of screen
        }), 
        animate(300)
      ]),

      transition('* => void', [
        // how our animate function will have final state  
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0 // fadeOut
        }))
      ])
    ]),








    trigger('list2', [
      // first state (initial state)
      state('in', style({
        opacity: '1', // element will be visible
        transform: 'translateX(0)'
      })),
   
      // from void (element hasn't been added yet) to 'in' state.
      // we use 'void' for element that wasn't added to the DOM at the beginning.
      transition('void => *', [
        animate(1000, keyframes([
          // step 1 of our animation (initial)
          // we can also control animation time with offset
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          // step 2 of our animation
          // we can also control animation time with offset
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // 30% of our animation time
          }),
          // step 3 of our animation
          // we can also control animation time with offset          
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          // step 4 of our animation (final)
          // we can also control animation time with offset          
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),

      transition('* => void', [
        // in group method here as an argument we pass an array
        // of animations we want to perform asynchronously (at the some time)
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0 // fadeOut
          }))
        ])
        // how our animate function will have final state  

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
   // remove item from array in some position
   this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: AnimationEvent) {
    console.log(event);
  }

  animationEnded(event: AnimationEvent) {
    console.log(event);
  }

}








// *********************** app.module.ts ***************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


































// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************

// ************************* app.component.html ****************************


<!-- trigger clickedState  -->
<div
   (click)="onClickSimple()"
   (mousedown)="clickInfo = 'mousedown'"
   [@clickedState]="clickInfo"
   class="simple"></div>

<p 
   (click)="paragraphClick = 'clicked'" 
   [@clickedState]="paragraphClick">
   Some text
</p>   





<!-- trigger numberEnteredState  -->
<hr>
<input type="number" (input)="numberEntered=$any($event.target).value">
<br>
<br>
<span [@numberEnteredState]="numberEntered == 1 ? 'selected' : 'unselected'">1</span>
<span [@numberEnteredState]="numberEntered == 2 ? 'selected' : 'unselected'">2</span>
<span [@numberEnteredState]="numberEntered == 3 ? 'selected' : 'unselected'">3</span>
<span [@numberEnteredState]="numberEntered == 4 ? 'selected' : 'unselected'">4</span>
<span [@numberEnteredState]="numberEntered == 5 ? 'selected' : 'unselected'">5</span>
<span [@numberEnteredState]="numberEntered == 6 ? 'selected' : 'unselected'">6</span>
<span [@numberEnteredState]="numberEntered == 7 ? 'selected' : 'unselected'">7</span>
<span [@numberEnteredState]="numberEntered == 8 ? 'selected' : 'unselected'">8</span>
<span [@numberEnteredState]="numberEntered == 9 ? 'selected' : 'unselected'">9</span>
<span [@numberEnteredState]="numberEntered == 0 ? 'selected' : 'unselected'">0</span>







// ************************* app.component.ts ****************************
import { Component } from '@angular/core';
import { clickedStateTrigger, numberEnteredStateTrigger } from './shared/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // here we have to import our triggers
  animations: [
    clickedStateTrigger,
    numberEnteredStateTrigger
  ]
})


export class AppComponent {
  clickInfo: string = 'default';
  paragraphClick: string = 'default';
  numberEntered!: number;

  onClickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
       this.clickInfo = 'default' 
    }, 3000);
  }

}





// ************************* app.module.ts ***********************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// ********************* shared/animations.ts **********************
import { animate, state, style, transition, trigger } from "@angular/animations";

export const clickedStateTrigger = 
 // **************** clickedState trigger begin *****************
 trigger('clickedState', [
    // 'default' state
    state('default', style({
      backgroundColor: 'orange',
      width: '100px',
      height: '100px'
    })),
    // 'clicked' state
    state('clicked', style({
      backgroundColor: 'blue',
      width: '100px',
      height: '50px'
    })),
    // 'mousedown' state
    state('mousedown', style({
      backgroundColor: 'red',
      border: '1px solid black',
      width: '100px',
      height: '100px'
    })),
    
    transition('default => clicked', animate('1s 500ms ease-in')), // 1s - duration of animation. 500ms - delay.
    //transition('clicked => default', animate('300ms ease-out')),
    transition('clicked => default', animate(300)),
    transition('mousedown <=> clicked', animate(3000)) // transition in two directions
  ]);
      // **************** clickedState trigger end *****************





  // **************** numberEnteredState trigger begin *****************
  export const numberEnteredStateTrigger = trigger('numberEnteredState', [
     // 'unselected' state
     state('unselected', style({
       border: '1px solid black',
       padding: '5px',
       backgroundColor: 'white'
     })),
     // 'selected' state
     state('selected', style({
      border: '2px solid blue',
      padding: '4px',
      backgroundColor: 'lightblue'
    })),
    // in our transition we have now array of steps.
    transition('unselected => selected', [
      // step 1 of our transition.
      style({
        border: '2px solid black',
        padding: '4px'
      }),
      // step 2 of our transition.
      // here we pass 'style' as second argument.
      // here we use 100ms delay
      animate('600ms 100ms ease-out', style({
        backgroundColor: 'red',
        transform: 'scale(1.05)'
      })),
      animate(300)
    ])
  ])
  // **************** numberEnteredState trigger end *****************

































// *************************************************************************
// *********************** Example - FadeIn/FadeOut  ***********************
// *************************************************************************


// FadeIn/FadeOut of some element

// ************************* shared/animations.ts ***********************
import { animate, state, style, transition, trigger } from "@angular/animations";

// in this case we have state less trigger. we just define some transitions.
export const showStateTrigger = trigger('showState', [
    // 'void' - will be for elements that not attached to the DOM.
    // as second argument we define [] , because we want to use multiple animations inside 'transition'
    // fadeIn
    // * - mean any state, I don't care.
    // instead 'void => *' we can write ':enter' . Because this two transitions are so common.
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(300)
    ]),
    // fadeOut
    // from any state '*' to nothing 'void'
    // instead '* => void' we can write ':leave'. Because this two transitions are so common.
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);




// **************************  app.component.html *************************
<button (click)="isShown = !isShown">
  Toggle Element
</button>


<p 
  @showState
  *ngIf="isShown">
  You can see now!
</p>



<button (click)="onAddElement()">Add Element</button>
<div
  @showState
  *ngFor="let testResult of testResults; index as i" 
  class="test-result">
 {{i}} - {{testResult}}
</div>







// ************************** app.component.ts *****************************
import { Component } from '@angular/core';
import { showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    showStateTrigger
  ]
})
export class AppComponent {
  isShown: boolean = false;
  testResults: number[] = [];

  onAddElement(){
    this.testResults.push(Math.random());
  }
}





// ************************* app.module.ts *****************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
















// *************************************************************************
// *************************** Example - group  ****************************
// *************************************************************************


// ************************** shared/animations.ts **************************

import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const listStateTrigger = trigger('listState', [
    transition(':enter', [
        style({
            opacity: 0,
            backgroundColor: 'white'
        }),
        // if we want run our animations in paraller we need use group() method.
        // inside [] of group we group all animations we want to play together.
        // inside group we have two animations starting together.
        group([
            animate(1000, style({
                opacity: 0.7
            })),
            animate(2000, style({
                backgroundColor: 'red'
            }))
        ]),
        animate(300, style({
            backgroundColor: 'lightblue'
        }))
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);








// *************************** app.component.html ***************************
<button (click)="onAddElement()">Add Element</button>
<div
  @listState
  *ngFor="let testResult of testResults; index as i" 
  class="test-result">
 {{i}} - {{testResult}}
</div>





// *************************** app.component.ts ***************************

import { Component } from '@angular/core';
import { listStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    listStateTrigger
  ]
})
export class AppComponent {
  testResults: number[] = [];

  onAddElement(){
    this.testResults.push(Math.random());
  }
}





















// *************************************************************************
// ************************* Example - keyframes  **************************
// *************************************************************************


// ************************** shared/animations.ts **************************

import { animate, group, keyframes, state, style, transition, trigger } from "@angular/animations";

export const listStateTrigger = trigger('listState', [
    transition(':enter', [
        style({
            opacity: 0,
            backgroundColor: 'white'
        }),
        // if we want run our animations in paraller we need use group() method.
        // inside [] of group we group all animations we want to play together.
        // inside group we have two animations starting together.
        // parallel animations
        group([
            animate(1000, style({
                opacity: 0.7
            })),
            // we will use keyframes function here for more animations control.
            // keyframes function takes array of 'keyframes'
            // offset - has to be a number between 0 and 1.
            // offset control the speed of animation (timing)
            animate('5000ms ease-out', keyframes([
                style({
                    backgroundColor: 'white',
                    offset: 0
                }),
                style({
                    backgroundColor: 'red',
                    offset: 0.8
                }),
                style({
                    backgroundColor: 'green',
                    offset: 1
                })
            ]))
        ]),
        animate(300, style({
            backgroundColor: 'lightblue'
        }))
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);






// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animateStateTrigger, listStateTrigger, showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    listStateTrigger
  ]
})
export class AppComponent {
  animate: boolean = false;
}







// ************************** app.component.html **************************
<button (click)="animate = true">Animate me</button>
<p 
  [@animateState]="animate ? 'animate' : 'noAnimation'"
  [ngStyle]="{
  'width.px': width
 }">Shrink me</p>

















// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

// slide from right -> center
// slide from center -> left

// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('panelState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate(200)
      ]),
      transition(':leave', [
        animate(200, style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent {
  showPanel = false;
  showParagraph = true;
}






// ************************** app.component.html **************************
<div class="container">
  <div class="row col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
    <h1 class="text-center">Angular 4.2 Animations</h1>
    <hr>
    <button (click)="showPanel = !showPanel" class="btn btn-primary">Show Panel</button>
    <hr>
    <div class="panel panel-default" *ngIf="showPanel" @panelState>
      <div class="panel-heading">Let's see what query does</div>
      <div class="panel-body">
        <p>query() gives you a lot of flexibility!</p>
        <p *ngIf="showParagraph">You'll see!</p>
      </div>
      <div class="panel-footer">
        <button (click)="showParagraph = !showParagraph" class="btn btn-primary">Toggle second paragraph</button>
      </div>
    </div>
  </div>
</div>










// ************************ app.module.ts *************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
