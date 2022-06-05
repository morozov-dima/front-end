import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeesInterface } from './shared/employees-interface';
import { EmployeesService } from './shared/employees.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionsDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeesApi: EmployeesService,
    public dialog: MatDialog,
    ) {}

  displayedColumns: string[] = ['thumbnailUrl', 'id', 'title', 'albumId', 'actions'];
  dataSource!: MatTableDataSource<EmployeesInterface>;
  employeesListSub!: Subscription;
  showError: boolean = false;

  ngOnInit(): void {
    this.getAllEmployees();
  }


  /** Get all employees */
  getAllEmployees() {
    this.employeesListSub = this.employeesApi.fetchEmployees().subscribe({
      next: (employeesResponse) => {
       this.dataSource = new MatTableDataSource(employeesResponse);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error: () => {
        this.showError = true;
      }
    });
  }


  /** apply filter logic for mat table */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /** Edit current employee */
  onEditEmployee(row: EmployeesInterface) {
    this.dialog.open(ActionsDialogComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllEmployees();
      }
    });
  }


  /** Delete current employee */
  onDeleteEmployee(id: number) {
    if (window.confirm("Are you sure you want to delete this ?")) {
      console.log(id);
      this.employeesApi.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee Deleted Successfully');
        },
        error: () => {
          alert('Error while deleting this employee');
        }
      });
    }
  }


  /** Add new employee */
  openDialog() {
    this.dialog.open(ActionsDialogComponent, {}).afterClosed().subscribe(
      val => {
        if(val === 'save') {
          this.getAllEmployees();
        }
      }
    );
  }


  ngOnDestroy(): void {
    this.employeesListSub.unsubscribe();
  }

}