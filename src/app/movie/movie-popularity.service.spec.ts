import { TestBed } from '@angular/core/testing';

import { MoviePopularityService } from './movie-popularity.service';

describe('MoviePopularityService', () => {
  let service: MoviePopularityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviePopularityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
