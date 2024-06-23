import { Component, OnInit } from '@angular/core';
import { TestCaseCreatorDto } from 'src/app/models/testCaseCreatorDto';
import { TestcaseService } from '../testcase.service';
import { TestCase } from 'src/app/models/testCase';
import { AngularEditorComponent, AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-create-testcase',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AngularEditorModule],
  templateUrl: './create-testcase.component.html',
  styleUrl: './create-testcase.component.css'
})
export class CreateTestcaseComponent implements OnInit{
  testCaseCreatorDto: TestCaseCreatorDto = {
  cards: []
  }
  testCase: Partial<TestCase> = {};
  selectedCardId: string | undefined;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ]
  };


  constructor(private router: Router,private testCaseService: TestcaseService) {}

  ngOnInit(): void {
    this.fetchTestCaseCreatorDto();
    console.log(this.testCaseCreatorDto);
  }

  onSubmit(): void {
    if (this.selectedCardId) {
      this.testCase.card = this.selectedCardId;
      this.testCaseService.createTestCase(this.testCase as TestCase).subscribe(response => {
         console.log('Test Case created:', response);
      });
      this.router.navigate(['/navigation/test-cases']);
    }
  }

  fetchTestCaseCreatorDto(): void {
    this.testCaseService.getTestCaseCreatorDto().subscribe((data: TestCaseCreatorDto) => {
      this.testCaseCreatorDto.cards = data.cards;
    });
  }
}
