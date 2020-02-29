import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
//import { TodosComponent  } from '../todos/todos.component';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  

  constructor(private todoService:TodoService) { 
    
  }


  ngOnInit() {
    //const todos = TodosComponent;
    //this.todo.id = todos.todos.
    
    this.todo.icon = this.getColor(this.todo.id);
  }

  getColor(value:number) {
      if (value > 10) {
        value = (value %  10);
      }

    const colorDict = {
        1:"assets/images/barRed.gif",
        2:"assets/images/barOrange.gif",
        3:"assets/images/barYellow.gif",       
        4:"assets/images/barChartreuse.gif",
        5:"assets/images/barGreen.gif",
        6:"assets/images/barCyan.gif",
        7:"assets/images/barBlue.gif",
        8:"assets/images/barDarkBlue.gif",
        9:"assets/images/barPurple.gif",
        10:"assets/images/barMagenta.gif",
    };
    
    return colorDict[value];
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}
