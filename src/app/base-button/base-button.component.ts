import { Component, EventEmitter, Output } from '@angular/core';

const buttonTemplate = '<span>[<a (click)="invoke()" (keypress)="invoke()" tabindex="0">{{ label }}</a>]</span>';

@Component({
  selector: 'app-button',
  template: buttonTemplate,
  styleUrls: ['./base-button.component.less']
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
  styleUrls: ['./base-button.component.less']
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
  styleUrls: ['./base-button.component.less']
})
export class NewButtonComponent extends BaseButtonComponent {

  constructor() {
    super();
    this.label = 'New';
  }

}
