import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseComponent } from './testcase.component';

describe('TestcaseComponent', () => {
  let component: TestcaseComponent;
  let fixture: ComponentFixture<TestcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestcaseComponent]
    });
    fixture = TestBed.createComponent(TestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
