import { Component, EventEmitter, Input, Output } from '@angular/core';

const buttonTemplate = '<span>[<a (click)="invoke()" (keypress)="invoke()" tabindex="0">{{ label }}</a>]</span>';

@Component({
    selector: 'app-button',
    template: buttonTemplate,
    styles: [],
    standalone: false
})
abstract class BaseButtonComponent {

  protected label!: string;

  @Output() invokeEvent = new EventEmitter();

  invoke(): boolean {
    this.invokeEvent.emit();

    return false;
  }

}

@Component({
    selector: 'app-delete-button',
    template: buttonTemplate,
    styles: [],
    standalone: false
})
export class DeleteButtonComponent extends BaseButtonComponent {

  constructor() {
    super();
    this.label = 'Delete';
  }

}

@Component({
    selector: 'app-new-button',
    template: buttonTemplate,
    styles: [],
    standalone: false
})
export class NewButtonComponent extends BaseButtonComponent {

  constructor() {
    super();
    this.label = 'New';
  }

}

@Component({
    selector: 'app-save-button',
    template: `<span>[<a tabindex="0" [class.workInProgress]="isSavingInProgress" (click)="invoke()" (keypress)="invoke()" (keydown)="invoke()">{{ isSavingInProgress ? '...' : label }}</a>]</span>`,
    styles: [`a.workInProgress {
    font-weight: bold;
}`],
    standalone: false
})
export class SaveButtonComponent extends BaseButtonComponent {

  @Input()
  isSavingInProgress = false;

  constructor() {
    super();
    this.label = 'Save';
  }

}
