
// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************



// *********************** loader.component.ts *************************
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: '<mat-spinner diameter="40"  class="loader"></mat-spinner>'
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}




// *********************** materials.module.ts ***********************
import { NgModule } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    MatProgressSpinnerModule
  ],
  exports: [
    MatProgressSpinnerModule
  ]
})

export class MaterialsModule { }
