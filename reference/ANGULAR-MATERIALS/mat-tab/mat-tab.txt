

// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



// ************************ app.component.html *******************
<mat-tab-group (selectedTabChange)="test($event)">
  <mat-tab label="Tab 1">Content 1</mat-tab>
  <mat-tab label="Tab 2">Content 2</mat-tab>
</mat-tab-group>




// ************************* app.component.ts **************************
import {Component} from '@angular/core';

@Component({
  selector: 'tabs-overview-example',
  templateUrl: 'tabs-overview-example.html',
  styleUrls: ['tabs-overview-example.css'],
})
export class TabsOverviewExample {

  test(a){
    console.log(a.index)
  }
}



