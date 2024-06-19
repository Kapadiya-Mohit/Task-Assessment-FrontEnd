import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../modal/task.modal';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = 'http://127.0.0.1:3000/user';
  constructor(private http: HttpClient) {}

  /**
   *
   * Get tasks data
   * @return {*}  {Observable<Task[]>}
   * @memberof TaskService
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  /**
   *
   * Get task by id
   * @param {string} taskId
   * @return {*}  {Observable<Task[]>}
   * @memberof TaskService
   */
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  /**
   *
   * Save task
   * @param {Task} task
   * @return {*}  {Observable<Task>}
   * @memberof TaskService
   */
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }

  /**
   *
   * Update task by id
   * @param {Task} task
   * @return {*}  {Observable<Task>}
   * @memberof TaskService
   */
  updateTask(task: Task, taskId: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  /**
   *
   * Delet task by id
   * @param {string} taskId
   * @return {*}  {Observable<Task>}
   * @memberof TaskService
   */
  deleteTask(taskId: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${taskId}`);
  }
}
