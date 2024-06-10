import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemoteComponent } from './create-remote.component';

describe('CreateRemoteComponent', () => {
  let component: CreateRemoteComponent;
  let fixture: ComponentFixture<CreateRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRemoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
