import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LoggerService } from './logger.service';
import { Note } from '../note';
import { makeNote, makeNumber, multiple } from '../shared/testing/generators';

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
    const notes: Note[] = multiple(makeNote(), 4);
    const results = await localStorageService.saveNotes(notes);

    expect(results).toEqual(notes);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(localStoreSpy.setItem).toHaveBeenCalled();
    expect(localStoreSpy.getItem).not.toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });

  it('saveNote is calling the logger and the save the local storage', async () => {
    const note = makeNote().make();
    const results = await localStorageService.saveNote(note);

    expect(results).toEqual(note);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(localStoreSpy.setItem).toHaveBeenCalled();
    expect(localStoreSpy.getItem).toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });

  it('saveNote should update the note with stored in local storage', async () => {
    const id = makeNumber();
    const note = makeNote().setId(id).make();
    const storedNotes: Note[] = [...multiple(makeNote(), 4), note];
    let storage!:string;
    localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));
    localStoreSpy.setItem.and.callFake((_: string, value: string): void => { storage = value })

    const updatedNote = makeNote().setId(id).make();
    await localStorageService.saveNote(updatedNote);

    expect(localStoreSpy.setItem).toHaveBeenCalled();
    const savedObjects = JSON.parse(storage) as Note[];
    expect(savedObjects.length).toBe(storedNotes.length);
  });

  it('deleteNote is calling the logger and the save the local storage', async () => {
    const note = makeNote().make();
    const results = await localStorageService.deleteNote(note);

    expect(results).toEqual(note);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(localStoreSpy.setItem).toHaveBeenCalled();
    expect(localStoreSpy.getItem).toHaveBeenCalled();
    expect(localStoreSpy.clear).not.toHaveBeenCalled();
  });
});
