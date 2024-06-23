import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { RunTestComponent } from './run-test/run-test.component';

const routes: Routes = [{path: '', component: TestComponent},
                        {path: 'run-test', component: RunTestComponent},
                        {path: ':id', component: ViewTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
