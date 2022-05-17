import { NgModule } from "@angular/core";
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
    imports: [
        ButtonsModule.forRoot()
    ],
    exports: [
        ButtonsModule
    ]
})

export class ngxBootstrapModule {

}