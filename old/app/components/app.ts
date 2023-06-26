import { Component, Input } from '@angular/core';
import { Note } from '../entities/note';

import { NoteService } from '../services/note';
import { IntervalService } from '../services/interval';
import { BrowserInteractionService } from '../services/browser.interaction';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: '/app/templates/app.html',
    providers: [
        NoteService,
        IntervalService,
        BrowserInteractionService
    ],
    styleUrls: [ '../styles/app.css' ]
})
export class AppComponent {
    private static readonly INTERVAL_TIME = 5000;

    @Input() selectedNote: Note;

    notes: Note[] = null;
    isSavingInProgress: boolean = false;
    changeDetector: ChangeDetector = new ChangeDetector();

    constructor(
            private noteService: NoteService,
            private intervalService: IntervalService,
            private browserInteractionService: BrowserInteractionService
        ) {
        this.setNotes([]);
    }

    ngOnInit() {
        this.noteService
            .getNotes()
            .then(notes => {
                this.setNotes(notes);
                this.startTimeInterval();
            });
    }

    selectedNoteChange(note: Note) {
        this.callSaveNoteFromService(this.selectedNote);
        this.selectedNote = note;
        this.changeDetector.setNote(note);
    }

    deleteNoteFromList(note: Note) {
        this.deleteNote(note);
    }

    addNoteButtonClick(event: any) {
        const newNote = this.noteService.createNote();

        this.notes.push(newNote);
        this.selectedNoteChange(newNote);
    }

    saveNoteButtonClick(event: any) {
        // I used to have a blocked here in case of ongoing saving operation,
        // but I remove it: gives more problems than gets

        this.callSaveNoteFromService(this.selectedNote)
            .then(() => this.startTimeInterval());
    }

    deleteNoteButtonClick(event: any) {
        this.deleteNote(this.selectedNote);
    }

    private deleteNote(note: Note) {
        if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
            return;
        }

        this.notes = this.notes.filter((n:Note) => n.id != note.id);
        if (note == this.selectedNote) {
            this.setNotes(this.notes);
        }

        this.noteService.deleteNote(note);
    }

    private setNotes(notes: Note[]) {
        this.notes = notes;
        if (this.notes.length === 0) {
            this.notes.push(this.noteService.createNote());
        }

        this.selectedNote = this.notes[0];
        this.changeDetector.setNote(this.notes[0]);
    }

    private startTimeInterval() {
        this.intervalService.clearInterval();
        this.intervalService.setInterval(
                AppComponent.INTERVAL_TIME,
                () => this.callSaveNoteFromService(this.selectedNote)
            );
    }

    private callSaveNoteFromService(note: Note): Promise<void> {
        if (!this.changeDetector.wasChanged()) {
            return Promise.resolve();
        }

        this.isSavingInProgress = true;

        return this.noteService.saveNote(note)
            .then(() => {
                this.isSavingInProgress = false;
                this.changeDetector.setNote(this.selectedNote);
            });
    }
}

class ChangeDetector {
    private originalText: string;
    private note: Note;

    public setNote(note: Note) {
        this.originalText = note.text;
        this.note = note;
    }

    public wasChanged(): boolean {
        if (this.note.text === '') { // in case of new object
            return true;
        }

        return this.note.text !== this.originalText;
    }
}
