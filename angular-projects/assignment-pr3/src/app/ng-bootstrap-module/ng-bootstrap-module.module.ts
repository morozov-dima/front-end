import { NgModule } from '@angular/core';

import { NgbAccordionModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [],
  imports: [
    NgbAccordionModule,
    NgbTooltipModule
  ],
  exports: [
    NgbAccordionModule,
    NgbTooltipModule
  ]
})
export class NgBootstrapModuleModule { }
