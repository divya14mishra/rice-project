import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationdialogComponent } from './recommendationdialog.component';

describe('RecommendationdialogComponent', () => {
  let component: RecommendationdialogComponent;
  let fixture: ComponentFixture<RecommendationdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
