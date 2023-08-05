import { TestBed } from '@angular/core/testing';
import { NoteService } from './note.service';
import { LocalStorageService } from './local-storage.service';
import { IdGeneratorService } from './id-generator.service';
import { newNote, multiple } from '../shared/testing/generators';
import { EMPTY, empty, of } from 'rxjs';

describe('NoteService', () => {

  const exampleNotes = multiple(newNote(), 5);

  let noteService: NoteService;
  let storageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let idGeneratorServiceSpy: jasmine.SpyObj<IdGeneratorService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoteService,
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', [
            'loadNotes',
            'saveNote',
            'saveNotes',
            'deleteNote'
          ])
        },
        {
          provide: IdGeneratorService,
          useValue: jasmine.createSpyObj('IdGeneratorService', [
            'checkNumber',
            'getIdForNew'
          ])
        }
      ]
    });

    noteService = TestBed.inject(NoteService);
    storageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    idGeneratorServiceSpy = TestBed.inject(IdGeneratorService) as jasmine.SpyObj<IdGeneratorService>;

    storageServiceSpy.deleteNote.and.returnValue(of(void 0));
    storageServiceSpy.saveNote.and.returnValue(of(void 0));
    storageServiceSpy.saveNotes.and.returnValue(of(void 0));
  });

  describe('getNotes', () => {

    it('getNotes should return stored notes and checked their ids', (done) => {
      storageServiceSpy.loadNotes.and.returnValue(of(exampleNotes));
      idGeneratorServiceSpy.checkNumber.and.returnValues();

      noteService.getNotes().subscribe(notes => {
        expect(notes).toEqual(exampleNotes);
        expect(idGeneratorServiceSpy.checkNumber).toHaveBeenCalledTimes(exampleNotes.length);
        done();
      });
    });

  });

  describe('saveNote', () => {

    it('should be delegate to storageService', (done) => {
      const exampleNote = newNote().make();

      noteService.saveNote(exampleNote).subscribe(() => {
        expect(storageServiceSpy.saveNote).toHaveBeenCalled();
        done();
      });
    });

  });

  describe('saveNotes', () => {

    it('should be delegate to storageService', (done) => {
      noteService.saveNotes(exampleNotes).subscribe(() => {
        expect(storageServiceSpy.saveNotes).toHaveBeenCalled();
        done();
      })
    });

  });

  describe('createNote', () => {

    it('should be delegate to storageService', (done) => {
      noteService.createNote().subscribe(note => {
        expect(note.text).toBe('');
        expect(idGeneratorServiceSpy.getIdForNew).toHaveBeenCalled();
        done();
      });
    });

  });

  describe('deleteNote', () => {

    it('should be delegate to storageService', (done) => {
      const exampleNote = newNote().make();

      noteService.deleteNote(exampleNote).subscribe(() => {
        expect(storageServiceSpy.deleteNote).toHaveBeenCalled();
        done();
      });
    });

  });

});
