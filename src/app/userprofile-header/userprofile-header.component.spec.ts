import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileHeaderComponent } from './userprofile-header.component';

describe('UserprofileHeaderComponent', () => {
  let component: UserprofileHeaderComponent;
  let fixture: ComponentFixture<UserprofileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofileHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
