import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellingstoryComponent } from './tellingstory.component';

describe('TellingstoryComponent', () => {
  let component: TellingstoryComponent;
  let fixture: ComponentFixture<TellingstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellingstoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TellingstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
