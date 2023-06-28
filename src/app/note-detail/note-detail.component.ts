import { Component, Input } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.less']
})
export class NoteDetailComponent {

  @Input() note!: Note;

  onKey(event: any): void {
    this.note.text = event.target.value;
  }
}
