import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-note-title',
    template: `@if (title) {
  <a>{{ title }}</a>
} @else {
  <a class="empty">(empty)</a>
}
`,
    styles: ['a.empty { color: lightgray; }'],
    standalone: false
})
export class NoteTitleComponent {

  @Input()
  title: string | undefined;

}
