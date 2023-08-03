import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailComponent } from './note-detail.component';
import { FormsModule } from '@angular/forms';
import { newNote, newString } from '../shared/testing/generators';

describe('NoteDetailComponent', () => {
  let noteDetailComponent: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    noteDetailComponent = fixture.componentInstance;
    noteDetailComponent.note = newNote().make();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(noteDetailComponent).toBeTruthy();
  });

  it('should initialize ngModel with the provided note', async () => {
    const noteContent = newString();
    const note = newNote().setText(noteContent).make();

    noteDetailComponent.note = note;
    fixture.detectChanges();
    await fixture.whenStable();

    const textareaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement.value).toBe(noteContent);
  });

  it('should update the note text property on keyup', () => {
    const note = newNote().make();
    const newNoteText = newString();
    noteDetailComponent.note = note;
    fixture.detectChanges();

    const textareaElement = fixture.nativeElement.querySelector('textarea');
    textareaElement.value = newNoteText;
    textareaElement.dispatchEvent(new Event('keyup'));

    expect(noteDetailComponent.note.text).toBe(newNoteText);
  });

});
