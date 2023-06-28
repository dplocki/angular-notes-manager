import { TestBed } from '@angular/core/testing';

import { BrowserInteractionService } from './browser-interaction.service';

describe('BrowserInteractionService', () => {
  let service: BrowserInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
