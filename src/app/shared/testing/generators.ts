import { Note } from "src/app/note";

const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function makeString(length = 10): string {
  return [...Array(length).keys()]
    .map(() => inOptions.charAt(Math.floor(Math.random() * inOptions.length)))
    .join('');
}

export function makeNumber(max: number, min = 0): number {
  return min + Math.floor(Math.random() * max);
}

interface Maker<T> {
  make(): T;
}

class NoteMaker implements Maker<Note> {
  textGenerator: () => string;
  idGenerator: () => number;

  constructor() {
    this.textGenerator = () => makeString();
    this.idGenerator = () => makeNumber(1024);
  }

  setTextGenerator(generatorFunction: () => string): NoteMaker {
    this.textGenerator = generatorFunction;
    return this;
  }

  setIdGenerator(generatorFunction: () => number): NoteMaker {
    this.idGenerator = generatorFunction;
    return this;
  }

  make(): Note {
    return new Note(this.textGenerator(), this.idGenerator());
  }
}

export function makeNote(): NoteMaker {
  return new NoteMaker();
}

export function multiple<T>(maker: Maker<T>, howMany: number): T[] {
  return [...Array(howMany)].map(() => maker.make());
}
