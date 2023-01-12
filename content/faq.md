??? faq "I have suggestions or complaints. Where can I submit them?"
    If you have any suggestions or complaints, please [create an issue](https://gitlab.com/KevinRoebert/ClearUrls/issues/new).

??? faq "Before a clean URL was visible, a dirty URL was briefly in the URL bar. Does ClearURLs work correctly?"
    Sometimes a dirty URL appears initially in the URL bar before a clean URL is displayed. 
    This does not mean that the dirty URL has been called. ClearURLs checks all requests made through the browser, 
    whether initiated by a user or by a background process. Each request passes through ClearURLs' filter, 
    which is incremental, meaning that sometimes a URL that is not yet clean is passed back to the browser. 
    This URL passes through the filter of ClearURLs again before the actual call and is then further cleaned in 
    the next step. This happens until ClearURLs make no more changes to the URL, then the URL leaves the filter of 
    ClearURLs. It is therefore possible that a URL that is not clean may temporarily appear in the URL bar. 
    To make sure that the URL is indeed cleaned correctly, you can use the integrated Cleaning Tool. 
    Here you can clean the resulting URL again and again until no more changes occur, then you have the final clean URL.

??? faq "How can I quickly check if ClearURLs do work correctly?"
    You can visit the [test page](https://test.clearurls.xyz/) of ClearURLs. 
    If only green emojis shines on the page, ClearURLs works correctly. 
    Otherwise, there is an error. Please do not forget to activate JavaScript for this test page.

??? faq "Why does ClearURLs require permission X?"
    An explanation for all required permissions can be found here: [Permissions](permissions.md)

??? faq "For which browsers is ClearURLs available?"
    ClearURLs is currently officially supported by Mozilla Firefox, Google Chrome, and Microsoft Edge.
    However, it should theoretically be possible to run the addon in all Firefox- or Chrome-based browsers.

    [![for Firefox](https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg){ loading=lazy width=180px align=left}](https://addons.mozilla.org/firefox/addon/clearurls/)
    [![for Edge](https://docs.clearurls.xyz/1.22.0/assets/img/MEA-button.png){ loading=lazy width=180px align=left}](https://microsoftedge.microsoft.com/addons/detail/mdkdmaickkfdekbjdoojfalpbkgaddei)
    [![for Chrome](https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png){ loading=lazy width=180px align=left}](https://chrome.google.com/webstore/detail/clearurls/lckanjgmijmafbedllaakclkaicjfmnk)

??? faq "Where do I find the packed version of the addon, e.g. for debugging?"
    Here you can download the packed files for Firefox- or Chrome-based browsers: 

    * [ClearURLs-firefox.zip](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/ClearURLs-firefox.zip?job=bundle%20addon%20firefox)
    * [ClearURLs-chrome.zip](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/ClearURLs-chrome.zip?job=bundle%20addon%20chrome)

??? faq "How can I enable the logging feature in ClearURLs?"
    Here you can find a step-by-step tutorial on „How to enable logging in ClearURLs“:
    [https://www.youtube-nocookie.com/embed/Rm1YkwXQDSM](https://www.youtube-nocookie.com/embed/Rm1YkwXQDSM)
