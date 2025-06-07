import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
    selector: 'app-note-list',
    template: `<ol>
    @for (note of notes; track note) {
      <app-note-list-item
        [note]="note"
        [isSelected]="note === selectedNote"
        (click)="selectNote(note)"
        (keypress)="selectNote(note)"
        (noteDeleted)="deleteNote(note)" />
    }
  </ol>`,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NoteListComponent {

  @Input() notes!: Note[];
  @Input() selectedNote!: Note;
  @Output() noteSelectionChange = new EventEmitter<Note>();
  @Output() noteDeleted = new EventEmitter<Note>();

  selectNote(note: Note): boolean {
    this.noteSelectionChange.emit(note);

    return false;
  }

  deleteNote(note: Note): boolean {
    this.noteDeleted.emit(note);

    return false;
  }

}
