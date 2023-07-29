import { ChangeDetectorRef } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";

export function invokeOnPushChanges<T>(fixture: ComponentFixture<T>): void {
    // based on https://www.appsloveworld.com/angular/100/65/unit-test-fails-when-the-component-is-marked-as-changedetectionstrategy-onpush
    fixture
        .componentRef
        .injector
        .get(ChangeDetectorRef)
        .detectChanges();
}
