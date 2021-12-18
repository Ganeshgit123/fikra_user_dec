import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifypaymentComponent } from './verifypayment.component';

describe('VerifypaymentComponent', () => {
  let component: VerifypaymentComponent;
  let fixture: ComponentFixture<VerifypaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifypaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
