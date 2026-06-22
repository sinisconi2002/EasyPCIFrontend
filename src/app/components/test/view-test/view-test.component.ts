import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestResultService } from '../test.service';
import { TestResultDto } from 'src/app/models/testResultDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  standalone: true,
  selector: 'app-view-test',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.css'
})
export class ViewTestComponent {
  testResult: TestResultDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private testService: TestResultService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchTestResult(id);
      }
    });
    console.log(this.testResult);
  }

  fetchTestResult(id: string): void {
    this.testService.getTestResult(id).subscribe({
      next: (result: TestResultDto) => {
        console.log(result);
        this.testResult = result;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  downloadCoreDump(blobName: string): void {
    this.testService.downloadCoreDump(blobName).subscribe(
      (blob) => {
        saveAs(blob, blobName);
      },
      (error) => {
        console.error('Error downloading the core dump', error);
      }
    );
  }
}
