// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngOnChanges()
Called before ngOnInit() (if the component has bound inputs) and
whenever one or more data-bound input properties change.













// *************************************************************************
// *************************** Example - ngOnInit **************************
// *************************************************************************
/*
 * Called once, after the first ngOnChanges().
 * ngOnInit is still called even when ngOnChanges() is not 
 * (which is the case when there are no template-bound inputs).
 */

import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}











// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngDoCheck()
Called immediately after ngOnChanges() on every change detection run,
and immediately after ngOnInit() on the first run.















// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngAfterContentInit()
Called once after the first ngDoCheck()
















// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngAfterContentChecked()
Called after ngAfterContentInit() and every
subsequent ngDoCheck().













// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngAfterViewInit()
Called once after the first ngAfterContentChecked().
Respond after Angular checks the component's views and child views, or the view that contains the directive.














// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************

ngAfterViewChecked()
Called after the ngAfterViewInit() and every
subsequent ngAfterContentChecked().














// *************************************************************************
// *********************** Example - ngOnDestroy ***************************
// *************************************************************************
/*
 * Called immediately before Angular destroys the directive or component.
 */


import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from './shared/todo.interface';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodoService) {}
  todos: Todo[] = [];
  loadTodosSub!: Subscription;

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.loadTodosSub = this.todoService.fetchTodos().subscribe({
      next: (response) => {
        this.todos = response;
      }
    });
  }

  ngOnDestroy(): void {
    this.loadTodosSub.unsubscribe();
  }
}

