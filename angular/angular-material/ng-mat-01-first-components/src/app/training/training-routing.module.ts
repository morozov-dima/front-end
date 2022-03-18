import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
  // route protection added here for 'training' path.
  // this route will be loaded Lazy in app-routing.module.ts
  // 
  // here we need use empty path.
  { path: '', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
