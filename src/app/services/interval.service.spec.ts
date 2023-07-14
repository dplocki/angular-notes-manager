import { TestBed } from '@angular/core/testing';

import { IntervalService } from './interval.service';

describe('IntervalService', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyFunction = (): void => {};
  let intervalService: IntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    intervalService = TestBed.inject(IntervalService);
  });

  it('should be created', () => {
    expect(intervalService).toBeTruthy();
  });

  it('setInterval should call the setInterval with given paramaters', () => {
    const givenTime = 1002;
    const spySetInterval = spyOn(window, 'setInterval').and.returnValue(123 as unknown as ReturnType<typeof setInterval>);

    intervalService.setInterval(givenTime, emptyFunction);

    expect(spySetInterval).toHaveBeenCalled();
    expect(spySetInterval).toHaveBeenCalledWith(emptyFunction, givenTime);
  });

  it('clearInterval should call the clearInterval with paramater recieved from setInterval', () => {
    const givenTime = 1002;
    const intervalTimerValue = 123;
    const spySetInterval = spyOn(window, 'setInterval').and.returnValue(intervalTimerValue as unknown as ReturnType<typeof setInterval>);
    const spyClearInterval = spyOn(window, 'clearInterval');

    intervalService.setInterval(givenTime, emptyFunction);
    intervalService.clearInterval();

    expect(spySetInterval).toHaveBeenCalled();
    expect(spySetInterval).toHaveBeenCalledWith(emptyFunction, givenTime);
    expect(spyClearInterval).toHaveBeenCalledWith(intervalTimerValue);
  });
});
