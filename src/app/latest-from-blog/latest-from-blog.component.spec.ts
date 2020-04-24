import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFromBlogComponent } from './latest-from-blog.component';

describe('LatestFromBlogComponent', () => {
  let component: LatestFromBlogComponent;
  let fixture: ComponentFixture<LatestFromBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestFromBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestFromBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
