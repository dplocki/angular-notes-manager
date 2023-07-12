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
  });

  beforeEach(() => {
    let fakeLocalStore: { [id: string]: string | null } = {};

    localStoreSpy = {
      getItem: spyOn(window.localStorage, 'getItem').and.callFake((key: string) => key in fakeLocalStore ? fakeLocalStore[key] : null),
      setItem: spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (fakeLocalStore[key] = value + '')),
      clear: spyOn(window.localStorage, 'clear').and.callFake(() => (fakeLocalStore = {}))
    } as jasmine.SpyObj<Storage>;
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
    expect(localStoreSpy.setItem).toHaveBeenCalled();
    expect(localStoreSpy.getItem).not.toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });
});
