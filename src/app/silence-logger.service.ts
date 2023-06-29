import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SilenceLoggerService {

  public log(...params: any[]) {
    // ignored
  }

}
