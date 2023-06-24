import { Component, Input } from '@angular/core';
import { Note } from '../entities/note';

@Component({
    moduleId: module.id,
    selector: 'note-detail',
    templateUrl: '/app/templates/note.detail.html',
    styleUrls: [ '../styles/note.detail.css' ]
})
export class NoteDetailComponent {
  @Input() note: Note;

  onKey(event: any): void {
      this.note.text = event.target.value;
  }
}
