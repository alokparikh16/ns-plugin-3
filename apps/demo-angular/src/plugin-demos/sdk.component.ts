import { Component, NgZone } from '@angular/core';
import { DemoSharedSdk } from '@demo/shared';
// import { } from '@alokparikh16/sdk';

@Component({
  selector: 'demo-sdk',
  templateUrl: 'sdk.component.html',
})
export class SdkComponent {
  demoShared: DemoSharedSdk;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSdk();
  }
}
