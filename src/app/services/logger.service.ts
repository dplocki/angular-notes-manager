import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  /* istanbul ignore next */
  log(...params: unknown[]) {
    console.log.apply(this, params);
  }

}
