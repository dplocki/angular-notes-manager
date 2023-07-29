import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListItemComponent } from './note-list-item.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';
import { makeBoolean, makeNote } from '../shared/testing/generators';
import { By } from '@angular/platform-browser';
import { invokeOnPushChanges } from '../shared/testing/utils';

describe('NoteListItemComponent', () => {
  let noteListItemComponent: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  @Component({ selector: 'app-note-title', template: '' })
  class MockNoteTitleComponent {
    @Input() note!: Note;
  }

  @Component({ selector: 'app-delete-button', template: '' })
  class MockDeleteButtonComponent {
    @Output() deletedEvent = new EventEmitter();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteListItemComponent,
        MockNoteTitleComponent,
        MockDeleteButtonComponent
      ],
    });

    fixture = TestBed.createComponent(NoteListItemComponent);
    noteListItemComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(noteListItemComponent).toBeTruthy();
  });

  it('should correctly initialize isSelected', () => {
    const isSelectedValue = makeBoolean();

    noteListItemComponent.isSelected = isSelectedValue;
    invokeOnPushChanges(fixture);

    const listItemElement = fixture.nativeElement.querySelector('li');
    expect(listItemElement.classList.contains('selected')).toBe(isSelectedValue);
  });

  it('should correctly initialize note value', () => {
    const noteValue = makeNote().make();

    noteListItemComponent.note = noteValue;
    invokeOnPushChanges(fixture);

    const noteTitleComponent = fixture.debugElement.query(By.directive(MockNoteTitleComponent)).componentInstance;
    expect(noteTitleComponent).toBeTruthy();
    expect(noteTitleComponent.note).toBe(noteValue);
  });

  it('should emit noteDeleted event on deleteNote()', () => {
    spyOn(noteListItemComponent.noteDeleted, 'emit');
    const testNote = makeNote().make();

    noteListItemComponent.note = testNote;
    fixture.detectChanges();

    noteListItemComponent.deleteNote();
    expect(noteListItemComponent.noteDeleted.emit).toHaveBeenCalledWith(testNote);
  });

});
