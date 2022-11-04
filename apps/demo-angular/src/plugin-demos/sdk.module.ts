import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SdkComponent } from './sdk.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SdkComponent }])],
  declarations: [SdkComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SdkModule {}
