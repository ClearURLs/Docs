This page describes the permissions used by **ClearURLs** and the purpose for which they are used.


## [`<all_urls>`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#%3call_urls%3e)
This permission is needed to perform URL or URI cleaning on all pages, regardless of the protocol (HTTPS, HTTP, data, etc.).

## [`webRequest`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) and [`webRequestBlocking`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/BlockingResponse)
These permissions are needed to be notified of browser requests (i.e., calling a URL/website) and interrupt them to perform any cleaning that may be necessary. The cleaned URL is then passed to the browser.

## [`storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
This permission is needed to save settings, logs, and rules.

## [`unlimitedStorage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#unlimited_storage)
This permission is needed to exceed any quota imposed by the `storage.local` API. The API otherwise limits us to 5MB, which would quickly be reached with the log turned on, thus rendering the addon unusable. This permission should become optional in the future.

## [`contextMenus`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus)
This permission is required for the "Copy Clean Link Location" function on the context menu.

## [`webNavigation`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation) and [`tabs`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs)
These permissions are needed to prevent websites from manipulating the URL in the location bar after the page load. ClearURLs listen for these events and undo the change. If you don't want this, you can disable this feature in the settings. To disable this feature, you have to switch the "Prevent tracking injection over history API" button, and then the "Save & reload" addon button.

## [`downloads`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads)
This permission is required to export logs and settings. This permission should become optional in the future.