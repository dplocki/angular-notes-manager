import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LoggerService } from './logger.service';
import { Note } from '../note';
import { newNote, newNumber, multiple } from '../shared/testing/generators';
import { lastValueFrom } from 'rxjs';

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

  describe('saveNotes', () => {

    it('should call the logger and the save the local storage', async () => {
      const notes: Note[] = multiple(newNote(), 4);
      const results = await localStorageService.saveNotes(notes);

      expect(results).toEqual(notes);
      expect(loggerServiceSpy.log).toHaveBeenCalled();
      expect(localStoreSpy.setItem).toHaveBeenCalled();
      expect(localStoreSpy.getItem).not.toHaveBeenCalled();
      expect(localStoreSpy.clear).not.toHaveBeenCalled();
    });

  });

  describe('saveNote', () => {

    it('should call the logger and the save the local storage', async () => {
      const note = newNote().make();
      const results = await localStorageService.saveNote(note);

      expect(results).toEqual(note);
      expect(loggerServiceSpy.log).toHaveBeenCalled();
      expect(localStoreSpy.setItem).toHaveBeenCalled();
      expect(localStoreSpy.getItem).toHaveBeenCalled();
      expect(localStoreSpy.clear).not.toHaveBeenCalled();
    });

    it('should update the note with stored in local storage', async () => {
      const id = newNumber();
      const note = newNote().setId(id).make();
      const storedNotes: Note[] = [...multiple(newNote(), 4), note];
      let storage!:string;
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));
      localStoreSpy.setItem.and.callFake((_: string, value: string): void => { storage = value })

      const updatedNote = newNote().setId(id).make();
      await localStorageService.saveNote(updatedNote);

      expect(localStoreSpy.setItem).toHaveBeenCalled();
      const savedObjects = JSON.parse(storage) as Note[];
      expect(savedObjects.length).toBe(storedNotes.length);
    });

  });

  describe('deleteNote', () => {

    it('should call the logger and the save the local storage', async () => {
      const note = newNote().make();
      const storedNotes: Note[] = [...multiple(newNote(), 4), note];
      let storage!:string;
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));
      localStoreSpy.setItem.and.callFake((_: string, value: string): void => { storage = value })

      const results = await localStorageService.deleteNote(note);

      expect(results).toEqual(note);
      expect(loggerServiceSpy.log).toHaveBeenCalled();
      expect(localStoreSpy.setItem).toHaveBeenCalled();
      expect(localStoreSpy.getItem).toHaveBeenCalled();
      expect(localStoreSpy.clear).not.toHaveBeenCalled();
      const savedObjects = JSON.parse(storage) as Note[];
      expect(savedObjects.length).toBe(storedNotes.length - 1);
    });

  });

  describe('loadNotes', () => {

    it('should call the logger and load stored Notes', async () => {
      const storedNotes: Note[] = multiple(newNote(), 3);
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));

      const loadNotes = await lastValueFrom(localStorageService.loadNotes());

      expect(localStoreSpy.getItem).toHaveBeenCalled();
      expect(localStoreSpy.setItem).not.toHaveBeenCalled();
      expect(localStoreSpy.clear).not.toHaveBeenCalled();
      expect(loadNotes).toEqual(storedNotes);
    });

  });

});
