import { TestBed } from '@angular/core/testing';
import { NoteService } from './note.service';
import { LocalStorageService } from './local-storage.service';
import { IdGeneratorService } from './id-generator.service';
import { makeNote, multiple } from '../shared/testing/generators';

describe('NoteService', () => {
  const exampleNotes = multiple(makeNote(), 5);

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
  });

  it('getNotes should return stored notes and checked their ids', async () => {
    storageServiceSpy.loadNotes.and.resolveTo(exampleNotes);
    idGeneratorServiceSpy.checkNumber.and.returnValues();

    const notes = await noteService.getNotes();

    expect(notes).toEqual(exampleNotes);
    expect(idGeneratorServiceSpy.checkNumber).toHaveBeenCalledTimes(exampleNotes.length);
  });

  it('saveNote should be delegate to storageService', async () => {
    const exampleNote = makeNote().make();

    await noteService.saveNote(exampleNote);

    expect(storageServiceSpy.saveNote).toHaveBeenCalled();
  });

  it('saveNotes should be delegate to storageService', async () => {
    await noteService.saveNotes(exampleNotes);

    expect(storageServiceSpy.saveNotes).toHaveBeenCalled();
  });

  it('createNote should be delegate to storageService', () => {
    const note = noteService.createNote();

    expect(note.text).toBe('');
    expect(idGeneratorServiceSpy.getIdForNew).toHaveBeenCalled();
  });

  it('deleteNote should be delegate to storageService', async () => {
    const exampleNote = makeNote().make();

    await noteService.deleteNote(exampleNote);

    expect(storageServiceSpy.deleteNote).toHaveBeenCalled();
  });
});
