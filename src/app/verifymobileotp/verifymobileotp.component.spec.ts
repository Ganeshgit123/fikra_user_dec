import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymobileotpComponent } from './verifymobileotp.component';

describe('VerifymobileotpComponent', () => {
  let component: VerifymobileotpComponent;
  let fixture: ComponentFixture<VerifymobileotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifymobileotpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifymobileotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
