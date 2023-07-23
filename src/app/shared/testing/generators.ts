import { Note } from "src/app/note";

const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function makeString(length = 10): string {
  return [...Array(length).keys()]
    .map(() => inOptions.charAt(Math.floor(Math.random() * inOptions.length)))
    .join('');
}

export function makeNumber(max = 1024, min = 0): number {
  return min + Math.floor(Math.random() * max);
}

export function makeBoolean() {
  return Math.floor(Math.random() * 1024) % 2 == 0;
}

interface Maker<T> {
  make(): T;
}

class NoteMaker implements Maker<Note> {
  private textGenerator: () => string;
  private idGenerator: () => number;

  constructor() {
    this.textGenerator = () => makeString();
    this.idGenerator = () => makeNumber();
  }

  setTextGenerator(generatorFunction: () => string): NoteMaker {
    this.textGenerator = generatorFunction;
    return this;
  }

  setText(text: string): NoteMaker {
    this.textGenerator = () => text;
    return this;
  }

  setIdGenerator(generatorFunction: () => number): NoteMaker {
    this.idGenerator = generatorFunction;
    return this;
  }

  setId(id: number): NoteMaker {
    this.idGenerator = () => id;
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
