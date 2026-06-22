import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestcaseService } from '../testcase.service';
import { TestCaseDto } from 'src/app/models/testCaseDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-view-testcase',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './view-testcase.component.html',
  styleUrl: './view-testcase.component.css'
})

export class ViewTestcaseComponent implements OnInit {
  testCase: TestCaseDto = {
    id: '',
    name: '',
    card: {id: '', cardNumber: ''},
    description: '',
    process: '',
  };

  constructor(private route: ActivatedRoute, private testCaseService: TestcaseService) {}

  ngOnInit(): void {
    const testCaseId = this.route.snapshot.paramMap.get('id');
    if (testCaseId) {
      this.testCaseService.getTestCase(testCaseId).subscribe(data => {
        this.testCase = data;
      });
      console.log(this.testCase);
    }
  }
}