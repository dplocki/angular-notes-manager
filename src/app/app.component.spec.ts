import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { Note } from './note';
import { NoteService } from './services/note.service';
import { IntervalService } from './services/interval.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { makeNote, makeNumber, multiple } from './shared/testing/generators';

describe('AppComponent', () => {
  const emptyNote = makeNote().setText('').make();
  let noteServiceSpy: jasmine.SpyObj<NoteService>;

  @Component({ selector: 'app-note-detail', template: '' })
  class MockNoteDetailComponent {
    @Input() note!: WritableSignal<Note>;
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
          provide: IntervalService,
          useValue: jasmine.createSpyObj('IntervalService', ['setInterval', 'clearInterval'])
        },
        {
          provide: BrowserInteractionService,
          useValue: jasmine.createSpyObj('BrowserInteractionService', ['question'])
        },
      ]
    });

    noteServiceSpy = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
  });

  describe('on start', () => {

    it('should, if noteService#getNotes return empty collection, calls noteService#createNote', async () => {
      noteServiceSpy.getNotes.and.resolveTo([]);
      noteServiceSpy.createNote.and.returnValue(emptyNote);

      const fixture = TestBed.createComponent(AppComponent);
      const appComponent = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(appComponent).toBeTruthy();
      expect(noteServiceSpy.createNote).toHaveBeenCalled();
      expect(noteServiceSpy.getNotes).toHaveBeenCalled();
    });

    it('should, if noteService#getNotes return non-empty collection, select first note', async () => {
      const notes = multiple(makeNote(), makeNumber(7, 2));
      noteServiceSpy.getNotes.and.resolveTo(notes);
      noteServiceSpy.createNote.and.returnValue(emptyNote);

      const fixture = TestBed.createComponent(AppComponent);
      const appComponent = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(appComponent).toBeTruthy();
      expect(noteServiceSpy.getNotes).toHaveBeenCalled();
      expect(appComponent.selectedNote()).toBe(notes[0])
      expect(appComponent.notes).toBe(notes);
    });

  });

  describe('selectedNoteChange', () => {

    it('should change the selectedNote, when Note is also in notes', async () => {
      const notes = multiple(makeNote(), makeNumber(7, 2));
      const selectNote = notes[makeNumber(notes.length - 1, 1)];
      noteServiceSpy.getNotes.and.resolveTo(notes);
      noteServiceSpy.createNote.and.returnValue(emptyNote);
      const fixture = TestBed.createComponent(AppComponent);
      const appComponent = fixture.componentInstance;
      fixture.detectChanges();

      appComponent.selectedNoteChange(selectNote);

      expect(appComponent.selectedNote()).toBe(selectNote);
    });

  });

  describe('addNoteButtonClick', () => {

    it('should call the noteService#createNote, and the result be add into notes and selected', async () => {
      const notesLength = makeNumber(7, 2);
      const notes = multiple(makeNote(), notesLength);
      noteServiceSpy.getNotes.and.resolveTo(notes);
      noteServiceSpy.createNote.and.returnValue(emptyNote);
      const fixture = TestBed.createComponent(AppComponent);
      const appComponent = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();

      appComponent.addNoteButtonClick();

      expect(appComponent.notes.length).toBe(notesLength + 1);
      expect(noteServiceSpy.createNote).toHaveBeenCalledTimes(2); // once on beging, once on addNoteButtonClick
    });

  });

});