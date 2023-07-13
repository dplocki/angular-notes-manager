import { TestBed } from '@angular/core/testing';

import { BrowserInteractionService } from './browser-interaction.service';

describe('BrowserInteractionService', () => {
  let browserInteractionService: BrowserInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    browserInteractionService = TestBed.inject(BrowserInteractionService);
  });

  it('should be created', () => {
    expect(browserInteractionService).toBeTruthy();
  });

  it('question should call the window.question', () => {
    const message = 'text of message';
    const spyConfirm = spyOn(window, 'confirm').and.returnValue(true);
    
    browserInteractionService.question(message);

    expect(spyConfirm).toHaveBeenCalled();
    expect(spyConfirm).toHaveBeenCalledWith(message);
  })
});
