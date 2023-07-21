import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitleComponent } from './note-title.component';

describe('NoteTitleComponent', () => {
  let component: NoteTitleComponent;
  let fixture: ComponentFixture<NoteTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTitleComponent]
    });
    fixture = TestBed.createComponent(NoteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
