// *************************************************************************
// ***************************** Example  **********************************
// *************************************************************************



// *************************** animations.ts **************************
import { animate, group, state, style, transition, trigger } from "@angular/animations";


// change form fubmit button.
// valid - green background
// invalid to valid - create button bigger and then green
// invalid - red background
export const buttonStateTrigger = trigger('buttonState', [
    state('valid', style({
        backgroundColor: 'lightgreen',
        borderColor: 'green',
        color: 'green'
    })),
    state('invalid', style({
        backgroundColor: 'red',
        color: 'white',
        bordercolor: 'darkred'
    })),
    transition('invalid => valid', [
        group([
            animate(100, style({
                transform: 'scale(1.1)'
            })),
            animate(200, style({
                backgroundColor: 'lightgreen'
            }))
        ]),
        animate(200, style({
            transform: 'scale(1)'
        }))
    ]),
    transition('valid => invalid', [
        group([
            animate(100, style({
                transform: 'scale(1.1)'
            })),
            animate(200, style({
                backgroundColor: 'red'
            }))
        ]),
        animate(200, style({
            transform: 'scale(1)'
        }))
    ])
]);






// ************************* new-project.component.ts *******************
import { Component } from '@angular/core';

import { buttonStateTrigger } from './animations';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  animations: [
    buttonStateTrigger
  ]
})
export class NewProjectComponent implements OnInit {

}







// ************************ new-project.component.html ******************
<form (ngSubmit)="onCreateProject()" #f="ngForm">
  <!-- rest form content ... -->  

  <button
    type="submit"
    [@buttonState]="f.valid ? 'valid' : 'invalid'"
    [disabled]="!f.valid"
    class="btn btn-success">Create Project</button>
</form>