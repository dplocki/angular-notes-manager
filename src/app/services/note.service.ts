import { Injectable } from '@angular/core';
import { Note } from '../note';
import { LocalStorageService } from './local-storage.service';
import { IdGeneratorService } from './id-generator.service';
import { Observable, of, tap } from 'rxjs';

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

  saveNotes(notes: Note[]): Observable<void> {
    return this.storageService.saveNotes(notes);
  }

  saveNote(note: Note): Observable<void> {
    return this.storageService.saveNote(note);
  }

  createNote(): Observable<Note> {
    return of(new Note('', this.idGeneratorService.getIdForNew(), false));
  }

  deleteNote(note: Note): Observable<void> {
    return this.storageService.deleteNote(note);
  }
}
