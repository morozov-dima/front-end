// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************

/**
 * 
 * With async pipe we don't need unsubscribe in ts code.
 * We will unsubscribe when component (html) will be destroyed.
 *
 */


// *************************** app.component.html **************************

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './shared/todo.interface';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private todoService: TodoService) {}

  loadTodos$!: Observable<Todo[]>;

  ngOnInit(): void {
    this.loadTodos$ = this.todoService.fetchTodos();
  }

}





// *************************** app.component.html **************************
<ul>
    <li *ngFor="let todo of (loadTodos$ |async)">
        {{todo.title}}
    </li>
</ul>