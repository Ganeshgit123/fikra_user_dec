import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordcodeComponent } from './forgotpasswordcode.component';

describe('ForgotpasswordcodeComponent', () => {
  let component: ForgotpasswordcodeComponent;
  let fixture: ComponentFixture<ForgotpasswordcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
