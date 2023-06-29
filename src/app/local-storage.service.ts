import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  loadNotes(): Promise<Note[]> {
    throw new Error('Method not implemented.');
  }
  saveNotes(notes: import("./note").Note[]): Promise<import("./note").Note[]> {
    throw new Error('Method not implemented.');
  }
  saveNote(note: Note): Promise<import("./note").Note> {
    throw new Error('Method not implemented.');
  }
  deleteNote(note: Note): Promise<import("./note").Note> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
