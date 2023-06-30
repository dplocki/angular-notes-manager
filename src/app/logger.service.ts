import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(...params: any[]) {
    console.log.apply(this, params);
  }

}
