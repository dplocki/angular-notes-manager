import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.less']
})
export class DeleteButtonComponent {

  @Input() note!: Note;
  @Output() noteDeleted = new EventEmitter<Note>();

  deleteNote(): boolean {
    this.noteDeleted.emit(this.note);

    return false;
  }
}
