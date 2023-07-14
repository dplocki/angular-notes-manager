import { Note } from "./note";

export class ChangeDetector {
  private originalText!: string;
  private note!: Note;

  setNote(note: Note) {
    this.originalText = note.text;
    this.note = note;
  }

  wasChanged(): boolean {
    if (this.note.text === '') { // in case of new object
      return true;
    }

    return this.note.text !== this.originalText;
  }
}
