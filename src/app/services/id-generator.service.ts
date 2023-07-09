import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private nextId = 1;

  getIdForNew() {
    const id = this.nextId;

    this.nextId++;

    return id;
  }

  checkNumber(id: number) {
    if (this.nextId < id) {
      this.nextId = ++id;
    }
  }
}
