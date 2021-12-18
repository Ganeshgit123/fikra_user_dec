import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpguidecategoryComponent } from './helpguidecategory.component';

describe('HelpguidecategoryComponent', () => {
  let component: HelpguidecategoryComponent;
  let fixture: ComponentFixture<HelpguidecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpguidecategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpguidecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
