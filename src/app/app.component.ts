import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Note } from "./note";
import { NoteService } from './services/note.service';
import { ChangeDetector } from './change-detector';
import { IntervalService } from './services/interval.service';
import { BrowserInteractionService } from './services/browser-interaction.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private static readonly INTERVAL_TIME = 5000;

  selectedNote!: WritableSignal<Note>;
  notes!: Note[];
  isSavingInProgress = false;
  changeDetector: ChangeDetector = new ChangeDetector();

  constructor(
    private noteService: NoteService,
    private intervalService: IntervalService,
    private browserInteractionService: BrowserInteractionService
  ) {
    this.setNotes([]);
  }

  ngOnInit(): void {
    this.noteService
      .getNotes()
      .then((notes: Note[]) => {
        this.setNotes(notes);
        this.startTimeInterval();
      });
  }

  selectedNoteChange(note: Note): void {
    this.callSaveNoteFromService(this.selectedNote());
    this.selectedNote.set(note);
    this.changeDetector.setNote(note);
  }

  addNoteButtonClick(): void {
    const newNote = this.noteService.createNote();

    this.notes.push(newNote);
    this.selectedNoteChange(newNote);
  }

  saveNoteButtonClick(): void {
    this.callSaveNoteFromService(this.selectedNote())
      .then(() => this.startTimeInterval());
  }

  deleteNote(note: Note): void {
    if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
      return;
    }

    this.notes = this.notes.filter((n: Note) => n.id != note.id);
    if (note == this.selectedNote()) {
      this.setNotes(this.notes);
    }

    this.noteService.deleteNote(note);
  }

  private setNotes(notes: Note[]): void {
    this.notes = notes;
    if (this.notes.length === 0) {
      this.notes.push(this.noteService.createNote());
    }

    this.selectedNote = signal(this.notes[0]);
    this.changeDetector.setNote(this.notes[0]);
  }

  private startTimeInterval(): void {
    this.intervalService.clearInterval();
    this.intervalService.setInterval(
      AppComponent.INTERVAL_TIME,
      () => this.callSaveNoteFromService(this.selectedNote())
    );
  }

  private async callSaveNoteFromService(note: Note): Promise<void> {
    if (!this.changeDetector.wasChanged()) {
      return Promise.resolve();
    }

    this.isSavingInProgress = true;
    await this.noteService.saveNote(note);
    this.isSavingInProgress = false;
    this.changeDetector.setNote(this.selectedNote());
  }
}
