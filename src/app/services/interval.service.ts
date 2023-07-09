import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  private interval!: ReturnType<typeof setInterval>;

  setInterval(time: number, callback: () => void): void {
    this.interval = setInterval(callback, time);
  }

  clearInterval(): void {
    clearInterval(this.interval);
  }
}
