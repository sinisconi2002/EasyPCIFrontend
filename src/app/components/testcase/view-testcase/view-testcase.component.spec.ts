import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestcaseComponent } from './view-testcase.component';

describe('ViewTestcaseComponent', () => {
  let component: ViewTestcaseComponent;
  let fixture: ComponentFixture<ViewTestcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTestcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
