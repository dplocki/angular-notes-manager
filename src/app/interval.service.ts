import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  clearInterval() {
    throw new Error('Method not implemented.');
  }
  setInterval(INTERVAL_TIME: number, arg1: () => Promise<void>) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
