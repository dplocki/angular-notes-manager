import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-list-item',
  template: `<li [class.selected]="isSelected" [class.not-saved]="!(note?.isSaved)" tabindex="0">
  <app-note-title [title]="note! | noteTitle" />
  <app-delete-button (invokeEvent)="deleteNote()" />
</li>`,
  styleUrls: ['./note-list-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListItemComponent {

  @Input()
  note: Note | undefined;

  @Input()
  isSelected!: boolean;

  @Output()
  noteDeleted: EventEmitter<Note> = new EventEmitter<Note>();

  deleteNote(): boolean {
    this.noteDeleted.emit(this.note);

    return false;
  }

}
