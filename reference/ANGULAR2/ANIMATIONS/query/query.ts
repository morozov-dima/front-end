
// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('panelState', [
      // 'void => *'
      transition(':enter', [
        // first animate to center from the right
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate(300),
        // 1. first parameter is name of selector.
        // 2. here we select '.panel-heading' class.
        // 3. second argument is array of animation metadata.
        // 4. header now animated.
        // 5. query is simply one 'step' in your normal list of animation steps.
        query('.panel-heading', [
          // animate element from the top.
          style({
            transform: 'translateY(-100%)',
            opacity: 0
          }),
          animate(300)
        ])
      ]),
      // '* => void'
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
























// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('panelState', [
      // 'void => *'
      transition(':enter', [
        group([
            // 1. ':self' selector will select whole element (container) to which the trigger was applied.
            // 2. so also main container will animate.
            query(':self', [
              // animate element from the top.
              style({
                opacity: 0
              }),
              animate(300)
            ]),
            // 1. first parameter is name of selector.
            // 2. here we select '.panel-heading' class.
            // 3. second argument is array of animation metadata.
            // 4. header now animated.
            // 5. query is simply one 'step' in your normal list of animation steps.
            query('.panel-heading', [
              // animate element from the top.
              style({
                transform: 'translateY(-300px)',
                opacity: 0
              }),
              animate(300)
            ]),
            // here we select our 'panel-body' class with 'query' and then we animate it.
            query('.panel-body', [
              // animate element from the top.
              style({
                transform: 'translateX(-100%)',
                opacity: 0
              }),
              animate(300)
            ]),
            // here we select our 'panel-footer' class with 'query' and then we animate it.
            query('.panel-footer', [
              // animate element from the top.
              style({
                transform: 'translateY(300px)',
                opacity: 0
              }),
              animate(300)
            ])
        ])
      ]),
      // '* => void'
      transition(':leave', [
        animate(200, style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ]),
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'scale(1)'
          }),
          animate(200, style({
             transform: 'scale(1.1)' 
          })),
          animate(100)
        ],
        // 1. by default it is false.
        // 2. if it is true - is is means you might find elements, but you also might not find them.
        //    and if you don't find them, don't throw an error.
        {optional: true}),
        // this selector will be apply to all 'p' inside 'div' and also to all 'buttons'.   
        // this way we can combining query selectors.    
        query('div p, button', [
          animate(300, style({
            color: 'red'
          })), 
          animate(200)
        ])
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
