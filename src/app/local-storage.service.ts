import { Injectable } from '@angular/core';
import { Note } from './note';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private static readonly LOCAL_STORAGE_KEY = "notes";

  constructor(
    private loggerService: LoggerService
  ) {
  }

  saveNotes(notes: Note[]): Promise<Note[]> {
    return new Promise<Note[]>((resolve): void => {
      this.loggerService.log('Save notes: ', notes);

      this.saveRawDataIntoLocalStorage(notes);
      resolve(notes);
    });
  }

  saveNote(note: Note): Promise<Note> {
    return new Promise<Note>((resolve) => {
      this.loggerService.log('Save note: ', note);

      const rawData = this.loadRawDataFromLocalStorage();
      const rawNote = rawData.find((x: any) => x.id == note.id);

      if (rawNote) {
        rawNote.text = note.text;
      } else {
        rawData.push(note);
      }

      this.saveRawDataIntoLocalStorage(rawData);

      resolve(note);
    });
  }

  deleteNote(note: Note): Promise<Note> {
    return new Promise<Note>((resolve) => {
      this.loggerService.log('Delete note: ', note);

      let allNotes = this.loadRawDataFromLocalStorage();
      let noteWithoutOne = allNotes.filter((x: any) => x.id != note.id);

      this.saveRawDataIntoLocalStorage(noteWithoutOne);

      resolve(note);
    });
  }

  loadNotes(): Promise<Note[]> {
    return new Promise<Note[]>((resolve) => {
      this.loggerService.log('Load notes');

      resolve(this.loadRawDataFromLocalStorage()
        .map((r: any) => new Note(r.text, r.id))
      );
    });
  }

  private loadRawDataFromLocalStorage(): any[] {
    const rawData = localStorage.getItem(LocalStorageService.LOCAL_STORAGE_KEY)
    if (!rawData) {
      return [];
    }

    return JSON.parse(rawData);
  }

  private saveRawDataIntoLocalStorage(rawNotes: any[]) {
    let rawData = JSON.stringify(rawNotes);

    localStorage.setItem(LocalStorageService.LOCAL_STORAGE_KEY, rawData);
  }
}
