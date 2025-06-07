import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Note } from '../note';
import { ChangeDetector } from '../change-detector';

@Component({
    selector: 'app-note-detail',
    template: '<textarea (keyup)="onKey($event)" [(ngModel)]="note.text"></textarea>',
    styleUrls: ['./note-detail.component.less'],
    standalone: false
})
export class NoteDetailComponent implements OnChanges {
  @Input()
  note!: Note;

  constructor(private changeDetector: ChangeDetector) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.setNote(changes['note'].currentValue);
  }

  onKey(event: KeyboardEvent): void {
    this.note.text = (<HTMLInputElement>event.target).value;
    this.note.isSaved = !this.changeDetector.wasChanged();
  }
}
