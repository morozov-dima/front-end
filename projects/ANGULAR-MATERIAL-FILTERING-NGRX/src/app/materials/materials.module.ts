import { NgModule } from "@angular/core";

import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule
    ]
})

export class MeterialsModule {
    
}