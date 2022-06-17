import { NgModule } from "@angular/core";

import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';



@NgModule({
    imports: [
        MatTabsModule,
        MatCardModule,
        MatTableModule 
    ],
    exports: [
        MatTabsModule,
        MatCardModule,
        MatTableModule
    ]
})

export class MaterialsModule {

}