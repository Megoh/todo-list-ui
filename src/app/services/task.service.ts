import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/page';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {
  }

  createTask(taskData: { title: string, description: string }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  getTasks(): Observable<Page> {
    return this.http.get<Page>(this.apiUrl);
  }

  updateTask(taskId: number, taskData: { title: string, description: string }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, taskData);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
