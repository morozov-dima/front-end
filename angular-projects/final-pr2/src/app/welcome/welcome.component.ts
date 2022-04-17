import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Posts } from "../shared/general-data/general-data.interface";
import { GeneralDataService } from "../shared/general-data/general-data.service";

@Component({
    selector: 'app-welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css']
})

export class WelcomeComponent implements OnInit, OnDestroy {
    longText: string = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;
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