import { NgModule } from "@angular/core";
import { MatButtonModule} from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule
    ],
    exports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule
    ]
})

export class MaterialsModule {}