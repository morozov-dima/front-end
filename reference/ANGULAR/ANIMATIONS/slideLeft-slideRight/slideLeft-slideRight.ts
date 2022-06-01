// *************************************************************************
// ******************** Example - slideLeft/slideRight  ********************
// *************************************************************************



// ************************* shared/animations.ts ***********************
import { animate, state, style, transition, trigger } from "@angular/animations";


export const margedTrigger = trigger('markedState', [
    // 'default' state
    state('default', style({
        border: '1px solid black',
        backgroundColor: 'transparent',
        padding: '20px'
    })),
    // 'marked' state
    state('marked', style({
        border: '2px solid blue',
        backgroundColor: '#caeff9',
        padding: '19px'
    })),
    // we create our transition in first direction
    transition('default => marked', [
        // step 1 inside our transition
        style({
            border: '2px solid black',
            padding: '19px'
        }),
        // step 2 inside our transition
        animate('200ms ease-out', style({
            // we create out element more bigger.
            transform: 'scale(1.05)'
        })),
        // last step in our array of steps.
        animate(200)
    ]),
    // we create our transition in second direction
    transition('marked => default', [
        // step 1 inside our transition
        style({
            border: '1px solid blue',
            padding: '20px'
        }),
        // step 2 inside our transition
        animate('300ms ease-out')
    ])
]);




export const itemStateTrigger = trigger('itemState', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('500ms ease-out', style({
            opacity: 1,
            transform: 'translateX(0)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0)'
        }),
        animate('500ms ease-in', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);









// ************************ projects.component.ts *************************
import { Component, OnInit } from '@angular/core';
import { itemStateTrigger, margedTrigger } from './animations';

import { Project } from './project.model';

import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  // we need import our trigger
  animations: [
    margedTrigger,
    itemStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects().subscribe(
        prj => {
          console.log(prj);
          this.progress = 'finished';
          this.projects = prj;
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    // add item at the top
    this.projects.unshift(project);
  }
}










// ************************ projects.component.html *********************
<div class="row">
  <div class="col-xs-12">
    <h3>My Projects</h3>
  </div>
</div>

<hr>

<div class="row">
  <div class="col-xs-12">
    <button
      class="btn btn-default"
      *ngIf="!createNew"
      (click)="createNew = true">Create new Project</button>
    <button
      class="btn btn-danger"
      *ngIf="createNew"
      (click)="createNew = false">Cancel</button>
  </div>
</div>

<div class="row">
  <div class="col-xs-12" style="overflow: hidden">
    <app-new-project
      *ngIf="createNew"
      (projectCreated)="onProjectCreated($event)"
      (creationCancelled)="createNew = false"></app-new-project>
  </div>
</div>

<hr>

<div class="row">
  <div class="col-xs-12">
    
    <div
      class="loading-bar"
      *ngIf="true">
      <div
        class="loading-bar-element"
        *ngIf="progress === 'finished'"></div>
    </div>


    <!-- <div
      class="loading-bar"
      *ngIf="!projects">
      <div
        class="loading-bar-element"
        *ngIf="progress != 'finished'"></div>
    </div> -->



    <app-project
      *ngFor="let prj of projects; let i = index"
      [project]="prj"
      [@markedState]="markedPrjIndex === i ? 'marked' : 'default'"
      @itemState
      [ngClass]="{
        inactive: prj.status === 'inactive'
      }"
      (statusUpdated)="onStatusUpdated($event, i)"
      (projectDeleted)="onProjectDeleted(i)"
      (click)="markedPrjIndex = i">
    </app-project>

  </div>
</div>























// *************************************************************************
// ******************** Example - slideLeft/slideRight  ********************
// *************************************************************************

// ************************* shared/animations.ts ***********************
import { animate, state, style, transition, trigger } from "@angular/animations";

export const itemStateTrigger = trigger('itemState', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('2000ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateX(-100%)',
                offset: 0
            }),
            style({
                opacity: 1,
                transform: 'translateX(15%)',
                offset: 0.4
            }),
            style({
                opacity: 1,
                transform: 'translateX(0)',
                offset: 1
            })
        ]))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateX(0)'
        }),
        animate('500ms ease-in', keyframes([
            style({
                opacity: 1,
                transform: 'translateX(0)'
            }),
            style({
                opacity: 1,
                transform: 'translateX(-15%)'
            }),
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            })
        ]))
    ])
]);

