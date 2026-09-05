??? faq "I have suggestions or complaints. Where can I submit them?"
    If you have any suggestions or complaints, please [create an issue on GitHub](https://github.com/ClearURLs/Addon/issues/new).

    If a **specific website** is broken or not cleaned, please report it in the
    [rules issue tracker](https://github.com/ClearURLs/Rules/issues/new) instead.
    Please read [How to report a buggy website](reporting.md) first. It shows
    step by step which information helps us the most.

??? faq "A website does not work while ClearURLs is turned on. What can I do?"
    First, quickly check whether ClearURLs is really the cause:

    1. Click the ClearURLs icon in the browser toolbar and turn the **Filter** switch off.
    2. Reload the website and try again.

    If the website works now, ClearURLs is involved. Known problems and their fixes
    (Google AI Overviews, Google Docs, sign-ins, Amazon, and more) are collected on the
    [Troubleshooting](troubleshooting.md) page. Do not forget to turn the **Filter**
    switch on again afterwards.

??? faq "Can I exclude specific websites (whitelist)?"
    A real per-website whitelist is the most requested feature, but it is **not included**
    in the current released version. You can follow the discussion in
    [this issue](https://github.com/ClearURLs/Addon/issues/93).

    Until it exists, you can:

    - pause all cleaning with the **Filter** switch in the add-on pop-up,
    - turn off single features in the settings (for example *Prevent tracking injection
      over history API* or *ETag filtering*) if only one function causes trouble.

    Details and an advanced workaround (using your own copy of the rules) are described on the
    [Troubleshooting](troubleshooting.md#whitelist) page.

??? faq "My browser disabled ClearURLs and says it is 'no longer supported'. (Chrome/Brave)"
    This is caused by Google's removal of the *Manifest V2* extension technology from Chrome
    and Chrome-based browsers (including Brave). It is a browser decision the add-on cannot override.

    - **Firefox:** unaffected. ClearURLs works and stays supported.
    - **Chrome / Brave:** the add-on may be disabled automatically until a version based on
      the new Manifest V3 technology is available.

    More background: [Troubleshooting: Manifest V2 situation](troubleshooting.md#mv2).

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
    ClearURLs is currently officially supported by **Mozilla Firefox**.
    In Firefox- or Chrome-based browsers it may still run in principle, but support for the
    Chrome/Edge/Brave family is ending (see the warning below).

    !!! warning "Important for Chrome, Edge and Brave users"
        Google is removing the *Manifest V2* technology the current version of ClearURLs
        is built on. Chrome-based browsers (including **Brave**) may disable the add-on
        automatically, and **Microsoft Edge** is expected to follow the same plan.
        **Firefox is not affected** and remains fully supported.
        Details: [Manifest V2 situation](troubleshooting.md#mv2)

    [![for Firefox](https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg){ loading=lazy width=180px align=left}](https://addons.mozilla.org/firefox/addon/clearurls/)

??? faq "Where do I find the packed version of the addon, e.g. for debugging?"
    Here you can download the packed files for Firefox- or Chrome-based browsers: 

    * [ClearURLs-firefox.zip](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/ClearURLs-firefox.zip?job=bundle%20addon%20firefox)
    * [ClearURLs-chrome.zip](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/ClearURLs-chrome.zip?job=bundle%20addon%20chrome)

??? faq "How can I enable the logging feature in ClearURLs?"
    Enable it in the add-on settings page under **Configs → Logging**, or follow the
    step-by-step guide with screenshots for reporting:
    [How to report a buggy website: Step 3: Create a log](reporting.md#log).
    The guide also shows how to **export** the log as a file, which is what we need
    for a bug report.