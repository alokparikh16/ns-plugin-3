import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSdk } from '@demo/shared';
// import { } from '@alokparikh16/sdk';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSdk {}
