import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecicalrequestComponent } from './specicalrequest.component';

describe('SpecicalrequestComponent', () => {
  let component: SpecicalrequestComponent;
  let fixture: ComponentFixture<SpecicalrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecicalrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecicalrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
