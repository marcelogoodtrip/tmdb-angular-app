import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMoviesComponent } from './top-movies.component';

describe('TopMoviesComponent', () => {
  let component: TopMoviesComponent;
  let fixture: ComponentFixture<TopMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopMoviesComponent]
    });
    fixture = TestBed.createComponent(TopMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
