

// ************************ app.component.html **************************
<section class="content">

<div class="content-internal">
  <div class="form-content">

    <div class="user-input-block">
      <form class="profileForm" [formGroup]="profileForm" (ngSubmit)="onSubmit()">
        <label for="todo-name">Todo</label>
        <input 
          id="todo-name"
          formControlName="todoName"
          name="todoName"
          type="text">
          <button type="submit" [disabled]="!profileForm.valid">Save</button>
      </form>
    </div>

    <div class="dbButtons">
        <div class="database-connections">
          <button (click)="saveToDb()" class="btn">Save to Database</button>
          <button (click)="fetchData()" class="btn">Fetch from Database</button>
        </div>
    </div>

    <div class="result">
      <ul class="result-items">

        <li *ngFor="let todo of todos; index as i;" class="result-item">
          <div class="result-itemRow">
            <span>{{i}} - {{todo.title}}</span>
            <button (click)="deleteTodo(i)" class="result-delete">Delete</button>
          </div>
        </li>

      </ul>
    </div>

  </div>
</div>
</section>













// ************************* app.component.ts ***************************

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from './todo.interface';
import { UserData } from './userData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private userData: UserData) {}

  profileForm = new FormGroup({
    todoName: new FormControl('', Validators.required)
  });

  todos: Todo[] = [];
  todosSub!: Subscription;
  
  onSubmit() {
    this.todos.push({
      title: this.profileForm.value.todoName,
      completed: true
    });
  }

  saveToDb() {
    this.todosSub = this.userData.saveToDos(this.todos).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  fetchData() {
    this.todosSub = this.userData.fetchToDos().subscribe(
      response => {
        this.todos = response;
      }
    );
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1); // delete current item from array of objects
  }


  ngOnInit(): void {}


  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }

}
