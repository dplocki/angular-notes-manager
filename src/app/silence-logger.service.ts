import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SilenceLoggerService {

  log(...params: any[]) {
    // ignored
  }

}
