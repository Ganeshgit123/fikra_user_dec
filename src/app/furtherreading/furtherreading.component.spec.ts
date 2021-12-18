import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherreadingComponent } from './furtherreading.component';

describe('FurtherreadingComponent', () => {
  let component: FurtherreadingComponent;
  let fixture: ComponentFixture<FurtherreadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurtherreadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
