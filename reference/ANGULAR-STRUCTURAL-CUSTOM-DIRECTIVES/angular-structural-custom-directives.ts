// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************


// ********************** hide-element.directive.ts ************************
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class HideElementDirective implements OnInit {
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      // show element
      this.viewContainer.createEmbeddedView(this.templateRef);
      console.log('show element ...');
      this.hasView = true;
    } else if (condition && this.hasView) {
      // hide element
      console.log('hide element ...');
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnInit(): void {
    console.log(this.hasView);
    if (this.hasView) {
      setTimeout(() => {
        // hide content of our directive after 5 seconds
        this.viewContainer.clear();
      }, 5000);
    }
  }

}





// **************************** app.component.ts ***************************
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  condition = false;
}







// **************************** app.component.html ***************************
<section>
  <h1>Structure Directives</h1>
  <div *appUnless="condition">
    <h2>Temprory content</h2>
    <p>This loyout disappear in 5 seconds</p>
  </div>
</section>







// **************************** app.module.ts *******************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HideElementDirective } from './hide-element.directive';

@NgModule({
  declarations: [
    AppComponent,
    // this way we connect custom directives
    HideElementDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



