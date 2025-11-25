import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = `${environment.apiUrl}/users`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiURL}/list`).pipe(
      catchError(this.handleError)
    );
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(this.apiURL, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${this.apiURL}/${id}`, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
