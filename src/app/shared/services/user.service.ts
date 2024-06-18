import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modal/user.modal';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://127.0.0.1:3000/user';
  constructor(private http: HttpClient) {}

  /**
   *
   * Get users data
   * @return {*}  {Observable<User[]>}
   * @memberof UserService
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  /**
   *
   * Get user by id
   * @param {string} userId
   * @return {*}  {Observable<User[]>}
   * @memberof UserService
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  /**
   *
   * Save user
   * @param {User} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  /**
   *
   * Update user by id
   * @param {User} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  /**
   *
   * Delet user by id
   * @param {string} userId
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
}
