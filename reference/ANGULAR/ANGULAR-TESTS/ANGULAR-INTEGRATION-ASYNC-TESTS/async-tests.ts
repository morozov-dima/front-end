// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************ home.component.html *********************

<div class="container">

    <h3>All Courses</h3>

    <mat-tab-group>


      <ng-container *ngIf="(beginnerCourses$ | async) as beginnerCourses">
        <mat-tab label="Beginners" *ngIf="beginnerCourses?.length > 0">

          <courses-card-list (courseEdited)="reloadCourses()"
                             [courses]="beginnerCourses">

          </courses-card-list>

        </mat-tab>
      </ng-container>



      <ng-container  *ngIf="(advancedCourses$ | async) as advancedCourses">
        <mat-tab label="Advanced" *ngIf="advancedCourses?.length > 0">

          <courses-card-list (courseEdited)="reloadCourses()"
                             [courses]="advancedCourses">


          </courses-card-list>

        </mat-tab>

      </ng-container>
    </mat-tab-group>
    
</div>









// ************************ courses-card-list.component.html *********************


<mat-card *ngFor="let course of courses" class="course-card mat-elevation-z10">

    <mat-card-header>

        <mat-card-title>{{course.titles.description}}</mat-card-title>

    </mat-card-header>

    <img mat-card-image [src]="course.iconUrl">

    <mat-card-content>
        <p>{{course.titles.longDescription}}</p>
    </mat-card-content>

    <mat-card-actions class="course-actions">

        <button mat-button class="mat-raised-button mat-primary" [routerLink]="['/courses', course.id]">
            VIEW COURSE
        </button>

        <button mat-button class="mat-raised-button mat-accent"
                (click)="editCourse(course)">
            EDIT
        </button>

    </mat-card-actions>

</mat-card>











// ************************ home.component.ts *********************
import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";
import {sortCoursesBySeqNo} from './sort-course-by-seq';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {

      this.reloadCourses();

    }


    reloadCourses() {

      const courses$ = this.coursesService.findAllCourses();

      this.beginnerCourses$ = this.filterByCategory(courses$, 'BEGINNER');

      this.advancedCourses$ = this.filterByCategory(courses$, 'ADVANCED');

    }

    filterByCategory(courses$: Observable<Course[]>, category:string) {
      return courses$.pipe(
        map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo) )
      );
    }

}









// ************************ home.component.spec.ts *********************
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses()
      .filter(course => course.category == 'BEGINNER');

    const advancedCourses = setupCourses()
        .filter(course => course.category == 'ADVANCED');



  beforeEach(waitForAsync(() => {
      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

      TestBed.configureTestingModule({
          imports: [
              CoursesModule,
              NoopAnimationsModule  // run our tests without animations
          ],
          providers: [
              {provide: CoursesService, useValue: coursesServiceSpy}
          ]
      }).compileComponents()
          .then(() => {
              fixture = TestBed.createComponent(HomeComponent);
              component = fixture.componentInstance;
              el = fixture.debugElement;
              coursesService = TestBed.inject(CoursesService);
          });
  }));








  it("should create the component", () => {
    expect(component).toBeTruthy();
  });



  // fakeAsync - more recommended
  // Good for unit-tests
  // not in all cases we can use fakeAsync - with fakeAsync we can't test actual HTTP requests.
  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    click(tabs[1]);

    fixture.detectChanges();

    flush(); // empty the 'task queue'

    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

    console.log(cardTitles);

    expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
}));







  // waitForAsync - we can test with 'waitForAsync' actual HTTP requests.
  // good for Integration tests that is doing actual HTTP calls to a backend that would not be possible with 'fakeAsync'
  it("should display advanced courses when tab clicked - async", waitForAsync(() => {
      coursesService.findAllCourses.and.returnValue(of(setupCourses()));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));

      click(tabs[1]);

      fixture.detectChanges();

      fixture.whenStable().then(() => {

          console.log("called whenStable() ");

          const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

          expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

          expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

      });
  }));









});

























