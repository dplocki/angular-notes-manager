import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Note } from '../entities/note';

@Component({
  moduleId: module.id,
  selector: 'note-list',
  templateUrl: '/app/templates/note.list.html',
  styleUrls: [ '../styles/note.list.css' ]
})
export class NoteListComponent {
    @Input() notes: Note[];
    @Input() selectedNote: Note;
    @Output() noteSelectionChange: EventEmitter<Note> = new EventEmitter<Note>();
    @Output() noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();

    selectNote(note: Note): boolean {
        this.selectedNote = note;
        this.noteSelectionChange.emit(note);

        return false;
    }

    deleteNote(note: Note): boolean {
        this.noteDeleted.emit(note);

        return false;
    }
}
