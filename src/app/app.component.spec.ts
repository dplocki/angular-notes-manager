import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FormsModule } from '@angular/forms';
import { NoteTitlePipe } from './note-title.pipe';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NoteDetailComponent, NoteListComponent, NoteTitlePipe],
      imports: [FormsModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
