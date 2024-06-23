import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestcaseRoutingModule } from './testcase-routing.module';
import { TestcaseComponent } from './testcase.component';
import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';
import { AngularEditorComponent } from '@kolkov/angular-editor';
import { ViewTestcaseComponent } from './view-testcase/view-testcase.component';


@NgModule({
  declarations: [TestcaseComponent],
  imports: [
    CommonModule,
    TestcaseRoutingModule,
    ViewTestcaseComponent,
    CreateTestcaseComponent
  ],
  exports: [TestcaseComponent, ViewTestcaseComponent, CreateTestcaseComponent]
})
export class TestcaseModule { }
