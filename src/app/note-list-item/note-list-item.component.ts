import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-list-item',
  template: `<li [class.selected]="isSelected" tabindex="0">
  <app-note-title [note]="note" />
  <app-delete-button (deletedEvent)="deleteNote()" />
</li>`,
  styleUrls: ['./note-list-item.component.less']
})
export class NoteListItemComponent {

  @Input()
  note!: Note;

  @Input()
  isSelected!: boolean;

  @Output()
  noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();

  deleteNote(): boolean {
    this.noteDeleted.emit(this.note);

    return false;
  }

}
