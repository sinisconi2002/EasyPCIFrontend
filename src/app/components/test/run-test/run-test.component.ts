import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TestResultService } from '../test.service';
import { TestCreatorDto } from 'src/app/models/testCreatorDto';
import { CommonModule } from '@angular/common';
import { Test } from 'src/app/models/Test';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingComponent } from '../loading-component/loading-component.component';
import { TestResult } from 'src/app/models/testResult';

@Component({
  standalone: true,
  selector: 'app-run-test',
  imports: [FormsModule, RouterModule, CommonModule, LoadingComponent],
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.css']
})
export class RunTestComponent implements OnInit {
  testResult: Partial<Test> = {};
  token: any;
  decodedToken: any;
  testCreatorDto: TestCreatorDto = {
    Connections: [],
    Testcases: []
  };

  isLoading = false;
  selectedTestCaseId: string | undefined;
  selectedSSHConnectionId: string | undefined;

  constructor(private testService: TestResultService, private router: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.fetchTestCaseCreatorDto();
    console.log(this.testCreatorDto);
  }

  fetchTestCaseCreatorDto(): void {
    this.testService.getTestCreatorDto().subscribe((data: TestCreatorDto) => {
      this.testCreatorDto = data;
      console.log(data);
    });
  }

  onSubmit(): void{
    this.token = localStorage.getItem("jwt");
    this.decodedToken = this.jwtHelper.decodeToken();
    this.testResult.tester = this.decodedToken['unique_name'];
    this.testResult.remote = this.selectedSSHConnectionId;
    this.testResult.testCase = this.selectedTestCaseId;
    console.log(this.testResult.tester);
    this.isLoading = true;
    console.log(this.testResult, this.selectedTestCaseId, this.selectedSSHConnectionId);
    this.testService.runTest(this.testResult as Test).subscribe({
        next: (response: TestResult) => {
          this.isLoading = false;
          this.router.navigate([`/navigation/tests/${response.id}`]);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    
  }
}
