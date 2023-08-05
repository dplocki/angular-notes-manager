import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LoggerService } from './logger.service';
import { Note } from '../note';
import { newNote, newNumber, multiple } from '../shared/testing/generators';

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

    it('should call the logger and the save the local storage', (done) => {
      const notes: Note[] = multiple(newNote(), 4);

      localStorageService.saveNotes(notes).subscribe(() => {
        expect(loggerServiceSpy.log).toHaveBeenCalled();
        expect(localStoreSpy.setItem).toHaveBeenCalled();
        expect(localStoreSpy.getItem).not.toHaveBeenCalled();
        expect(localStoreSpy.clear).not.toHaveBeenCalled();

        done();
      })
    });

  });

  describe('saveNote', () => {

    it('should call the logger and the save the local storage', (done) => {
      const note = newNote().make();

      localStorageService.saveNote(note).subscribe(() => {
        expect(loggerServiceSpy.log).toHaveBeenCalled();
        expect(localStoreSpy.setItem).toHaveBeenCalled();
        expect(localStoreSpy.getItem).toHaveBeenCalled();
        expect(localStoreSpy.clear).not.toHaveBeenCalled();
        done();
      });

    });

    it('should update the note with stored in local storage', (done) => {
      const id = newNumber();
      const note = newNote().setId(id).make();
      const storedNotes: Note[] = [...multiple(newNote(), 4), note];
      let storage!:string;
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));
      localStoreSpy.setItem.and.callFake((_: string, value: string): void => { storage = value })

      const updatedNote = newNote().setId(id).make();
      localStorageService.saveNote(updatedNote).subscribe(() => {
        expect(localStoreSpy.setItem).toHaveBeenCalled();
        const savedObjects = JSON.parse(storage) as Note[];
        expect(savedObjects.length).toBe(storedNotes.length);
        done();
      });
    });

  });

  describe('deleteNote', () => {

    it('should call the logger and the save the local storage', (done) => {
      const note = newNote().make();
      const storedNotes: Note[] = [...multiple(newNote(), 4), note];
      let storage!:string;
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));
      localStoreSpy.setItem.and.callFake((_: string, value: string): void => { storage = value })

      localStorageService.deleteNote(note).subscribe(() => {
        expect(loggerServiceSpy.log).toHaveBeenCalled();
        expect(localStoreSpy.setItem).toHaveBeenCalled();
        expect(localStoreSpy.getItem).toHaveBeenCalled();
        expect(localStoreSpy.clear).not.toHaveBeenCalled();
        const savedObjects = JSON.parse(storage) as Note[];
        expect(savedObjects.length).toBe(storedNotes.length - 1);
        done();
      });
    });

  });

  describe('loadNotes', () => {

    it('should call the logger and load stored Notes', (done) => {
      const storedNotes: Note[] = multiple(newNote(), 3);
      localStoreSpy.getItem.and.returnValues(JSON.stringify(storedNotes));

      localStorageService.loadNotes().subscribe(loadNotes => {
        expect(localStoreSpy.getItem).toHaveBeenCalled();
        expect(localStoreSpy.setItem).not.toHaveBeenCalled();
        expect(localStoreSpy.clear).not.toHaveBeenCalled();
        expect(loadNotes).toEqual(storedNotes);
        done();
      });
    });

  });

});
