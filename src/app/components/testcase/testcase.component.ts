import { Component, OnInit } from '@angular/core';
import { TestCase } from 'src/app/models/testCase';
import { TestcaseService } from './testcase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.css']
})
export class TestcaseComponent implements OnInit {
  testcases: TestCase[] = [];
  currentPage = 1;
  pageSize = 3;
  searchText: string = '';

  constructor(private testcaseService: TestcaseService, private router: Router) {}

  ngOnInit(): void {
    this.loadTestCases();
  }

  loadTestCases(): void {
    if (this.searchText.trim() !== '') {
      this.testcaseService.getTestCasesBySearch(this.searchText)
        .subscribe(data => {
          this.testcases = data;
          this.currentPage = 1; 
        });
    } else {
      this.testcaseService.getTestCases()
        .subscribe(data => {
          this.testcases = data;
          this.currentPage = 1; 
        });
    }
  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.loadTestCases();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.testcases.length / this.pageSize)) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.testcases.length / this.pageSize);
  }

  get paginatedTestcases(): TestCase[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.testcases.slice(startIndex, startIndex + this.pageSize);
  }
}