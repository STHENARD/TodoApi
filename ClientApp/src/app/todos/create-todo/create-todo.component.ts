import {Component, OnInit} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerDialogComponent} from "../components/spinner-dialog/spinner-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private todosService: TodosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('')
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const loader = this.dialog.open(SpinnerDialogComponent);
      this.todosService.create({
        name: this.formGroup.value.name,
        isComplete: false
      }).subscribe(res => {
        loader.close();
        this.snackBar.open("Todo " + res.name + " créé avec succès");
        this.router.navigate(['../'], {relativeTo: this.route});
      })
    }
  }
}
