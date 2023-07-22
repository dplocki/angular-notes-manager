import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonComponent } from './delete-button.component';

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
    spyOn(component, 'deleteNote');
    const deleteButton = fixture.nativeElement.querySelector('a');
    deleteButton.click();
    expect(component.deleteNote).toHaveBeenCalled();
  });
});

