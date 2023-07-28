import { Injectable } from '@angular/core';
import { Note } from '../note';
import { LocalStorageService } from './local-storage.service';
import { IdGeneratorService } from './id-generator.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private storageService: LocalStorageService,
    private idGeneratorService: IdGeneratorService
  ) {
  }

  getNotes(): Observable<Note[]> {
    return this
      .storageService
      .loadNotes()
      .pipe(tap(notes => notes.forEach(n => this.idGeneratorService.checkNumber(n.id))));
  }

  async saveNotes(notes: Note[]): Promise<Note[]> {
    return await this.storageService.saveNotes(notes);
  }

  async saveNote(note: Note): Promise<Note> {
    return await this.storageService.saveNote(note);
  }

  createNote(): Note {
    return new Note('', this.idGeneratorService.getIdForNew());
  }

  async deleteNote(note: Note): Promise<Note> {
    return await this.storageService.deleteNote(note);
  }
}
