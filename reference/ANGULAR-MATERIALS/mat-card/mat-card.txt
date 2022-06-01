







// ********************** page-not-found.component.html *************************
<section class="page-not-found-content">
    <div class="page-not-found-content-internal">
        <mat-card class="card">
            <mat-card-subtitle>Dog Breed</mat-card-subtitle>
            <mat-card-title>Shiba Inu</mat-card-title>
            <mat-card-content>
              <p>This card has divider and indeterminate progress as footer</p>
              <p>{{ longText }}</p>
            </mat-card-content>
            <mat-divider inset></mat-divider>
            <mat-card-actions>
              <button [routerLink]="['/']" [queryParams]="{debug: true}" mat-button>Home Page</button>
              <button routerLink="/auth" mat-button>Login</button>
            </mat-card-actions>
            <mat-card-footer>
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </mat-card-footer>
        </mat-card>
    </div>
</section>







// ********************** page-not-found.component.css ***************************
.page-not-found-content {
    width: 100%;
}

.page-not-found-content-internal {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.card {
    width: 100%;
}


/* mobile first - this css will be for tablet/desktop */ 
@media screen and (min-width: 576px) {
    .card {
        width: 500px;
    }
    .page-not-found-content-internal {
        padding:10px;
    }
  }






// ********************** page-not-found.component.ts *************************
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }
  
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ngOnInit(): void {
  }

}








// *********************** material-module.module.ts *********************
import { NgModule } from "@angular/core";

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    imports: [
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatProgressBarModule,
         MatCardModule,
         MatDividerModule,
         MatExpansionModule,
         MatSelectModule
    ],
    exports: [
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatIconModule,
         MatProgressBarModule,
         MatCardModule,
         MatDividerModule,
         MatExpansionModule,
         MatSelectModule
    ]
})

export class MaterialsModule {}