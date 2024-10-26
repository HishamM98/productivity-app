import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { User } from '../../shared/models/user';

interface authResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);
  userSignal = computed(() => this.user());
  private isLoggedIn = signal(!!localStorage.getItem('authToken'));
  isLoggedInSignal = computed(() => this.isLoggedIn());

  /**
   * a user login function
   * @param email 
   * @param password 
   * @returns Observable of type User
   */
  login(username: string, password: string): Observable<User> {
    return this.http.post<authResponse>(`${env.serverUrl}/auth/login`, { username, password }, {
      withCredentials: true
    }).pipe(
      take(1),
      map(res => {
        this.user.set(res.user);
        localStorage.setItem('authToken', res.token);
        this.isLoggedIn.set(true);
        return res.user;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * a user register function
   * @param userData 
   * @returns observable of type User
   */
  register(userData: User): Observable<{ [key: string]: string; }> {
    return this.http.post<{ [key: string]: string; }>(`${env.serverUrl}/auth/register`, userData).pipe(
      take(1),
      catchError(this.handleError)
    );
  }

  /**
   * a user register function
   * @param userData 
   * @returns observable of type User
   */
  refreshAuthToken(): Observable<{ token: string; }> {
    return this.http.get<{ token: string; }>(`${env.serverUrl}/auth/refresh`, {
      withCredentials: true
    }).pipe(
      take(1),
      tap(res => {
        console.log(res);
        localStorage.setItem('authToken', res.token);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * a user logout function
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn.set(false);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,      
      errorMessage = `Code: ${err.status}, ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
