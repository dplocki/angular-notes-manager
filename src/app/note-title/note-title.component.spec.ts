import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitleComponent } from './note-title.component';
import { NoteTitlePipe } from '../note-title.pipe';

describe('NoteTitleComponent', () => {
  let component: NoteTitleComponent;
  let fixture: ComponentFixture<NoteTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTitleComponent, NoteTitlePipe]
    });
    fixture = TestBed.createComponent(NoteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
