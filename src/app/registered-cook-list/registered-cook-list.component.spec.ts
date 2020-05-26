import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCookListComponent } from './registered-cook-list.component';

describe('RegisteredCookListComponent', () => {
  let component: RegisteredCookListComponent;
  let fixture: ComponentFixture<RegisteredCookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
