import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListComponent } from './note-list.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';
import { makeNote, multiple } from '../shared/testing/generators';
import { By } from '@angular/platform-browser';
import { invokeOnPushChanges } from '../shared/testing/utils';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  @Component({ selector: 'app-note-list-item', template: '' })
  class MockNoteListItemComponent {
    @Input() note!: Note;
    @Input() isSelected!: boolean;
    @Output() noteSelectionChange = new EventEmitter<Note>();
    @Output() noteDeleted = new EventEmitter<Note>();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteListComponent, MockNoteListItemComponent]
    });

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly initialize inputs', () => {
    const selectedIndex = 1;
    const testNotes = multiple(makeNote(), 5);
    const testSelectedNote = testNotes[selectedIndex];

    component.notes = testNotes;
    component.selectedNote = testSelectedNote;
    invokeOnPushChanges(fixture);

    const noteItems = fixture.debugElement.queryAll(By.directive(MockNoteListItemComponent));
    expect(noteItems.length).toBe(testNotes.length);

    for (let i = 0; i < testNotes.length; i++) {
      const testNote = testNotes[i];
      const testSelection = i == selectedIndex;
      const noteItem = noteItems[i].componentInstance;

      expect(noteItem.note).toBe(testNote);
      expect(noteItem.isSelected).toBe(testSelection);
    }
  });

  it('should emit noteSelectionChange on selectNote()', () => {
    spyOn(component.noteSelectionChange, 'emit');
    const testNote: Note = makeNote().make();

    component.selectNote(testNote);
    expect(component.noteSelectionChange.emit).toHaveBeenCalledWith(testNote);
  });

  it('should emit noteDeleted on deleteNote()', () => {
    spyOn(component.noteDeleted, 'emit');
    const testNote: Note = makeNote().make();

    component.deleteNote(testNote);
    expect(component.noteDeleted.emit).toHaveBeenCalledWith(testNote);
  });

});
