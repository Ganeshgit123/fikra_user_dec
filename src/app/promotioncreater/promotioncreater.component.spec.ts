import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotioncreaterComponent } from './promotioncreater.component';

describe('PromotioncreaterComponent', () => {
  let component: PromotioncreaterComponent;
  let fixture: ComponentFixture<PromotioncreaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotioncreaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotioncreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
