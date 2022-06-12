// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************

<p [ngClass]="{onlineClass: serverStatus === 'online'}">Some text</p>


<div class="interesting">
  <app-quote 
    [ngStyle]="{
      'width': isFavorite ? '600px' : '400px'
    }"
    (click)="isFavorite = !isFavorite"
    [ngClass]="{'favorite super-favorite' : isFavorite}">
  </app-quote>
</div>







// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************

<some-element [ngClass]="'first second'">...</some-element>

<some-element [ngClass]="['first', 'second']">...</some-element>

<some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>

<some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>

<some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>










// ************************************************************************
// ****************************** Example 1 *******************************
// ************************************************************************

// *********** html file ***********
<section class="assignment3">
  <button (click)="toggleText()">Display Details</button>
  <p *ngIf="showText">Secret Password = tuna</p>

  <ul *ngIf="clicks">
    <li 
      *ngFor="let click of clicks; index as i"
        [ngClass]="{
          'bold' : i > 5
        }"
        >
      {{click}} - {{i}}
    </li>
  </ul>

</section>






// ************ js file *************
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
    const currentDate = Date.now(); // timestamp
    this.clicks.push(currentDate);
  }


}
















// ************************************************************************
// ****************************** Example 2 *******************************
// ************************************************************************


// ************************ app.component.html ************************
<section class="assignment">
    <input type="text" [(ngModel)]="newItem" >
  
    <button 
      (click)="onAddItem()"
      class="btn"
      [ngClass]="{
        'btn-primary': newItem !== '',
        'btn-default': newItem === ''
         }"
      >Add Item</button>
  
      <hr>
  
      <u class="list-group">
        <li class="list-group-item" *ngFor="let item of items">{{ item }}</li>
      </u>
  
  </section>




// ************************ app.component.ts *************************
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: string[] = ['a', 'b', 'c'];
  newItem: string = '';

  onAddItem() {
      this.items.push(this.newItem);
  }  

}
















// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************


  // ************************ projects.component.html ************************
  // add class to clicked element


    <app-project
      *ngFor="let prj of projects; let i = index"
      [ngClass]="{marked: markedPrjIndex === i}"
      (click)="markedPrjIndex = i">
    </app-project>





// *************************** projects.component.ts ************************
import { Component } from '@angular/core';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  markedPrjIndex = 0;
}


















// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************


// ************************ project.component.html ************************
// 1.  we can pass function to our [ngStyle] and all code write in 'ts' file


<span
  [ngClass]="getPrjStatusClass()" class="label">
  {{ project.status }}
</span>






// ********************** project.component.ts ***********************
import { Component} from '@angular/core';
import { Project } from '../projects/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project!: Project;


  getPrjStatusClass() {
    return {
      'label-success': this.project.status === 'active',
      'label-default': this.project.status === 'inactive',
      'label-danger': this.project.status === 'critical'
    };
  }
}




// *********************** project.component.css **********************
.label-success {
    color: green;
}

.label-default {
    color: #000000;
}

.label-danger {
    color: red;
}





// *********************** project.model.ts **********************
export interface Project {
  name: string;
  description: string;
  status: string;
}


















// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************


// ************************ projects.component.html ***********************
    <app-project
      *ngFor="let prj of projects; let i = index"
      [project]="prj"
      [ngClass]="{
        marked: markedPrjIndex === i,
        inactive: prj.status === 'inactive'
      }"
      (click)="markedPrjIndex = i">
    </app-project>




 // *********************** projects.component.css ************************   
  .marked {
      border: 2px solid blue;
  }

  .inactive {
      border: 1px solid #ccc;
  }




// ************************* projects.component.ts ************************

import { Component, OnInit } from '@angular/core';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects().subscribe(
        prj => {
          this.projects = prj;
        }
      );
  }
}
