import { Component, Input } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-title',
  template: `<ng-container *ngIf="note | noteTitle; else emptyTitle">
  <a>{{ note | noteTitle }}</a>
</ng-container>
<ng-template #emptyTitle>
  <a class="empty">(empty)</a>
</ng-template>`,
  styles: [ 'a.empty { color: lightgray; }' ]
})
export class NoteTitleComponent {

  @Input()
  note!: Note;

}
