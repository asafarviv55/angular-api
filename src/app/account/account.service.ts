import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account, CreateAccountRequest, ApiResponse } from './account';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiURL = `${environment.apiUrl}/accounts`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Account[]> {
    return this.httpClient.get<ApiResponse<Account[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getByUserId(userId: number): Observable<Account[]> {
    return this.httpClient.get<ApiResponse<Account[]>>(`${this.apiURL}/user/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Account> {
    return this.httpClient.get<ApiResponse<Account>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  create(request: CreateAccountRequest): Observable<Account> {
    return this.httpClient.post<ApiResponse<Account>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  updateStatus(id: number, status: string): Observable<Account> {
    return this.httpClient.put<ApiResponse<Account>>(`${this.apiURL}/${id}/status`, JSON.stringify({ status }), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
