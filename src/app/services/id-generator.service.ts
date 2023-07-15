import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private nextId = 1;

  getIdForNew(): number {
    return this.nextId++;
  }

  checkNumber(id: number): void {
    if (this.nextId < id) {
      this.nextId = ++id;
    }
  }
}
