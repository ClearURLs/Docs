# Overview

**ClearURLs** is an add-on based on the new WebExtensions technology and is optimized for *Firefox* and *Chrome* based browsers.

This extension will automatically remove tracking elements from URLs to help protect your privacy when browsing through 
the internet. For this purpose, we use a large catalog of rules, which is actively maintained by us and the community.


!!! seealso "See also"
    You can find more information about the structure of the rules catalog under [Specifications/Rule Catalogs](specs/rules.md).

!!! hint Permissions
    You can learn more information about the required permissions under [Permissions](permissions.md).

## Application
!!! example inline end ""
    `https://example.com?{==utm_source==}=newsletter1&{==utm_medium==}=email&{==utm_campaign==}=sale`

Many websites use tracking elements in the URL to mark your online activity.
All that tracking code is not necessary for a website to be displayed or work correctly and can therefore be removed 
— that is exactly what ClearURLs does.

Another common example are Amazon URLs. If you search for a product on Amazon you will see a very long URL, such as:
!!! example ""
    ```
    https://www.amazon.com/dp/exampleProduct/{==ref==}=sxin_0_pb?{==__mk_de_DE==}=ÅMÅŽÕÑ&{==keywords==}=tea&{==pd_rd_i==}=exampleProduct&{==pd_rd_r==}=8d39e4cd-1e4f-43db-b6e7-72e969a84aa5&{==pd_rd_w==}=1pcKM&{==pd_rd_wg==}=hYrNl&{==pf_rd_p==}=50bbfd25-5ef7-41a2-68d6-74d854b30e30&{==pf_rd_r==}=0GMWD0YYKA7XFGX55ADP&{==qid==}=1517757263&{==rnid==}=2914120011
    ```

Indeed most of the above URL is tracking code. Once ClearURLs has cleaned the address, it will look like this:
`https://www.amazon.com/dp/exampleProduct`

## Features

* Removes tracking from URLs automatically in the background
* Blocks some common ad domains (optional)
* Has a built-in tool to clean up multiple URLs at once
* Supports redirection to the destination, without tracking services as a middleman
* Adds an entry to the context menu so that links can be copied quickly and cleanly
* Blocks hyperlink auditing, also known as *ping tracking* (see also [this article](https://html.spec.whatwg.org/multipage/links.html#hyperlink-auditing))
* Prevents ETag tracking
* Prevents tracking injection over history API (see also: [the replaceState() method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method))
* Prevents Google from rewriting the search results (prevents the insertion of tracking code)
* Prevents Yandex from rewriting the search results (prevents the insertion of tracking code)

## Download
!!! info ""
    [![for Firefox](https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg){ loading=lazy width=180px align=left}](https://addons.mozilla.org/firefox/addon/clearurls/)
    [![for Edge](https://gitlab.com/KevinRoebert/ClearUrls/-/raw/master/promotion/MEA-button.png){ loading=lazy width=180px align=left}](https://microsoftedge.microsoft.com/addons/detail/mdkdmaickkfdekbjdoojfalpbkgaddei)
    [![for Chrome](https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png){ loading=lazy width=180px align=left}](https://chrome.google.com/webstore/detail/clearurls/lckanjgmijmafbedllaakclkaicjfmnk)

## Donation
!!! info ""
    [![Buy Me A Coffee](https://raw.githubusercontent.com/KevinRoebert/DonateButtons/master/Paypal.png){ loading=lazy width=180px align=left}](https://www.paypal.me/KevinRoebert)
    [![Buy Me A Coffee](https://raw.githubusercontent.com/KevinRoebert/DonateButtons/master/LiberaPay.png){ loading=lazy width=180px align=left}](https://liberapay.com/kroeb)
    [![Buy Me A Coffee](https://raw.githubusercontent.com/KevinRoebert/DonateButtons/master/BuyMeACoffee.png){ loading=lazy width=180px align=left}](https://www.buymeacoffee.com/KevinRoebert)