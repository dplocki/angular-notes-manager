import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from "./note";
import { NoteService } from './services/note.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { BehaviorSubject, Subject, concatMap, firstValueFrom, map, of, switchAll, switchMap, take, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private static readonly INTERVAL_TIME = 5000;

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
      this.selectedNote = newNote;
    });
  }

  saveNoteButtonClick(): void {
    this.noteService.saveNote(this.selectedNote)
      .pipe(switchMap(() => this.notes$))
      .subscribe(notes => {
        const index = notes.findIndex(note => note.id === this.selectedNote.id);
        this.selectedNote = { ...this.selectedNote, isSaved: true };
        notes[index] = this.selectedNote;
        this.notes$.next(notes);
      });
  }

  deleteNote(note: Note): void {
    if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
      return;
    }

    this.noteService.deleteNote(note)
      .pipe(switchMap(() => this.notes$))
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
        this.selectedNote = selectedNote;
        return;
      }
    }

    this.selectedNote = notes[0];
  }
}
