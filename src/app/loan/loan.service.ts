import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Loan, CreateLoanRequest, ApiResponse } from './loan';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiURL = `${environment.apiUrl}/loans`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Loan[]> {
    return this.httpClient.get<ApiResponse<Loan[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getByUserId(userId: number): Observable<Loan[]> {
    return this.httpClient.get<ApiResponse<Loan[]>>(`${this.apiURL}/user/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Loan> {
    return this.httpClient.get<ApiResponse<Loan>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  create(request: CreateLoanRequest): Observable<Loan> {
    return this.httpClient.post<ApiResponse<Loan>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  updateStatus(id: number, status: string): Observable<Loan> {
    return this.httpClient.put<ApiResponse<Loan>>(`${this.apiURL}/${id}/status`, JSON.stringify({ status }), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  makePayment(id: number, amount: number): Observable<Loan> {
    return this.httpClient.post<ApiResponse<Loan>>(`${this.apiURL}/${id}/payment`, JSON.stringify({ amount }), this.httpOptions)
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
