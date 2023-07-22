import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  template: '<span>[<a (click)="deleteNote()" (keypress)="deleteNote()" tabindex="0">Delete</a>]</span>',
  styleUrls: ['./delete-button.component.less']
})
export class DeleteButtonComponent {

  @Output() deletedEvent = new EventEmitter();

  deleteNote(): boolean {
    this.deletedEvent.emit();

    return false;
  }
}
