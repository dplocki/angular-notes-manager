import { Injectable } from '@angular/core';
import { Note } from '../note';
import { LoggerService } from './logger.service';
import { StoragedNote } from './storaged-note';
import { Observable, of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private static readonly LOCAL_STORAGE_KEY = "notes";

  constructor(
    private loggerService: LoggerService
  ) {
  }

  saveNotes(notes: Note[]): Observable<void> {
    this.loggerService.log('Save notes: ', notes);

    return this.saveRawDataIntoLocalStorage(notes)
  }

  saveNote(note: Note): Observable<void> {
    this.loggerService.log('Save note: ', note);

    return this.loadRawDataFromLocalStorage()
      .pipe(
        map(rawData => rawData.map(rawDatum => (note.id === rawDatum.id) ? { ...rawDatum, text: note.text } : rawDatum)),
        exhaustMap(rawData => this.saveRawDataIntoLocalStorage(rawData))
      );
  }

  deleteNote(note: Note): Observable<void> {
    this.loggerService.log('Delete note: ', note);

    return this.loadRawDataFromLocalStorage()
      .pipe(
        map((storageNotes: StoragedNote[]) => storageNotes.filter((x: StoragedNote) => x.id != note.id)),
        exhaustMap(storageNotes => this.saveRawDataIntoLocalStorage(storageNotes))
      );
  }

  loadNotes(): Observable<Note[]> {
    this.loggerService.log('Load notes');

    return this
      .loadRawDataFromLocalStorage()
      .pipe(map((storagedNotes: StoragedNote[]) => storagedNotes.map(storagedNote => new Note(storagedNote.text, storagedNote.id))));
  }

  private saveRawDataIntoLocalStorage(rawNotes: StoragedNote[]): Observable<void> {
    return new Observable<void>((subscriber) => {
      const rawData = JSON.stringify(rawNotes);
      localStorage.setItem(LocalStorageService.LOCAL_STORAGE_KEY, rawData);
      subscriber.next();
      subscriber.complete();
    });
  }

  private loadRawDataFromLocalStorage(): Observable<StoragedNote[]> {
    const rawData = localStorage.getItem(LocalStorageService.LOCAL_STORAGE_KEY)
    if (!rawData) {
      return of([]);
    }

    return of(JSON.parse(rawData));
  }

}
