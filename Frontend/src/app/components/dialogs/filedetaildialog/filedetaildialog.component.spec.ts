import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledetaildialogComponent } from './filedetaildialog.component';

describe('FiledetaildialogComponent', () => {
  let component: FiledetaildialogComponent;
  let fixture: ComponentFixture<FiledetaildialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledetaildialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
