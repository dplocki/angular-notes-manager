import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from "./note";
import { NoteService } from './services/note.service';
import { ChangeDetector } from './change-detector';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';

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
  changeDetector: ChangeDetector = new ChangeDetector();

  constructor(
    private noteService: NoteService,
    private browserInteractionService: BrowserInteractionService
  ) {
    this.notes$ = new BehaviorSubject<Note[]>([]);
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  selectedNoteChange(note: Note): void {
    this.selectedNote = note;
  }

  async addNoteButtonClick(): Promise<void> {
    const note = this.noteService.createNote();
    const notes = await firstValueFrom(this.notes$);

    notes.push(note);

    this.notes$.next(notes);
    this.selectedNote = note;
  }

  async saveNoteButtonClick(): Promise<void> {
    await this.noteService.saveNote(this.selectedNote);

    const notes = await firstValueFrom(this.notes$);
    const index = notes.findIndex(note => note.id === this.selectedNote.id);

    this.selectedNote = { ...this.selectedNote };
    notes[index] = this.selectedNote;

    this.notes$.next(notes);
  }

  async deleteNote(note: Note): Promise<void> {
    if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
      return;
    }

    await this.noteService.deleteNote(note);
    await this.loadNotes();
  }

  private async loadNotes(): Promise<void> {
    const notes = await firstValueFrom(this.noteService.getNotes());

    if (notes.length === 0) {
      notes.push(this.noteService.createNote());
    }

    this.notes$.next(notes);
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
