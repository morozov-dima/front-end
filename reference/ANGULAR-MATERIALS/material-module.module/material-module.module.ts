// *********************** material-module.module.ts *********************
import { NgModule } from "@angular/core";

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    imports: [
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatProgressBarModule,
         MatCardModule,
         MatDividerModule,
         MatExpansionModule,
         MatSelectModule
    ],
    exports: [
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatProgressBarModule,
         MatCardModule,
         MatDividerModule,
         MatExpansionModule,
         MatSelectModule
    ]
})

export class MaterialsModule {}