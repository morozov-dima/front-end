// *********************** material.module.ts *********************
import { NgModule } from "@angular/core";
import { MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    imports: [
         MatFormFieldModule
    ],
    exports: [
         MatFormFieldModule
    ]
})

export class MaterialsModule {}