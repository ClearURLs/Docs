At the moment ClearURLs knows three types of rule catalogs – each in its respective file. 
We will only look at two of these three catalogs, as the first version is already outdated.

!!! important
    If you want to use one of these catalogs in your project and always retrieve the current version, 
    please use the GitLab/GitHub Pages URL to access the catalogs to preserve the GitLab/GitHub infrastructure. 
    The catalog files are available at:

    === "GitHub (default)"
        - data.minify.json: [https://{==rules2==}.clearurls.xyz/data.minify.json](https://rules2.clearurls.xyz/data.minify.json)
        - rules.minify.hash: [https://{==rules2==}.clearurls.xyz/rules.minify.hash](https://rules2.clearurls.xyz/rules.minify.hash)

    === "GitLab"
        - data.minify.json: [https://{==rules1==}.clearurls.xyz/data.minify.json](https://rules1.clearurls.xyz/data.minify.json)
        - rules.minify.hash: [https://{==rules1==}.clearurls.xyz/rules.minify.hash](https://rules1.clearurls.xyz/rules.minify.hash)

!!! important
    Do not use the older **data.json** catalog – it is outdated and will no longer receive any updates.
    Instead, use the **data.min.json** catalog!

## data.min.json Catalog
The **data.min.json** catalog is a typical JSON file and saves all rules, exceptions, and redirections, 
that are maintained by the ClearURLs developers and the community.
It is structured in **providers**.
Providers are a logical unit under which multiple rules are applied under the same `urlPattern`.
Examples of providers are companies or services like Google or Reddit.
Every provider has the parent element **providers**, it holds the reference to all providers.

Every provider has the following properties:

- `urlPattern` (required)
- `completeProvider` (optional)
- `rules` (optional)
- `rawRules` (optional)
- `referralMarketing` (optional)
- `exceptions` (optional)
- `redirections` (optional)
- `forceRedirection` (optional)

!!! example "Example of a data.min.json file"
    ```json
    {
        "providers": {
            "provider name": {
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

### `urlPattern`
The **urlPattern** is a regular expression, that must match every URL that should be affected by the specified rules, 
exceptions, or redirections of the provider. 
The typical structure is `<protocol><subdomain><domain name><TLD><directorie>?<fields>`.

In most cases the following expression covers all the needs, you only have to substitute the remaining `<>` 
fields: `^https?://(?:[a-z0-9-]+\\.)*?<domain name>\\.<TLD>`. If you want to match with every TLD, 
you can substitute the TLD field with `(?:[a-z]{2,}){1,}`.

### `completeProvider`
The **completeProvider** is a boolean, that determines if every URL that matches the **urlPattern** will be blocked. 
If you want to specify rules, exceptions, and/or redirections, the value of **completeProvider** must be `false`.

### `rules`
The **rules** property is a JSON array. Every element in this array will be automatically rewritten to 
`(?:&amp;|[/?#&])(?:{==<field name>==}=[^&]*)` to match the `field name`.
The `field name` can still be a regular expression, but don't have to.
If ClearURLs found a field that matches a rule in a given URL the field will be deleted. 
Only URLs that match the **url Pattern** will be checked for matching fields.

### `rawRules`
Because other elements in a URL that should be filtered, besides "well-formed fields" aka normal rules,
there is also the **rawRules** property. Regular expressions formulated in this property can refer to the entire URL
and not just to individual fields. They are therefore applied directly to the URL.

### `referralMarketing`
Since version 1.9.0, you can allow **referral marketing** in ClearURLs.
Previously these fields were always removed. Since some people want to support other people through referral marketing,
referral marketing can be allowed in the settings. If referral marketing is allowed,
the regular expressions in this array are no longer filtered.

!!! attention
    Referral Marketing is disabled by default.

### `exceptions`
The **exceptions** property is also a JSON array. Every element in this array is a regular expression, that matches a URL. 
If ClearURLs found a URL, that matches an exception, no further processing on this URL is done.

### `redirections`
The **redirections** property is a JSON array. Every element in this array is a regular expression, that matches a URL and 
must follow a specification. 
The [first regular expression group](https://www.regular-expressions.info/brackets.html) must be the URL that should be redirected. 
If ClearURLs find a URL that matches the redirection, the first matching group will be decoded with will `decodeURIComponent()` and
replaces the old URL.

### `forceRedirection`
Some websites, such as Google, have manipulated URLs (`<a>` tags) in such a way that the URL is no
longer called normally, rather via a built-in script. The result is that a simple redirect of the URL does no longer work.
Thus, to still forward the URL by ClearURLs, there is the property **forceRedirection**
which writes the URL into the `main_frame` object of the browser.

## rules.min.hash
The [**rules.min.hash** file](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/rules.min.hash?job=hash%20rules)
saves a SHA256 hash of the **data.min.json** file and will be automatically generated by the GitLab CI runner.
It is used to ensure, that the rules are not faulty after the download. 

!!! important
    Note that the hash must be in lowercase.

## data.minify.json Catalog
The [**data.minify.json**](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/data.minify.json?job=hash%20rules) 
file is automatically generated by the GitLab CI runner from the **data.min.json** file and also the corresponding
[**rules.minify.hash** file](https://gitlab.com/KevinRoebert/ClearUrls/-/jobs/artifacts/master/raw/rules.minify.hash?job=hash%20rules). 
The **data.minify.json** is a minimal version of the **data.min.json** file where all line breaks and spaces, 
as well as default values and empty lists, are removed to save bandwidth.
