import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDataComponent } from './reports-data/reports-data.component';

const routes: Routes = [
  { path: '', component: ReportsDataComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
]
})
export class ReportsRoutingModule { }
