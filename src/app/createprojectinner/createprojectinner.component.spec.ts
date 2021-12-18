import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojectinnerComponent } from './createprojectinner.component';

describe('CreateprojectinnerComponent', () => {
  let component: CreateprojectinnerComponent;
  let fixture: ComponentFixture<CreateprojectinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateprojectinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprojectinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
