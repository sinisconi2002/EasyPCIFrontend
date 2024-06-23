import { Component, OnInit } from '@angular/core';
import { TestResult } from '../../models/testResult'; 
import { TestResultService } from './test.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testResults: TestResult[] = [];
  currentPage = 1;
  pageSize = 3;
  searchText: string = '';

  constructor(private testResultService: TestResultService, private router: Router) {}

  ngOnInit(): void {
    this.loadTestResults();
  }

  loadTestResults(): void {
    if (this.searchText.trim() === '') {
      this.testResultService.getTestResults()
        .subscribe(data => {
          this.testResults = data;
        });
    } else {
      this.testResultService.getTestResultsBySearch(this.searchText)
        .subscribe(data => {
          this.testResults = data;
        });
    }
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
    this.loadTestResults();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.testResults.length / this.pageSize);
  }

  get paginatedTestResults(): TestResult[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.testResults.slice(startIndex, startIndex + this.pageSize);
  }
}
