import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestResult } from '../../models/testResult';
import { Observable, map } from 'rxjs';
import { TestCreatorDto } from 'src/app/models/testCreatorDto';
import { Test } from '../../models/Test';
import { TestResultDto } from 'src/app/models/testResultDto';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {
  
  private api : string | null;
  private apiUrl : string;

  constructor(private http: HttpClient) {
    this.api = localStorage.getItem('apiUrl');
    this.apiUrl = `https://${this.api as string}/test`;
  }

  
  getTestResults(): Observable<TestResult[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(map(response => response.result));
  }

  getTestResult(id: string): Observable<TestResultDto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.result));
  }

  getTestResultsBySearch(searchText: string): Observable<TestResult[]> {
    const params = new HttpParams().set('search', searchText);
    return this.http.get<any>(`${this.apiUrl}/search_result`, { params });
  }

  getTestCreatorDto(): Observable<TestCreatorDto> {
    return this.http.get<any>(`${this.apiUrl}/testCreator`).pipe(
      map(response => {
        const result = response.result;
        return {
          Testcases: result.testcases,
          Connections: result.connections
        };
      })
    );
  }

  runTest(test: Test): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.apiUrl}/tester`, test);
  }

  downloadCoreDump(blobName: string): Observable<Blob> {
    const params = new HttpParams().set('blobName', blobName);
    return this.http.get(`${this.apiUrl}/download-core-dump`, { params, responseType: 'blob' });
  }

}
