import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TestCase } from 'src/app/models/testCase';
import { TestCaseCreatorDto } from 'src/app/models/testCaseCreatorDto';
import { TestCaseDto } from 'src/app/models/testCaseDto';

@Injectable({
  providedIn: 'root'
})
export class TestcaseService {
  private api : string | null;
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.api = localStorage.getItem('apiUrl');
    this.apiUrl = `https://${this.api as string}/testcases`;
  }

  getTestCases(): Observable<TestCase[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(map(response => response.result));
  }

  getTestCasesBySearch(searchText: string): Observable<TestCase[]> {
    const params = { search: searchText.toLowerCase() };
    return this.http.get<TestCase[]>(`${this.apiUrl}/search_result`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getTestCase(id: string): Observable<TestCaseDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getTestCaseCreatorDto(): Observable<TestCaseCreatorDto> {
    return this.http.get<TestCaseCreatorDto>(`${this.apiUrl}/testCaseCreator`);
  }

  createTestCase(newTestcase: TestCase): Observable<TestCase>{
    return this.http.post<TestCase>(`${this.apiUrl}/add_testcase`, newTestcase)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
