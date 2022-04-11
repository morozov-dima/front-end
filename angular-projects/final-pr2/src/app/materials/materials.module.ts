import { NgModule } from "@angular/core";
import { MatButtonModule} from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule
    ]
})

export class MaterialsModule {}