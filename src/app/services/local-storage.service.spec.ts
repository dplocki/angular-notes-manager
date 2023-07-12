import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LoggerService } from './logger.service';
import { Note } from '../note';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let localStoreSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj('LoggerService', ['log'])
        }
      ]
    });

    localStorageService = TestBed.inject(LocalStorageService);
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

    localStoreSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);
    spyOnProperty(window, 'localStorage').and.returnValue(localStoreSpy);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('saveNotes is calling the logger and the save the local storage', async () => {
    const notes: Note[] = [
      new Note('abc', 1),
      new Note('bcd', 2)
    ];

    const results = await localStorageService.saveNotes(notes);

    expect(results).toEqual(notes);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(localStoreSpy.setItem).toHaveBeenCalledTimes(1);
    expect(localStoreSpy.getItem).not.toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });

  it('saveNote is calling the logger and the save the local storage', async () => {
    const note = new Note('abc', 1);

    const results = await localStorageService.saveNote(note);

    expect(results).toEqual(note);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(localStoreSpy.setItem).toHaveBeenCalled();
    expect(localStoreSpy.getItem).toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });
});
