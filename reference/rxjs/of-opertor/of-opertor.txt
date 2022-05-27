
// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************





// ************************* projects.service.ts ***************************

import { Observable, of } from 'rxjs';
import { Project } from './project.model';

export class ProjectsService {
  
  private projects: Project[] = [
    { 
      name: 'Learn Angular Styles',
      description: 'Practice hard to understand how you may style components and update styles dynamically',
      status: 'active'
    },
    { 
      name: 'Learn Angular Animations',
      description: 'Learn how Angular helps with animating elements on your page',
      status: 'active'
    },
    { 
      name: 'Understanding Angular Basics',
      description: 'Understand what Angular is, how it works and how and when you might use it',
      status: 'inactive'
    },
    { 
      name: 'Learn JavaScript, HTML and CSS',
      description: 'Absolutely required to dive deep into Angular and all its features',
      status: 'critical'
    }  
  ];

  loadProjects(): Observable<Project[]> {
     // of - Converts the arguments to an observable sequence.
     const newProjects: Observable<Project[]> = of(this.projects);
     return newProjects;
  }

}











// ************************* projects.component.ts ***************************
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
  progress = 'progressing';

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    // and now 'loadProjects' return us Observable and we can subscribe to it   
    this.prjService.loadProjects().subscribe(
        prj => {
          console.log(prj);
          this.progress = 'finished';
          this.projects = prj;
        }
      );
  }

}
