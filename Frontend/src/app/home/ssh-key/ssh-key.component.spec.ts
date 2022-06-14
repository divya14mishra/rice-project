import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SshKeyComponent } from './ssh-key.component';

describe('SshKeyComponent', () => {
  let component: SshKeyComponent;
  let fixture: ComponentFixture<SshKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SshKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SshKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
