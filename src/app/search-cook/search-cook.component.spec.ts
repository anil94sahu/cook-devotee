import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCookComponent } from './search-cook.component';

describe('SearchCookComponent', () => {
  let component: SearchCookComponent;
  let fixture: ComponentFixture<SearchCookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
