import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Card } from 'src/app/models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private api : string | null;
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.api = localStorage.getItem('apiUrl');
    console.log(`API URL: ${this.api}`);
    this.apiUrl = `https://${this.api as string}/cards`;
  }

  getCards(): Observable<Card[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.result)
    );
  }

  getCardsBySearch(searchText: string): Observable<Card[]> {
    const params = { search: searchText };
    return this.http.get<Card[]>(`${this.apiUrl}/search_result`, { params }).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }
  
  getCardById(id: string): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  createCard(newCard: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/add_card`, newCard)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
