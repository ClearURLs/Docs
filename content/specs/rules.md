At the moment ClearURLs know three types of rules files. The first and the oldest one is the **[data.json](#datajson)** file. 
The second one is the **[data.min.json](#dataminjson)** file, and the third one is the **[data.minify.json](#dataminifyjson)**. 
The differences are described below.

!!! important
    If you want to implement one of these files into your project and always retrieve the current files from the repository, 
    please use the GitLab/GitHub Pages URL to access the files to preserve the GitLab/GitHub infrastructure. The files are available at:

    === "GitLab"
        - data.minify.json: [https://rules1.clearurls.xyz/data.minify.json](https://rules1.clearurls.xyz/data.minify.json)
        - rules.minify.hash: [https://rules1.clearurls.xyz/rules.minify.hash](https://rules1.clearurls.xyz/rules.minify.hash)
    
    === "GitHub"
        - data.minify.json: [https://rules2.clearurls.xyz/data.minify.json](https://rules2.clearurls.xyz/data.minify.json)
        - rules.minify.hash: [https://rules2.clearurls.xyz/rules.minify.hash](https://rules2.clearurls.xyz/rules.minify.hash)

## data.json
!!! danger
    The **data.json** format is outdated. Please use only the **data.min.json** format!

The **data.json** file saves all rules, exceptions, and redirections, that are maintained by the ClearURLs developers and the community. 
This file is hosted at the GitLab repository of ClearURLs and is saved with an additional hash file, named **[rules.hash](#ruleshash)**, 
to ensure, that the rules are not faulty after the download.

!!! example "Example of a data.json file"
    ```json
    {
        "providers": {
            "providers name": {
                "urlPattern": "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com",
                "completeProvider": false,
                "rules": [
                    "trackingField=[^\\/|\\?|&]*(\\/|&(amp;)?)?",
                ],
                "exceptions": [
                    "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com/re.*/redirector.html/"
                ],
                "redirections": [
                    "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com.*url\\?.*url=([^&]+)"
                ]
            }
        }
    }
    ```


The **data.json** file is a typical JSON file. It is structured in **providers**. Providers are companies or website names, 
e.g. Google or Reddit. Every provider has the parent element **providers**, it holds the reference to all providers.

Every provider has the following five properties: 

- `urlPattern`,
- `completeProvider`,
- `rules`,
- `exceptions`, and
- `redirections`.
   
The properties of **urlPattern** and **completeProvider** must be set. The other properties are optional.

### `urlPattern`
The **urlPattern** is a regular expression, that must match every URL that should be affected by the specified rules, 
exceptions, or redirections of the provider. 
The typical structure is `<protocols><any subdomains><domain name><TLDs><any directories>?<any fields>`.

In most cases the following expression covers all the needs, you only have to substitute the remaining `<>` 
fields: `^https?://(?:[a-z0-9-]+\\.)*?<domain name>\\.<TLD>`. If you want to match with every TLD, 
you can substitute the TLD field with `(?:[a-z]{2,}){1,}`.

### `completeProvider`
The **completeProvider** is a boolean, that determines if every url, that matched the **urlPattern** will be blocked. 
If you want to specify rules, exceptions, and/or redirections, the value of **completeProvider** must be `false`.

### `rules`
The **rules** property is a JSON-Array. Every element in this array is a regular expression, that matched a field. 
If ClearURLs found a field, that matched a rule, in a given URL, the field will be deleted. 
Only URLs that match the **url Pattern** will be checked for matching fields.

### `exceptions`
The **exceptions** property is also a JSON-Array. Every element in this array is a regular expression, that matches a URL. 
If ClearURLs found a URL, that matched an exception, then no further processing on this URL is done.

### `redirections`
The **redirections** property is also a JSON-Array. Every element in this array is a regular expression, that matches a URL.
But the regular expression must follow a specification. 
The first regular expression group (https://www.regular-expressions.info/brackets.html) must be the URL that shall be redirected. 
If ClearURLs find a URL that matched the redirection than ClearURLs will `decodeURIComponent()` the first matching group and call this URL.

## rules.hash
The rules.hash file saves a SHA256 hash of the **data.json** file. 
It is used to ensure, that the rules are not faulty after the download. 

!!! important
    Note that the hash must be in lowercase.

## data.min.json
The data.min.json file mostly equals to the data.json file. Since the version 1.5a, every rule is automatically 
expanded by the ClearURLs core. So it is no longer necessary, to write the stuff, that is on every rule equals, 
into the data.min.json file.

!!! important
    From the version 1.5a, every rule has the following structure: `(?:&amp;|[/?#&])(?:<field name>=[^&]*)`. 
    The only differences between the rules are the **field names**. 
    The **field names** can still be regular expressions, but they don't have to handle the "well-formed field check".

The following fields are new in the data.min.json:

- `rawRules`,
- `referralMarketing`, and
- `forceRedirection`.

### `rawRules`
**rawRules**: Because other elements in a URL that should be filtered, besides "well-formed fields", 
there is also the **rawRules** property. Regular expressions formulated in this property can refer to the entire URL 
and not just to individual fields. They are therefore applied directly to the URL.

### `referralMarketing`
**referralMarketing**: Since version 1.9.0 you can allow **referral marketing** in ClearURLs. 
Previously these fields were always removed. Since some people want to support other people through referral marketing, 
referral marketing can be allowed in the settings. If referral marketing is allowed, 
the regular expressions in this array are no longer filtered. 

!!! attention
    Referral Marketing is disabled by default.

### `forceRedirection`
**forceRedirection**: Some websites, such as Google, have manipulated URLs (`<a>` tags) in such a way that the URL is no 
longer called normally, but via a built-in script. The result is that a simple redirect of the URL does no longer works. 
So that the URL can still be forwarded by ClearURLs, there is the property **forceRedirection**, 
which writes the URL into the main_frame object of the browser.

!!! example "Example of a data.min.json file"
    The example for the **data.json** from above looks like the following as a **data.min.json** file:
    ```json
    {
        "providers": {
            "providers name": {
                "urlPattern": "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com",
                "completeProvider": false,
                "rules": [
                    "trackingField",
                ],
                "rawRules": [
                    "/ref=[^/|?]*"
                ],
                "referralMarketing": [
                    "tag"
                ],
                "exceptions": [
                    "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com/re.*/redirector.html/"
                ],
                "redirections": [
                    "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com.*url\\?.*url=([^&]+)"
                ],
                "forceRedirection": false
            }
        }
    }
    ```

!!! important
    It is **highly recommended** to use the **data.min.json** file because this file will be used by all new versions of ClearURLs.

## rules.min.hash
For the **data.min.json** file, the GitLab CI-Runner automatically generates the necessary [**rules.min.hash** file](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/rules.min.hash?job=hash%20rules). **Note that the hash must be in lowercase.**

## data.minify.json
The [**data.minify.json**](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/data.minify.json?job=hash%20rules) file is automatically generated by the GitLab CI-Runner from the **data.min.json** file and also the necessary [**rules.minify.hash** file](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/rules.minify.hash?job=hash%20rules). The **data.minify.json** is a minimal version of the **data.min.json** file where all line breaks and spaces, as well as default values and empty lists, are removed, to save bandwidth.