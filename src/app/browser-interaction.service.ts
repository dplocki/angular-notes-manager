import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserInteractionService {
  question(arg0: string): boolean {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
