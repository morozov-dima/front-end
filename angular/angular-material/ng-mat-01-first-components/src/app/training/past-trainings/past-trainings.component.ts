import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];

  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.dataSource.data =
      this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Table filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
