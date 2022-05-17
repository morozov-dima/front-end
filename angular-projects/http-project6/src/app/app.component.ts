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
      completed: true,
      id: 1,
      userId: 11
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
    this.todos.splice(index, 1);
  }


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
