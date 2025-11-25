import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreditCard, CreateCardRequest, ApiResponse } from './credit-card';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiURL = `${environment.apiUrl}/credit-cards`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CreditCard[]> {
    return this.httpClient.get<ApiResponse<CreditCard[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getByUserId(userId: number): Observable<CreditCard[]> {
    return this.httpClient.get<ApiResponse<CreditCard[]>>(`${this.apiURL}/user/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<CreditCard> {
    return this.httpClient.get<ApiResponse<CreditCard>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  create(request: CreateCardRequest): Observable<CreditCard> {
    return this.httpClient.post<ApiResponse<CreditCard>>(`${this.apiURL}`, JSON.stringify(request), this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  blockCard(id: number): Observable<CreditCard> {
    return this.httpClient.put<ApiResponse<CreditCard>>(`${this.apiURL}/${id}/block`, {}, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  activateCard(id: number): Observable<CreditCard> {
    return this.httpClient.put<ApiResponse<CreditCard>>(`${this.apiURL}/${id}/activate`, {}, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  makePayment(id: number, amount: number): Observable<CreditCard> {
    return this.httpClient.post<ApiResponse<CreditCard>>(`${this.apiURL}/${id}/payment`, JSON.stringify({ amount }), this.httpOptions)
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
