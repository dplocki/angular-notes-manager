import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-delete-button',
  template: '<span>[<a (click)="deleteNote()" (keypress)="deleteNote()" tabindex="0">Delete</a>]</span>',
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
