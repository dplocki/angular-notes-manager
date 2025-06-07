import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from "./note";
import { NoteService } from './services/note.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { BehaviorSubject, Subject, map, of, switchMap, take, zip } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent implements OnInit {
  selectedNote!: Note;
  notes$: Subject<Note[]>;
  isSavingInProgress = false;

  constructor(
    private noteService: NoteService,
    private browserInteractionService: BrowserInteractionService
  ) {
    this.notes$ = new BehaviorSubject<Note[]>([]);
  }

  ngOnInit(): void {
    this.noteService.getNotes()
    .pipe(
      switchMap((notes: Note[]) => {
        if (notes.length === 0) {
          return this.noteService
            .createNote()
            .pipe(map((createdNote: Note) => [createdNote]));
        } else {
          return of(notes);
        }
      })
    ).subscribe(notes => {
      this.notes$.next(notes);
      this.adjustSelectedNote(notes);
    });
  }

  selectedNoteChange(note: Note): void {
    this.selectedNote = note;
  }

  addNoteButtonClick(): void {
    zip(
      this.notes$,
      this.noteService.createNote()
    ).subscribe((zipped: [Note[], Note]) => {
      const [notes, newNote] = zipped;

      notes.push(newNote);
      this.notes$.next(notes);
      this.selectedNoteChange(newNote);
    });
  }

  saveNoteButtonClick(): void {
    this.noteService.saveNote(this.selectedNote)
      .pipe(switchMap(() => this.notes$.pipe(take(1))))
      .subscribe(notes => {
        const index = notes.findIndex(note => note.id === this.selectedNote.id);
        this.selectedNoteChange({ ...this.selectedNote, isSaved: true });
        notes[index] = this.selectedNote;
        this.notes$.next(notes);
      });
  }

  deleteNote(note: Note): void {
    if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
      return;
    }

    this.noteService.deleteNote(note)
      .pipe(switchMap(() => this.notes$.pipe(take(1))))
      .subscribe(notes => {
        const localNotes = notes.filter(n => note.id !== n.id);

        this.notes$.next(localNotes);
        this.adjustSelectedNote(localNotes);
      });
  }

  private adjustSelectedNote(notes: Note[]): void {
    if (this.selectedNote) {
      const selectedNote = notes.find(n => n.id === this.selectedNote.id);
      if (selectedNote) {
        this.selectedNoteChange(selectedNote);
        return;
      }
    }

    this.selectedNoteChange(notes[0]);
  }
}
