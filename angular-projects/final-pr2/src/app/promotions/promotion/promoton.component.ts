import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Promotion } from "../state/promotions.interface";

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.css']
})

export class PromotionComponent implements OnInit {
    @Input() promotions!: Promotion[] | null;


    constructor() {}    

    ngOnInit(): void {

    }


}