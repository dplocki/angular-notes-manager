import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserInteractionService {

  public question(yesNoQuestion: string): boolean {
    return confirm(yesNoQuestion);
  }

}
