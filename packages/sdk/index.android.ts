import { AndroidApplication, Application } from '@nativescript/core';
import { customAuth } from './api';
import { clientIdProperty, SdkCommon, tokenProperty } from './common';

class CallbackInterface extends org.nativescript.sdk.JSInterface {
  callback: (message: string) => void;
  // constructor
  constructor(callback: (message: string) => void) {
    super();
    this.callback = callback;
    return global.__native(this);
  }

  public _postMessage(message: string): void {
    this.callback(message);
  }
}

export class Sdk extends SdkCommon {
  // Check if this can be avoided and if we can and should use `clientIdProperty`
  private clientId: string;
  private token: string;

  // @ts-ignore Override this.android to android's webkit webview
  get android(): android.webkit.WebView {
    return this.nativeView;
  }

  async onLoaded() {
    super.onLoaded();

    this.loadWebUrl();

    // TODO: Check if this override is global or local
    Application.android.on(AndroidApplication.activityBackPressedEvent, (event) => {
      // console.log('back', event)
    });
  }

  private loadWebUrl = async () => {
    try {
      const response = await customAuth(this.clientId, this.token);
      if (response.statusCode === 200) {
        const result = response.content.toJSON();
        this.android.loadUrl(`${result.webUrl}&token=${result.token}`);

        // this.android.loadUrl('https://5b7a-103-250-137-218.ngrok.io/v2?clientId=STvmPvvVO2ZUm-hi25ATO');

        //   this.android.getSettings().setDomStorageEnabled(true);
        //   this.android.getSettings().setJavaScriptEnabled(true);
        //   this.android.getSettings().setAllowFileAccess(true);
        //   this.android.getSettings().setAppCacheEnabled(true);
        //   this.android.getSettings().setDatabaseEnabled(true);

        // console.log('js...', this.android.getSettings().getJavaScriptEnabled());
        // this.android.loadUrl(`${result.webUrl}&token=${result.token}`);
        //   this.android.loadUrl('https://baf6-103-250-137-218.ngrok.io/v2/?clientId=STvmPvvVO2ZUm-hi25ATO')
        // const mimeType = 'text/html';
        // const encoding = "utf-8";
        // const injection = `<script type='text/javascript'>${this.setWindowInterface(result.token)};window.location.replace(${result.webUrl});</script>`;

        //   this.android.loadDataWithBaseURL(result.webUrl, injection, mimeType, encoding, null);
        this.android.evaluateJavascript(this.setWindowLocalStorage(result.token), null);

        const jsObj = new CallbackInterface((text: string) => {
          console.log('text', text);
        });

        this.android.addJavascriptInterface(jsObj, 'ReactNativeWebView');
      } else {
        // Invalid clientId/token, Handle default fallback route
      }
    } catch (err) {
      // Handle errors
    }
  };

  private setWindowLocalStorage(accessToken: string) {
    return `
      (function () {
          window.localStorage.setItem("${this.clientId}:userId","None");
          window.localStorage.setItem("alok","None");
          window.localStorage.setItem("${this.clientId}:token","JWT ${accessToken}");
          window.parentInterface = {
              isMobileAppSdk: true,
          };
      })();
    `;
  }

  [clientIdProperty.setNative](value: string) {
    this.clientId = value;
  }

  [tokenProperty.setNative](value: string) {
    this.token = value;
  }
}
