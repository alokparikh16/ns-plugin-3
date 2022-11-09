package org.nativescript.sdk;

import android.webkit.JavascriptInterface;

public class JSInterface {
    public JSInterface() {}
    
    @JavascriptInterface
    public void postMessage(String message) {
        this._postMessage(message);
    }

    public void _postMessage(String message) {
        // we will override this in Native Script
    }
}