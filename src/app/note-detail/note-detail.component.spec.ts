import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailComponent } from './note-detail.component';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { makeNote } from '../shared/testing/generators';

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
    component.note = signal(makeNote().make());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
