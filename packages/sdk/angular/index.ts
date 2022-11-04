import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Sdk } from '@alokparikh16/sdk';

@NgModule()
export class NativeScriptSdkModule {}

// Uncomment this line if the package provides a custom view component
registerElement('Sdk', () => Sdk);
