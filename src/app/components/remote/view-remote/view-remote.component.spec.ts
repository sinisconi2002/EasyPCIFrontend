import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemoteComponent } from './view-remote.component';

describe('ViewRemoteComponent', () => {
  let component: ViewRemoteComponent;
  let fixture: ComponentFixture<ViewRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRemoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
