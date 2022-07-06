
// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************



// ******************** materials/materials.module.ts *******************
import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatInputModule
  ],
  exports: [
    MatTableModule,
    MatInputModule
  ]
})

export class MaterialsModule { }






// ************************ photos.component.ts ************************
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Photo } from '../state/photos.interface';
import { selectPhotos } from '../state/photos.selector';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})

export class PhotosComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}
  photosSub!: Subscription;
  photo$!: Observable<Photo[]>;


  displayedColumns: string[] = ['albumId', 'id', 'title', 'image'];
  dataSource!: MatTableDataSource<Photo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.photosSub = this.store.select(selectPhotos).subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  ngOnDestroy(): void {
    this.photosSub.unsubscribe();
  }


}




// ************************ photos.component.html ************************
<mat-form-field appearance="standard">
    <mat-label>Filter</mat-label>
    <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input>
  </mat-form-field>
  
  <div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource" matSort>
  
    <!-- albumId Column -->
    <ng-container matColumnDef="albumId">
      <th mat-header-cell *matHeaderCellDef> AlbumId. </th>
      <td mat-cell *matCellDef="let element"> {{element.albumId}} </td>
    </ng-container>
  
    <!-- Id Column -->
    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef> Id </th>
      <td mat-cell *matCellDef="let element"> {{element.id}} </td>
    </ng-container>
  
    <!-- Title Column -->
    <ng-container matColumnDef="title">
      <th mat-header-cell *matHeaderCellDef> Title </th>
      <td mat-cell *matCellDef="let element"> {{element.title}} </td>
    </ng-container>
  
    <!-- Image Column -->
    <ng-container matColumnDef="image">
      <th mat-header-cell *matHeaderCellDef> Image </th>
      <td mat-cell *matCellDef="let element">
        <img class="table-image" [src]="element.url" alt="">
      </td>
    </ng-container>
  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  
    <!-- Row shown when there is no matching data. -->
    <tr class="mat-row" *matNoDataRow>
      <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
    </tr>
  </table>
  
    <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"
            showFirstLastButtons 
            aria-label="Select page of periodic elements">
    </mat-paginator>
</div>



// ************************ photos.component.css ************************
table {
    width: 100%;
  }
  
  .mat-form-field {
    font-size: 14px;
    width: 100%;
  }
  
  td, th {
    width: 25%;
  }

  .table-image {
    width: 60px;
    margin:10px;
  }


