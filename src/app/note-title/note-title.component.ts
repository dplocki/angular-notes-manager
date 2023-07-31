import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-title',
  template: `<ng-container *ngIf="title; else emptyTitle">
  <a>{{ title }}</a>
</ng-container>
<ng-template #emptyTitle>
  <a class="empty">(empty)</a>
</ng-template>`,
  styles: [ 'a.empty { color: lightgray; }' ]
})
export class NoteTitleComponent {

  @Input()
  title: string | undefined;

}
