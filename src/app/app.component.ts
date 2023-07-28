import { Component } from '@angular/core';
import { Note } from "./note";
import { NoteService } from './services/note.service';
import { ChangeDetector } from './change-detector';
import { IntervalService } from './services/interval.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  private static readonly INTERVAL_TIME = 5000;

  selectedNote$!: BehaviorSubject<Note>;
  notes$!: Observable<Note[]>;
  isSavingInProgress = false;
  changeDetector: ChangeDetector = new ChangeDetector();

  constructor(
    private noteService: NoteService,
    private intervalService: IntervalService,
    private browserInteractionService: BrowserInteractionService
  ) {
    this.loadNotes();
    this.notes$.pipe(take(1)).subscribe(notes => this.selectedNote$ = new BehaviorSubject<Note>(notes[0]));
  }

  selectedNoteChange(note: Note): void {
    this.selectedNote$.next(note);
  }

  addNoteButtonClick(): void {
    // this.selectedNoteChange(newNote);
  }

  saveNoteButtonClick(): void {
    // this.callSaveNoteFromService(this.selectedNote())
    //   .then(() => this.startTimeInterval());
  }

  deleteNote(note: Note): void {
    if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
      return;
    }

    this
      .noteService
      .deleteNote(note)
      .then(() => this.loadNotes());
  }

  private loadNotes(): void {
    this.notes$ = this
      .noteService
      .getNotes();
  }
}
