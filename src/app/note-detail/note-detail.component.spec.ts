import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailComponent } from './note-detail.component';
import { Note } from '../note';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    component.note = signal(new Note('', 0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
