import { NgModule } from "@angular/core";
import { MatButtonModule} from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
    imports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatDividerModule
    ]
})

export class MaterialsModule {}