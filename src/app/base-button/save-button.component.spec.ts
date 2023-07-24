import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveButtonComponent } from './base-button.component';

describe('SaveButtonComponent', () => {
  let component: SaveButtonComponent;
  let fixture: ComponentFixture<SaveButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveButtonComponent]
    });
    fixture = TestBed.createComponent(SaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should display correct label', () => {
    const button = fixture.nativeElement.querySelector('a');

    expect(button.textContent).toBe('Save');
  });

  it('should call invokeEvent() method when the button is clicked and the button is active', () => {
    spyOn(component, 'invoke');
    const saveButton = fixture.nativeElement.querySelector('a');

    saveButton.click();

    expect(component.invoke).toHaveBeenCalled();
  });

  it('should emit invokeEvent when the button is clicked', () => {
    spyOn(component.invokeEvent, 'emit');
    const saveButton = fixture.nativeElement.querySelector('a');

    saveButton.click();

    expect(component.invokeEvent.emit).toHaveBeenCalled();
  });

});

