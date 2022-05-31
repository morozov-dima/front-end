// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



// ************************ materials.module.ts *************************
import { NgModule } from "@angular/core";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        MatTabsModule,
        MatTableModule
    ],
    exports: [
        MatTabsModule,
        MatTableModule
    ]
})

export class MaterialsModule {}





