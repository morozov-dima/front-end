import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports.routing.module';
import { ReportsDataComponent } from './reports-data/reports-data.component';
import { MaterialsModule } from '../materials/materials.module';


@NgModule({
  declarations: [
    ReportsDataComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialsModule
  ]
})
export class ReportsModule { }
