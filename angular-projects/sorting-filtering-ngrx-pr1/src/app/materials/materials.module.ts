import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatCheckboxModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatCheckboxModule
    ]
})

export class MaterialModule {}