import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.less']
})
export class NoteListItemComponent {

  @Input()
  note!: Note;

  @Input()
  isSelected!: boolean;

  @Output()
  noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  noteSelectionChange = new EventEmitter<Note>();

  deleteNote(): boolean {
    this.noteDeleted.emit(this.note);

    return false;
  }

  selectNote(): boolean {
      this.noteSelectionChange.emit(this.note);

      return false;
  }

}
