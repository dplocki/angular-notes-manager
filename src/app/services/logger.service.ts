import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(...params: unknown[]) {
    console.log.apply(this, params);
  }

}
