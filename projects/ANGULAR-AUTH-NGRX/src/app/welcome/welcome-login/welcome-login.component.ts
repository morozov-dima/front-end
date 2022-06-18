import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Posts } from "src/app/shared/general-data/general-data.interface";
import { GeneralDataService } from "src/app/shared/general-data/general-data.service";



@Component({
    selector: 'app-welcome-login',
    templateUrl: './welcome-login.component.html',
    styleUrls: ['./welcome-login.component.css']
})

export class WelcomeLoginComponent implements OnInit, OnDestroy {
    posts: Posts[] = [];
    postsSubscription!: Subscription;
    showError: boolean = false;

    constructor(
        private generalDataService: GeneralDataService
    ) {}


        ngOnInit(): void {
            this.postsSubscription = this.generalDataService.getPosts().subscribe({
                next: response => {
                    this.posts = response;
                },
                error: () => {
                   this.showError = true;
                },
                complete: () => {
                    console.log('get posts completed !!!');
                }
            });
        }

        ngOnDestroy(): void {
            this.postsSubscription.unsubscribe();
        }
}