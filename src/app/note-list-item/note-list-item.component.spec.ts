import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListItemComponent } from './note-list-item.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';
import { newBoolean, newNote } from '../shared/testing/generators';
import { By } from '@angular/platform-browser';
import { invokeOnPushChanges } from '../shared/testing/utils';
import { Pipe, PipeTransform } from '@angular/core';

describe('NoteListItemComponent', () => {
  let noteListItemComponent: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  @Component({
    selector: 'app-note-title', template: '',
    standalone: false
})
  class MockNoteTitleComponent {
    @Input() title!: Note;
  }

  @Component({
    selector: 'app-delete-button', template: '',
    standalone: false
})
  class MockDeleteButtonComponent {
    @Output() deletedEvent = new EventEmitter();
  }

  @Pipe({
    name: 'noteTitle',
    standalone: false
})
  class MockNoteTitlePipe implements PipeTransform {
    transform(value: Note): string { return value?.text ?? ''; }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteListItemComponent,
        MockNoteTitleComponent,
        MockDeleteButtonComponent,
        MockNoteTitlePipe
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
    const isSelectedValue = newBoolean();

    noteListItemComponent.isSelected = isSelectedValue;
    invokeOnPushChanges(fixture);

    const listItemElement = fixture.nativeElement.querySelector('li');
    expect(listItemElement.classList.contains('selected')).toBe(isSelectedValue);
  });

  it('should correctly initialize note value', () => {
    const noteValue = newNote().make();

    noteListItemComponent.note = noteValue;
    invokeOnPushChanges(fixture);

    const noteTitleComponent = fixture.debugElement.query(By.directive(MockNoteTitleComponent)).componentInstance;
    expect(noteTitleComponent).toBeTruthy();
    expect(noteTitleComponent.title).toBe(noteValue.text);
  });

  it('should emit noteDeleted event on deleteNote()', () => {
    spyOn(noteListItemComponent.noteDeleted, 'emit');
    const testNote = newNote().make();

    noteListItemComponent.note = testNote;
    fixture.detectChanges();

    noteListItemComponent.deleteNote();
    expect(noteListItemComponent.noteDeleted.emit).toHaveBeenCalledWith(testNote);
  });

  it('should add add the not-saved class if note.isSaved is false', () => {
    const note = newNote().setIsSaved(false).make();

    noteListItemComponent.note = note;
    invokeOnPushChanges(fixture);
    const listItemElement = fixture.nativeElement.querySelector('li');

    expect(listItemElement.classList.contains('not-saved')).toBeTrue();
  });

  it('should not add the not-saved class if note.isSaved is true', () => {
    const note = newNote().setIsSaved(true).make();

    noteListItemComponent.note = note;
    invokeOnPushChanges(fixture);
    const listItemElement = fixture.nativeElement.querySelector('li');

    expect(listItemElement.classList.contains('not-saved')).toBeFalse();
  });

});
