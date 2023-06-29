import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteTitle'
})
export class NoteTitlePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
