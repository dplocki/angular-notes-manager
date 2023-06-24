import { Injectable } from '@angular/core';

import { Note } from '../entities/note';
import { LocalStorageService } from './local.storage';
import { IdGeneratorService } from './id.generator';

@Injectable()
export class NoteService {
    constructor(
        private storageService: LocalStorageService,
        private idGeneratorService: IdGeneratorService
    ) {
    }

    getNotes(): Promise<Note[]> {
        return this.storageService.loadNotes()
            .then(notes => {
                notes.forEach(n => this.idGeneratorService.checkNumber(n.id));

                return notes;
            });
    }

    saveNotes(notes: Note[]): Promise<Note[]> {
        return this.storageService.saveNotes(notes);
    }

    saveNote(note: Note): Promise<Note> {
        return this.storageService.saveNote(note);
    }

    createNote(): Note {
        return new Note('', this.idGeneratorService.getIdForNew());
    }

    deleteNote(note: Note): Promise<Note> {
        return this.storageService.deleteNote(note);
    }
}
