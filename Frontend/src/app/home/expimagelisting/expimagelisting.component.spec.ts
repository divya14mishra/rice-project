import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpimagelistingComponent } from './expimagelisting.component';

describe('ExpimagelistingComponent', () => {
  let component: ExpimagelistingComponent;
  let fixture: ComponentFixture<ExpimagelistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpimagelistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpimagelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
