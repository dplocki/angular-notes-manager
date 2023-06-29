import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  nextId: number = 1;

  public getIdForNew() {
    const id = this.nextId;

    this.nextId++;

    return id;
  }

  public checkNumber(id: number) {
    if (this.nextId < id) {
      this.nextId = id++;
    }
  }
}
