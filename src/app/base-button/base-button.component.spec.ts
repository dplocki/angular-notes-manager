import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonComponent } from './base-button.component';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteButtonComponent]
    });
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteNote() method when the button is clicked', () => {
    spyOn(component, 'invoke');
    const deleteButton = fixture.nativeElement.querySelector('a');

    deleteButton.click();

    expect(component.invoke).toHaveBeenCalled();
  });

  it('should emit deletedEvent when the button is clicked', () => {
    spyOn(component.invokeEvent, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('a');

    deleteButton.click();

    expect(component.invokeEvent.emit).toHaveBeenCalled();
  });

});

