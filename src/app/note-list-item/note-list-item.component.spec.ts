import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListItemComponent } from './note-list-item.component';
import { NoteTitleComponent } from '../note-title/note-title.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { NoteTitlePipe } from '../note-title.pipe';

describe('NoteListItemComponent', () => {
  let component: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteListItemComponent,
        NoteTitleComponent,
        DeleteButtonComponent,
        NoteTitlePipe
      ],
    });
    fixture = TestBed.createComponent(NoteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
