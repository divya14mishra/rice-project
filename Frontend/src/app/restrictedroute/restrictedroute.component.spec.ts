import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedrouteComponent } from './restrictedroute.component';

describe('RestrictedrouteComponent', () => {
  let component: RestrictedrouteComponent;
  let fixture: ComponentFixture<RestrictedrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictedrouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
