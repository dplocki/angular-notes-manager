import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  checkNumber(id: any) {
    throw new Error('Method not implemented.');
  }
  getIdForNew(): number {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
