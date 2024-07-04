import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Todo} from "../../models/todo";
import {TodosService} from "../../services/todos.service";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerDialogComponent} from "../components/spinner-dialog/spinner-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  @ViewChild('confirmDelete')
  confirmDelete: TemplateRef<any>;

  todos: Todo[];

  displayedColumns: string[] = ['id', 'name', 'isComplete', 'actions'];
  loading: boolean;

  constructor(
    private todosService: TodosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.todos = [];
    this.loading = true;
    this.todosService.getAll().subscribe(res => {
      this.todos = res;
      this.loading = false;
    });
  }

  onClickDelete(todo: Todo) {
    this.dialog.open(this.confirmDelete).afterClosed().subscribe(res => {
      if (res) {
        const loader = this.dialog.open(SpinnerDialogComponent);
        this.todosService.delete(todo.id).subscribe(res => {
          loader.close();
          this.snackBar.open("Todo " + todo.name + " supprimé avec succès")
          this.refresh();
        })
      }
    });
  }

  updateTodoComplete(checked: boolean, todo: Todo) {
    this.todosService.update({
      id: todo.id, name: todo.name, isComplete: checked
    }).subscribe(res => {
      // this.snackBar.open("Todo " + todo.name + " mis a jour avec succès");
    })
  }
}
