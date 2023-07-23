import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewButtonComponent } from './base-button.component';

describe('NewButtonComponent', () => {
  let component: NewButtonComponent;
  let fixture: ComponentFixture<NewButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewButtonComponent]
    });
    fixture = TestBed.createComponent(NewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should display correct label', () => {
    const button = fixture.nativeElement.querySelector('a');

    expect(button.textContent).toBe('New');
  });

  it('should call invokeEvent() method when the button is clicked', () => {
    spyOn(component, 'invoke');
    const newButton = fixture.nativeElement.querySelector('a');

    newButton.click();

    expect(component.invoke).toHaveBeenCalled();
  });

  it('should emit invokeEvent when the button is clicked', () => {
    spyOn(component.invokeEvent, 'emit');
    const newButton = fixture.nativeElement.querySelector('a');

    newButton.click();

    expect(component.invokeEvent.emit).toHaveBeenCalled();
  });

});

