import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodosService} from "../../services/todos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerDialogComponent} from "../components/spinner-dialog/spinner-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {

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
      name: this.formBuilder.control(''),
      isComplete: this.formBuilder.control(false)
    })


    const loader = this.dialog.open(SpinnerDialogComponent);
    this.todosService.get(this.route.snapshot.params.id).subscribe(res => {
      loader.close();
      this.formGroup.patchValue(res);
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const loader = this.dialog.open(SpinnerDialogComponent);
      this.todosService.update({
        id: this.route.snapshot.params.id,
        name: this.formGroup.value.name,
        isComplete: this.formGroup.value.isComplete
      }).subscribe(res => {
        loader.close();
        this.snackBar.open("Todo " + this.formGroup.value.name + " mis a jour avec succès");
        this.router.navigate(['../../'], {relativeTo: this.route});
      })
    }
  }
}
