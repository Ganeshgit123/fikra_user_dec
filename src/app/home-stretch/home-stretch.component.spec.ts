import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStretchComponent } from './home-stretch.component';

describe('HomeStretchComponent', () => {
  let component: HomeStretchComponent;
  let fixture: ComponentFixture<HomeStretchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeStretchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStretchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
