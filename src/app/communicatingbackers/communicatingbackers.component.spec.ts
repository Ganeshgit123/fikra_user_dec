import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicatingbackersComponent } from './communicatingbackers.component';

describe('CommunicatingbackersComponent', () => {
  let component: CommunicatingbackersComponent;
  let fixture: ComponentFixture<CommunicatingbackersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicatingbackersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicatingbackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
