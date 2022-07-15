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








  it("should display only beginner courses", () => {
      coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));

      expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });







  it("should display only advanced courses", () => {
      coursesService.findAllCourses.and.returnValue(of(advancedCourses));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));

      expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });







  it("should display both tabs", () => {
      coursesService.findAllCourses.and.returnValue(of(setupCourses()));

      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));

      expect(tabs.length).toBe(2, "Expected to find 2 tabs");
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





















