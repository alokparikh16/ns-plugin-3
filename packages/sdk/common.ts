import { Property, WebView } from '@nativescript/core';

export const clientIdProperty = new Property<SdkCommon, string>({
  name: 'clientId',
});

export const tokenProperty = new Property<SdkCommon, string>({
  name: 'token',
});

export class SdkCommon extends WebView {}

clientIdProperty.register(SdkCommon);
tokenProperty.register(SdkCommon);
