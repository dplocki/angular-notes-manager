import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note';

@Pipe({
  name: 'noteTitle'
})
export class NoteTitlePipe implements PipeTransform {
  private static readonly TITLE_MAX_LENGTH = 20;

  transform(value: Note): string {
    if (!value || !value.text) {
        return '';
    }

    const title = value.text
        .replace('\n', '')
        .trim();

    return title.length > NoteTitlePipe.TITLE_MAX_LENGTH
        ? title.substring(0, NoteTitlePipe.TITLE_MAX_LENGTH) + '...'
        : title;
  }
}
