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
        { provide: LocalStorageService, useValue: jasmine.createSpyObj('LocalStorageService', ['loadNotes', 'saveNotes']) },
        { provide: IdGeneratorService, useValue: jasmine.createSpyObj('IdGeneratorService', ['checkNumber']) }
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

  it('saveNotes should be delegate to storageService', async () => {
    const loadNotes = [
      new Note('a', 1),
      new Note('b', 2),
    ];

    await noteService.saveNotes(loadNotes);

    expect(storageServiceSpy.saveNotes).toHaveBeenCalled();
  });
});
