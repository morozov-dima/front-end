
// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************


// ********************* auth-shell.component.html **************************
<section class="auth">
    <div class="auth-content">
        <mat-card class="card">
             <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">   
                <div class="inputUserField">
                    <mat-form-field appearance="fill">
                        <mat-label>Enter your email</mat-label>
                        <input matInput placeholder="pat@example.com" formControlName="email" required>
                    </mat-form-field>
                </div>

                <div class="inputUserField">
                    <mat-form-field appearance="fill">
                        <mat-label>Enter your password</mat-label>
                        <input matInput [type]="hide ? 'password' : 'text'" formControlName="password" required>
                        <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                        <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
                        </button>
                    </mat-form-field>
                </div>

                <div class="inputUserField">
                    <button type="submit" class="btn-login" mat-raised-button color="primary">Primary</button>
                </div>
            </form>

        </mat-card>
    </div>
</section>








// ***************************** auth-shell.component.ts *******************************
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-auth-shell',
    templateUrl: './auth-shell.component.html',
    styleUrls: ['./auth-shell.component.css']
})

export class AuthShellComponent  {
    hide = true;
    loginForm = new FormGroup({
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(5)])
    });

      onSubmit() {
          console.log(this.loginForm.value);
          
      }
}








// *************************** auth-shell.component.css *********************
.auth {
    width: 100%;
    padding:10px;
    margin:10px;
}

.auth-content {
    display: flex;
    justify-content: center;
    flex-direction: row;
}



:host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }


  .card {
      display: flex;
      text-align: center;
      flex-direction: column;
  }  

  .inputUserField {
      display: flex;
      flex-direction: row;
      justify-content: left;
      margin:5px;
  }

  .inputUserField mat-form-field {
      width: 100%;
  }

  .btn-login {
      width: 100px;
  }




  /* material css begin */
  .example-container .mat-form-field + .mat-form-field {
    margin-left: 8px;
  }

  .example-container .mat-form-field + .mat-form-field {
    margin-left: 8px;
  }
  
  .example-right-align {
    text-align: right;
  }
  
  input.example-right-align::-webkit-outer-spin-button,
  input.example-right-align::-webkit-inner-spin-button {
    display: none;
  }
  
  input.example-right-align {
    -moz-appearance: textfield;
  }
  /* material css end */






// ************************* material-module.module.ts *********************
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







// ********************** auth.module.ts **********************
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialsModule } from "../material-module/material-module.module";
import { AuthShellComponent } from "./auth-shell/auth-shell.component";
import { AuthRoutingModule } from "./auth.routing.module";

@NgModule({
    declarations: [
        AuthShellComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialsModule,
        ReactiveFormsModule
    ]
})

export class AuthModule {}











