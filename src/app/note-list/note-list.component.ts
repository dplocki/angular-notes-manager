import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less']
})
export class NoteListComponent {

  @Input() notes!: Note[];
  @Input() selectedNote!: Note;
  @Output() noteSelectionChange = new EventEmitter<Note>();
  @Output() noteDeleted = new EventEmitter<Note>();

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
