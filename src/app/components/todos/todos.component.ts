import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

import { Todo } from '../../models/Todo';
import { getClosureSafeProperty } from '@angular/core/src/util/property';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  tic:TodoItemComponent;
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });

    this.tic = new TodoItemComponent(this.todoService);
  }

  
  deleteTodo(todo:Todo) {
    // Remove From UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server
    this.todoService.deleteTodo(todo).subscribe();
    //change this to "for loop" starting at the index of the "todo" that was deleted
    this.todos.forEach(todo => {
      todo.id = this.todos.indexOf(todo) + 1;
      todo.icon = this.tic.getColor(todo.id);
    });
    console.log("todos remaining: " + this.todos.length);
  }

  addTodo(todo:Todo) {
    
    this.todoService.addTodo(todo).subscribe(todo => {
      todo.id = this.todos.length + 1;
      this.todos.push(todo);
    });
    //write the amount of todo's on the page BEFORE the new todo is added
    console.log(this.todos.length);
  }

}
