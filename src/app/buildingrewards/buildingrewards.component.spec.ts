import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingrewardsComponent } from './buildingrewards.component';

describe('BuildingrewardsComponent', () => {
  let component: BuildingrewardsComponent;
  let fixture: ComponentFixture<BuildingrewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingrewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingrewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
