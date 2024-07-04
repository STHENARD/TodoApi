import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Todo} from "../models/todo";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  // private rootPath: string = 'https://localhost:5001';
  private rootPath: string = '';
  private delay: number = 500;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.rootPath + "/api/Todo").pipe(delay(this.delay));
  }

  get(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.rootPath + "/api/Todo/" + id).pipe(delay(this.delay));
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.rootPath + "/api/Todo/" + todo.id, todo).pipe(delay(this.delay));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.rootPath + "/api/Todo/" + id).pipe(delay(this.delay));
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.rootPath + "/api/Todo", todo).pipe(delay(this.delay));
  }

}
