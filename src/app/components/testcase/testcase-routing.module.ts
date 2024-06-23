import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestcaseComponent } from './testcase.component';
import { ViewTestcaseComponent } from './view-testcase/view-testcase.component';
import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';

const routes: Routes = [{path: '', component: TestcaseComponent},
                        {path: 'create-testcase', component: CreateTestcaseComponent},  
                        {path: ':id', component: ViewTestcaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestcaseRoutingModule { }
