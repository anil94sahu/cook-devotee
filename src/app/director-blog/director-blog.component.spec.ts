import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorBlogComponent } from './director-blog.component';

describe('DirectorBlogComponent', () => {
  let component: DirectorBlogComponent;
  let fixture: ComponentFixture<DirectorBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
