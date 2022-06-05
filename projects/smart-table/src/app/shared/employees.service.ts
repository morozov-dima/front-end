import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { EmployeesInterface } from './employees-interface';
import { ErrorLogs } from './error-logs.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  constructor( private http: HttpClient, private errorLogs: ErrorLogs ) {}
  private employeesUrl = 'https://jsonplaceholder.typicode.com/photos';

  /** GET: get employees from the server */
  fetchEmployees(): Observable<EmployeesInterface[]> {
    return this.http.get<EmployeesInterface[]>(this.employeesUrl).pipe(
      catchError(this.errorLogs.handleError)
    );
  }


  /** DELETE: delete the employee from the server */
  deleteEmployee(id: number): Observable<unknown> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.errorLogs.handleError)
    );
  }


  /** POST: send new employee to the server */
  postEmployee(data: EmployeesInterface): Observable<EmployeesInterface> {
    return this.http.post<EmployeesInterface>(this.employeesUrl, data).pipe(
      catchError(this.errorLogs.handleError)
    );
  }


  /** PUT: send updated employee to the server */
  putEmployee(data: EmployeesInterface, id: number): Observable<EmployeesInterface> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.put<EmployeesInterface>(url, data).pipe(
      catchError(this.errorLogs.handleError)
    );
  }


}
