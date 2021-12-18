import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedprojectsComponent } from './savedprojects.component';

describe('SavedprojectsComponent', () => {
  let component: SavedprojectsComponent;
  let fixture: ComponentFixture<SavedprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
