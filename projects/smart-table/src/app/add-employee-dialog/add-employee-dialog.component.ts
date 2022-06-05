import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../shared/employees.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class ActionsDialogComponent implements OnInit {

  employeeFrom!: FormGroup;
  actionBtn: string = 'Save';
  pageTitle: string = 'Add Employee';

  constructor(
    private formBuilder: FormBuilder,
    private employeesApi: EmployeesService,
    private matDialogRef: MatDialogRef<ActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {
    this.employeeFrom = this.formBuilder.group({
      titleValue: ['', Validators.required],
      albumIdValue: ['', Validators.required],
      urlValue: ['', Validators.required],
      thumbnailUrlValue: ['', Validators.required]
    });

    console.log(this.editData);
 
    if(this.editData) {
      this.actionBtn = 'Update';
      this.pageTitle = 'Edit  Employee';
      this.employeeFrom.controls['titleValue'].setValue(this.editData.title);
      this.employeeFrom.controls['albumIdValue'].setValue(this.editData.albumId);
      this.employeeFrom.controls['urlValue'].setValue(this.editData.url);
      this.employeeFrom.controls['thumbnailUrlValue'].setValue(this.editData.thumbnailUrl);
    }
    
  }

  addEmployee() {
     if(!this.editData) {
      if(this.employeeFrom.valid) {
        this.employeesApi.postEmployee(this.employeeFrom.value).subscribe({
          next: () => {
            alert("Employee added successfull");
            this.employeeFrom.reset();
            this.matDialogRef.close('save');
          },
          error: () => {
            alert("Error while adding the product");
          }
        });
      }
     }else {
       this.updateEmployee();
     } 
  }


  updateEmployee(){
    this.employeesApi.putEmployee(this.employeeFrom.value, this.editData.id).subscribe({
      next: () => {
        alert("Product updated Succefully");
        this.employeeFrom.reset();
        this.matDialogRef.close('update');
      },
      error: () => {
        alert('Error while updating the record !!!');
      }
    });
  }


}
