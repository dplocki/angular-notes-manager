import { TestBed } from '@angular/core/testing';

import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {

  let idGeneratorService: IdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    idGeneratorService = TestBed.inject(IdGeneratorService);
  });

  it('getIdForNew should start from 1', () => {
    expect(idGeneratorService.getIdForNew()).toBe(1);
    expect(idGeneratorService.getIdForNew()).toBe(2);
    expect(idGeneratorService.getIdForNew()).toBe(3);
  });

  it('checkNumber should change nextId', () => {
    const testNumber = 5;

    idGeneratorService.checkNumber(testNumber);

    expect(idGeneratorService.getIdForNew()).toBe(testNumber + 1);
  });

});
