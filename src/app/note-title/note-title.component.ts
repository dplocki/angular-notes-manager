import { Component, Input } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-title',
  template: `<a *ngIf="note | noteTitle">{{ note | noteTitle }}</a><a *ngIf="!(note | noteTitle)" class="empty">(empty)</a>`
})
export class NoteTitleComponent {

  @Input()
  note!: Note;

}
