import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SSHConnection } from 'src/app/models/sshConnection';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  private api : string | null;
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.api = localStorage.getItem('apiUrl');
    this.apiUrl = `https://${this.api as string}/connections`;
  }


  getRemotes(): Observable<SSHConnection[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.result as SSHConnection[])
    );
  }

  getRemotesBySearch(searchText: string): Observable<SSHConnection[]> {
    const params = { search: searchText.toLowerCase() };
    return this.http.get<SSHConnection[]>(`${this.apiUrl}/search_result`, { params }).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  getRemoteById(id: string): Observable<SSHConnection> {
    return this.http.get<SSHConnection>(`${this.apiUrl}/${id}`);
  }

  createRemote(newRemote: SSHConnection): Observable<SSHConnection> {
    return this.http.post<SSHConnection>(`${this.apiUrl}/add_connection`, newRemote)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
