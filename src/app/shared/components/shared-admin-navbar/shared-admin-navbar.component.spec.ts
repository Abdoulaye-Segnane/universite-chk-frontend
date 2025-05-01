import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAdminNavbarComponent } from './shared-admin-navbar.component';

describe('SharedAdminNavbarComponent', () => {
  let component: SharedAdminNavbarComponent;
  let fixture: ComponentFixture<SharedAdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAdminNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedAdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
