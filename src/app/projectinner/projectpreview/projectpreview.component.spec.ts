import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpreviewComponent } from './projectpreview.component';

describe('ProjectpreviewComponent', () => {
  let component: ProjectpreviewComponent;
  let fixture: ComponentFixture<ProjectpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
