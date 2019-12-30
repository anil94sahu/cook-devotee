import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouraselComponent } from './courasel.component';

describe('CouraselComponent', () => {
  let component: CouraselComponent;
  let fixture: ComponentFixture<CouraselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouraselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouraselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
