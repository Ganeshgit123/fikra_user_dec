import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowinginnerComponent } from './followinginner.component';

describe('FollowinginnerComponent', () => {
  let component: FollowinginnerComponent;
  let fixture: ComponentFixture<FollowinginnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowinginnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowinginnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
