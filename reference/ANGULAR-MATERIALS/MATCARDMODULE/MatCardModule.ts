// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************




// ************************ materials.module.ts  ************************
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule
  ],
  exports: [
    MatCardModule
  ]
})

export class MaterialsModule { }
