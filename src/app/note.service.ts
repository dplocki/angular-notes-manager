import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  getNotes(): Promise<Note[]> {
    throw new Error('Method not implemented.');
  }

  createNote(): Note {
    throw new Error('Method not implemented.');
  }

  deleteNote(note: Note) {
    throw new Error('Method not implemented.');
  }

  saveNote(note: Note): Promise<void> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
