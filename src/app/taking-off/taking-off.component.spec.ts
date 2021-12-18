import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakingOffComponent } from './taking-off.component';

describe('TakingOffComponent', () => {
  let component: TakingOffComponent;
  let fixture: ComponentFixture<TakingOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakingOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakingOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
