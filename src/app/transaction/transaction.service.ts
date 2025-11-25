import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Transaction, CreateTransactionRequest, ApiResponse } from './transaction';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiURL = `${environment.apiUrl}/transactions`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Transaction[]> {
    return this.httpClient.get<ApiResponse<Transaction[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getByAccountId(accountId: number): Observable<Transaction[]> {
    return this.httpClient.get<ApiResponse<Transaction[]>>(`${this.apiURL}/account/${accountId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Transaction> {
    return this.httpClient.get<ApiResponse<Transaction>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  create(request: CreateTransactionRequest): Observable<Transaction> {
    return this.httpClient.post<ApiResponse<Transaction>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getByDateRange(accountId: number, startDate: string, endDate: string): Observable<Transaction[]> {
    return this.httpClient.get<ApiResponse<Transaction[]>>(
      `${this.apiURL}/account/${accountId}/range?startDate=${startDate}&endDate=${endDate}`
    ).pipe(
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
