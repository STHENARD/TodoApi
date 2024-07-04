import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TodosService} from "../services/todos.service";
import {Todo} from "../models/todo";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

}
