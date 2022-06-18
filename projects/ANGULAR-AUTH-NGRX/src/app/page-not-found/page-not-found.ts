import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.html',
    styleUrls: ['./page-not-found.css']
})

export class PageNotFoundComponent implements OnInit {

    imgSrc: string = '';
    imgBasePath: string = '../../assets/images/';

    ngOnInit(): void {
        this.imgSrc = `${this.imgBasePath}error-404.png`; 
    }

}