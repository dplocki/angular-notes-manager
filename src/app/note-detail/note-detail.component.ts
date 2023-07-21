import { Component, Input, WritableSignal } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-detail',
  template: '<textarea (keyup)="onKey($event)" [(ngModel)]="note().text" ></textarea>',
  styleUrls: ['./note-detail.component.less']
})
export class NoteDetailComponent {

  @Input()
  note!: WritableSignal<Note>;

  onKey(event: KeyboardEvent): void {
    this.note.mutate((note: Note) => note.text = (<HTMLInputElement>event.target).value)
  }
}
