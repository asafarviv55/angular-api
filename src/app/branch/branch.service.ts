import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Branch, SearchBranchRequest, ApiResponse } from './branch';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiURL = `${environment.apiUrl}/branches`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Branch[]> {
    return this.httpClient.get<ApiResponse<Branch[]>>(`${this.apiURL}/list`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Branch> {
    return this.httpClient.get<ApiResponse<Branch>>(`${this.apiURL}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  searchBranches(request: SearchBranchRequest): Observable<Branch[]> {
    let params = new HttpParams();
    if (request.city) params = params.set('city', request.city);
    if (request.state) params = params.set('state', request.state);
    if (request.zipCode) params = params.set('zipCode', request.zipCode);
    if (request.service) params = params.set('service', request.service);

    return this.httpClient.get<ApiResponse<Branch[]>>(`${this.apiURL}/search`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler)
      );
  }

  getNearby(latitude: number, longitude: number, radius: number = 10): Observable<Branch[]> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('radius', radius.toString());

    return this.httpClient.get<ApiResponse<Branch[]>>(`${this.apiURL}/nearby`, { params })
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
