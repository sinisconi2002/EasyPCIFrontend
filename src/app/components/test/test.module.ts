import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { ViewCardComponent } from '../card/view-card/view-card.component';
import { RunTestComponent } from './run-test/run-test.component';
import { ViewTestComponent } from './view-test/view-test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    ViewTestComponent,
    RunTestComponent
  ],
  exports: [TestComponent, ViewTestComponent, RunTestComponent]
})
export class TestModule { }
