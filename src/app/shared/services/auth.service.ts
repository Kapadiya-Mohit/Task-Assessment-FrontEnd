import { Injectable } from '@angular/core';
import { Auth } from '../modal/auth.modal';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.authUrl;
  $isLogginUser = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  /**
   *
   * User signup
   * @param {Auth} auth
   * @return {*}  {Observable<Auth>}
   * @memberof AuthService
   */
  signUp(auth: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/signup`, auth);
  }

  /**
   *
   * user login
   * @param {Auth} auth
   * @return {*}  {Observable<Auth>}
   * @memberof AuthService
   */
  login(auth: Auth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, auth);
  }

  /**
   *
   * Save token into local storage
   * @param {string} token
   * @memberof AuthService
   */
  setJWTToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   *
   * Get JWT Token
   * @return {*}  {(string | null)}
   * @memberof AuthService
   */
  getJWTToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   *
   * Remove JET token
   * @memberof AuthService
   */
  removeJWTToken(): void {
    localStorage.removeItem('authToken');
  }

  /**
   *
   * Logout user
   * @memberof AuthService
   */
  logout(): void {
    this.removeJWTToken();
  }

  /**
   *
   * Check user is login or not
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  isLoggedIn(): string | null {
    return this.getJWTToken();
  }
}
