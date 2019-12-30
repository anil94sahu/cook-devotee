import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDevoteeComponent } from './register-devotee.component';

describe('RegisterDevoteeComponent', () => {
  let component: RegisterDevoteeComponent;
  let fixture: ComponentFixture<RegisterDevoteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDevoteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDevoteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
