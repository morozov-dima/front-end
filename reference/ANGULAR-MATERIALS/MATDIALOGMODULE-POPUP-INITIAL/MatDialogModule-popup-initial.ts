// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************




// ************************ materials.module.ts  ************************
import { NgModule } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ]
})

export class MaterialsModule { }





// ************************ dialig-popup.component.ts *******************
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialig-popup',
  templateUrl: './dialig-popup.component.html',
  styleUrls: ['./dialig-popup.component.scss']
})

export class DialigPopupComponent {}






// *********************** dialig-popup.component.html ******************
<h1 mat-dialog-title>Dialog with elements</h1>
<div mat-dialog-content>This dialog showcases the title, close, content and actions elements.</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</div>




// *********************** photos.component.html **********************
<mat-card>
<button mat-flat-button color="primary"  (click)="openDialog()">Add New Photo</button>
</mat-card>




// *********************** photos.component.ts **********************
import { Component } from '@angular/core';
import { Photo } from '../state/photos.interface';

import { MatDialog } from '@angular/material/dialog';
import { DialigPopupComponent } from '../dialig-popup/dialig-popup.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})

export class PhotosComponent {

  constructor(public dialog: MatDialog) {}


  openDialog() {
    this.dialog.open(DialigPopupComponent);
  }

}
