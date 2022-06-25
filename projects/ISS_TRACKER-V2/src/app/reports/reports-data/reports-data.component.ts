import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ISSLocationSavedByUser } from 'src/app/maps/state/maps.interface';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.reducer';
import { getISSLocationSavedByUser } from 'src/app/maps/state/maps.selectors';


@Component({
  selector: 'app-reports-data',
  templateUrl: './reports-data.component.html',
  styleUrls: ['./reports-data.component.scss']
})

export class ReportsDataComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'lat', 'lng', 'timestamp'];
  dataSource!: MatTableDataSource<ISSLocationSavedByUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<State>) { }
  dataIsAvailable: boolean = false;


  ngOnInit(): void {
    this.getLocations();
  }


  getLocations() {
    this.store.select(getISSLocationSavedByUser).subscribe({
      next: response => {
        response.length > 0 ? this.dataIsAvailable = true : this.dataIsAvailable = false;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  } 


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
