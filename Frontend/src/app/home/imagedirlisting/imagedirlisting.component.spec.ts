import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagedirlistingComponent } from './imagedirlisting.component';

describe('ImagedirlistingComponent', () => {
  let component: ImagedirlistingComponent;
  let fixture: ComponentFixture<ImagedirlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagedirlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagedirlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
