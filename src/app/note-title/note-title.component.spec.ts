import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitleComponent } from './note-title.component';
import { NoteTitlePipe } from '../note-title.pipe';
import { By } from '@angular/platform-browser';
import { newString } from '../shared/testing/generators';

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

  it('should show empty label, if not giving title', () => {
    component.title = undefined;
    const linksWithEmptyClasses = fixture.debugElement.queryAll(By.css('a.empty'));

    expect(linksWithEmptyClasses.length).toBe(1);
  });

  it('should show empty label, if giving empty title', () => {
    component.title = '';
    const linksWithEmptyClasses = fixture.debugElement.queryAll(By.css('a.empty'));

    expect(linksWithEmptyClasses.length).toBe(1);
  });

  it('should show title, when it is not empty', () => {
    component.title = newString();
    const linksWithEmptyClasses = fixture.debugElement.queryAll(By.css('a.empty'));

    expect(linksWithEmptyClasses.length).toBe(1);
  });
});
