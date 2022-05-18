import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoDataService } from './todo-data.service';
import { Todos } from './todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  todosForm = new FormGroup({
    todoName: new FormControl('', Validators.required)
  });


  constructor(
    private todoDataService: TodoDataService
  ) {}  
  
  todos: Todos[] = [];
  todosSub!: Subscription;

  onSubmit() {
    console.log('onSubmit');
    
    console.log(this.todosForm.value.todoName);
    this.todos.push({
      title: this.todosForm.value.todoName,
      completed: true,
      id: 1,
      userId: 11
    });
    
  }  


  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  saveToDos() {
    this.todosSub = this.todoDataService.saveTodos(this.todos).subscribe();
  }

  fetchToDos() {
    this.todosSub = this.todoDataService.fetchToDos().subscribe(
      response => {
        this.todos =response;
      }
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
     this.todosSub.unsubscribe(); 
  }

}
