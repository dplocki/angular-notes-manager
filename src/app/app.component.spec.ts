import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from './note';
import { NoteService } from './services/note.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { newNote, newNumber, multiple } from './shared/testing/generators';
import { firstValueFrom, of } from 'rxjs';

describe('AppComponent', () => {

  const emptyNote = newNote().setText('').make();
  let noteServiceSpy: jasmine.SpyObj<NoteService>;
  let browserInteractionServiceSpy: jasmine.SpyObj<BrowserInteractionService>;
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  @Component({ selector: 'app-note-detail', template: '' })
  class MockNoteDetailComponent {
    @Input() note!: Note;
  }

  @Component({ selector: 'app-note-list', template: '' })
  class MockNoteListComponent {
    @Input() notes!: Note[];
    @Input() selectedNote!: Note;
    @Output() noteSelectionChange = new EventEmitter<Note>();
    @Output() noteDeleted = new EventEmitter<Note>();
  }

  @Component({ selector: 'app-delete-button', template: '' })
  class MockDeleteButtonComponent {
    @Output() invokeEvent = new EventEmitter();
  }

  @Component({ selector: 'app-new-button', template: '' })
  class MockNewButtonComponent {
    @Output() invokeEvent = new EventEmitter();
  }

  @Component({ selector: 'app-save-button', template: '' })
  class MockSaveButtonComponent {
    @Input() isSavingInProgress = false;
    @Output() invokeEvent = new EventEmitter();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockNoteDetailComponent,
        MockNoteListComponent,
        MockDeleteButtonComponent,
        MockNewButtonComponent,
        MockSaveButtonComponent
      ],
      imports: [FormsModule],
      providers: [
        {
          provide: NoteService,
          useValue: jasmine.createSpyObj('NoteService', ['getNotes', 'createNote', 'deleteNote', 'saveNote'])
        },
        {
          provide: BrowserInteractionService,
          useValue: jasmine.createSpyObj('BrowserInteractionService', ['question'])
        },
      ]
    });

    noteServiceSpy = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
    browserInteractionServiceSpy = TestBed.inject(BrowserInteractionService) as jasmine.SpyObj<BrowserInteractionService>;

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  describe('on start', () => {

    it('should return the result of noteService#getNotes() if the collection is not empty', (done) => {
      const loadedNotes = multiple(newNote(), newNumber(7, 2));
      noteServiceSpy.getNotes.and.returnValue(of(loadedNotes));
      fixture.detectChanges();

      appComponent.notes$.subscribe(notes => {
        expect(notes).toEqual(loadedNotes);
        expect(appComponent.selectedNote).toBe(notes[0])
        done();
      });
    });

    it('should return the array based on noteService#createNote if noteServiceSpy#getNotes return empty', (done) => {
      noteServiceSpy.getNotes.and.returnValue(of([]));
      noteServiceSpy.createNote.and.returnValue(of(emptyNote));
      fixture.detectChanges();

      appComponent.notes$.subscribe(notes => {
        expect(notes).toEqual([emptyNote]);
        expect(appComponent.selectedNote).toBe(notes[0])
        done();
      });
    });

  });

  describe('selectedNoteChange', () => {

    it('should change the selectedNote, when Note is also in notes', () => {
      const notes = multiple(newNote(), newNumber(7, 2));
      const selectNote = notes[newNumber(notes.length - 1, 1)];
      noteServiceSpy.getNotes.and.returnValue(of(notes));
      fixture.detectChanges();

      appComponent.selectedNoteChange(selectNote);

      expect(appComponent.selectedNote).toBe(selectNote);
    });

  });

  describe('addNoteButtonClick', () => {

    it('should call the noteService#createNote, and the result be add into notes and selected', async () => {
      const notesLength = newNumber(7, 2);
      const notes = multiple(newNote(), notesLength);
      noteServiceSpy.getNotes.and.returnValue(of(notes));
      noteServiceSpy.createNote.and.returnValue(of(emptyNote));
      fixture.detectChanges();
      await fixture.whenStable();

      appComponent.addNoteButtonClick();

      expect((await firstValueFrom(appComponent.notes$)).length).toBe(notesLength + 1);
      expect(noteServiceSpy.createNote).toHaveBeenCalled();
    });

  });

  describe('saveNoteButtonClick', () => {

    it('should check reset the save interval', async () => {
      noteServiceSpy.getNotes.and.returnValue(of([]));
      noteServiceSpy.createNote.and.returnValue(of(emptyNote));

      appComponent.saveNoteButtonClick();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(noteServiceSpy.saveNote).toHaveBeenCalled();
    });

  });

  // describe('deleteNote', () => {

  //   it('should stop after browserInteractionService returning false', async () => {
  //     browserInteractionServiceSpy.question.and.returnValue(false);
  //     const note = newNote().make();
  //     noteServiceSpy.getNotes.and.returnValue(of([]));
  //     noteServiceSpy.createNote.and.returnValue(emptyNote);

  //     await appComponent.deleteNote(note);

  //     expect(browserInteractionServiceSpy.question).toHaveBeenCalled();
  //     expect(noteServiceSpy.deleteNote).not.toHaveBeenCalled();
  //   });

  //   it('should run after browserInteractionService returning true', async () => {
  //     browserInteractionServiceSpy.question.and.returnValue(true);
  //     const note = newNote().make();
  //     noteServiceSpy.getNotes.and.returnValue(of([]));
  //     noteServiceSpy.createNote.and.returnValue(emptyNote);

  //     await appComponent.deleteNote(note);
  //     fixture.detectChanges();

  //     expect(browserInteractionServiceSpy.question).toHaveBeenCalled();
  //     expect(noteServiceSpy.deleteNote).toHaveBeenCalled();
  //   });

  //   it('should call loadNotes if deleted is the selected one', async () => {
  //     browserInteractionServiceSpy.question.and.returnValue(true);
  //     const note = newNote().make();
  //     const notDeletedNotes = multiple(newNote(), newNumber(2, 5));
  //     noteServiceSpy.getNotes.and.returnValues(
  //       of([...notDeletedNotes, note]),
  //       of(notDeletedNotes)
  //     );
  //     noteServiceSpy.createNote.and.returnValue(emptyNote);
  //     fixture.detectChanges();
  //     await fixture.whenStable();

  //     await appComponent.deleteNote(note);
  //     fixture.detectChanges();

  //     expect(browserInteractionServiceSpy.question).toHaveBeenCalled();
  //     expect(noteServiceSpy.deleteNote).toHaveBeenCalled();
  //     expect(appComponent.selectedNote).toBe(notDeletedNotes[0]);
  //     expect(await firstValueFrom(appComponent.notes$)).toEqual(notDeletedNotes);
  //   });

  // });

});
