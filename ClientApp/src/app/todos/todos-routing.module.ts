import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import {CreateTodoComponent} from "./create-todo/create-todo.component";
import {UpdateTodoComponent} from "./update-todo/update-todo.component";
import {ListTodoComponent} from "./list-todo/list-todo.component";

const routes: Routes = [
  {
    path: '', component: TodosComponent,
    children: [
      { path: '', component: ListTodoComponent },
      { path: 'create', component: CreateTodoComponent },
      { path: 'edit/:id', component: UpdateTodoComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
