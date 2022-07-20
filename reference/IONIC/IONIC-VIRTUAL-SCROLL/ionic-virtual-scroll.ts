// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************



// **************************** materials.module.ts ************************
import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    ScrollingModule
  ],
  exports: [
    ScrollingModule
  ]    
})
export class MaterialsModule {}









// **************************** projects.module.ts ************************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProjectsPageRoutingModule } from './projects-routing.module';
import { ProjectsPage } from './projects.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { projectsReducer } from './state/projects.reducer';
import { DevicesEffects } from "./state/projects.effect";
import { MaterialsModule } from '../materials/materials.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsPageRoutingModule,
    MaterialsModule, // import this module
    StoreModule.forFeature('projects', projectsReducer),
    EffectsModule.forFeature([DevicesEffects]) 
  ],
  declarations: [
    ProjectsPage
  ]
})
export class ProjectsPageModule {}







// **************************** projects.page.html ************************

<ion-content>

<cdk-virtual-scroll-viewport itemSize="56" minBufferPx="900" maxBufferPx="1350">

<ion-list>
  <ion-item *cdkVirtualFor="let device of devices$; let isOdd = odd; let i = index;" [class.odd]="isOdd" class="scroll-item">
      <ion-avatar slot="start">
        <img src="https://loremflickr.com/100/100" />
      </ion-avatar>
      <ion-label>
        {{device.email}}
      </ion-label>
  </ion-item>
</ion-list>
</cdk-virtual-scroll-viewport>

</ion-content>










// **************************** projects.page.css ************************
cdk-virtual-scroll-viewport {
    height: 100%;
    width: 100%;
  }
  
  .odd {
      --ion-item-background: #e2e2e2;
  }
  






  // **************************** projects.page.ts ************************
  import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Device } from './state/projects.interface';
import { selectAllDevices } from './state/projects.selector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ProjectsPage implements OnInit {
  constructor(private store: Store) {}

  devices$: Observable<Device[]>;

  ngOnInit(): void {
    this.devices$ = this.store.select(selectAllDevices);
  }

}
