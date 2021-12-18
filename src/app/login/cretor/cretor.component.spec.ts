import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretorComponent } from './cretor.component';

describe('CretorComponent', () => {
  let component: CretorComponent;
  let fixture: ComponentFixture<CretorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CretorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CretorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
