import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { LocalStorageService } from './local-storage.service';
import { IdGeneratorService } from './id-generator.service';
import { Note } from './note';

describe('NoteService', () => {
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
    const loadNotes = [
      new Note('a', 1),
      new Note('b', 2),
    ];

    storageServiceSpy.loadNotes.and.resolveTo(loadNotes);
    idGeneratorServiceSpy.checkNumber.and.returnValues();

    const notes = await noteService.getNotes();

    expect(notes).toEqual(loadNotes);
    expect(idGeneratorServiceSpy.checkNumber).toHaveBeenCalledTimes(loadNotes.length);
  });

  it('saveNote should be delegate to storageService', async () => {
    const exampleNote = new Note('a', 1);

    await noteService.saveNote(exampleNote);

    expect(storageServiceSpy.saveNote).toHaveBeenCalled();
  });

  it('saveNotes should be delegate to storageService', async () => {
    const exampleNotes = [
      new Note('a', 1),
      new Note('b', 2),
    ];

    await noteService.saveNotes(exampleNotes);

    expect(storageServiceSpy.saveNotes).toHaveBeenCalled();
  });

  it('createNote should be delegate to storageService', () => {
    const note = noteService.createNote();

    expect(note.text).toBe('');
    expect(idGeneratorServiceSpy.getIdForNew).toHaveBeenCalled();
  });

  it('deleteNote should be delegate to storageService', async () => {
    const exampleNote = new Note('a', 1);

    await noteService.deleteNote(exampleNote);

    expect(storageServiceSpy.deleteNote).toHaveBeenCalled();
  });
});
