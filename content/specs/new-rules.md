# New Rule Format

This page describes the next-generation ClearURLs rule format.
It is designed for human authoring and review, while still allowing efficient transport after compilation.

The recommended workflow is:

1. Author rule catalogs in YAML.
2. Validate and compile them to a canonical JSON representation.
3. Minify and compress the generated JSON for distribution.

The YAML file is the authoring format.
The compiled JSON file is the transport format.

The new format replaces the old split between `rules`, `rawRules`, `referralMarketing`, and `redirections`
with a unified rule model.

## Design Goals

The new rule format is built around the following goals:

- Human-readable and easy to edit
- Extensible without introducing new top-level arrays for every new feature
- Explicit support for `description`, `preprocessors`, `exceptions`, `requestTypes`, and `replacePattern`
- Compact authoring syntax for simple field-removal rules
- Easy compilation to a transport-friendly JSON artifact

## File Structure

Every rules file starts with a version and a defaults block.

- `version` identifies the format revision
- `defaults` contains standard values that apply to rules unless overridden
- `providers` contains all provider definitions

!!! example "Example of the new rule format"
    ```yaml
    version: 2

    defaults:
      active: true
      requestTypes: all
      preprocessors: []
      exceptions: []

    providers:
      google:
        urlPattern: '^https?:\/\/(?:[a-z0-9-]+\.)*?google(?:\.[a-z]{2,}){1,}'
        forceRedirection: true
        exceptions:
          - '^https?:\/\/mail\.google\.com\/'
        rules:
          - ved
          - id: 'remove-referrer'
            match: 'referrer'
            description: 'Remove referrer marker'
          - id: 'redirect-target'
            kind: redirection
            match: '^https?:\/\/(?:[a-z0-9-]+\.)*?google(?:\.[a-z]{2,}){1,}\/url\?.*?(?:url|q)=([^&]+)'
            preprocessors:
              - type: doubleUrlDecode
                inputs: [1]
            action:
              type: redirect
              replacePattern: '§1§'
    ```

## Top-level Keys

### `version`

The format version of the rules file.

Current value:

- `2`

### `defaults`

Defines default values for rule-level properties.

Supported defaults:

- `active`
- `description`
- `requestTypes`
- `preprocessors`
- `exceptions`

Defaults are applied when the same property is omitted in a rule object.
They should stay in the `defaults` block and must not be repeated on every rule unless a rule explicitly overrides them.

### `providers`

Holds all provider definitions.
Each provider groups rules that apply under the same `urlPattern`.

## Provider Definition

Every provider supports the following keys:

- `urlPattern` (required)
- `completeProvider` (optional)
- `forceRedirection` (optional)
- `methods` (optional)
- `exceptions` (optional)
- `rules` (optional)

### `urlPattern`

A regular expression that must match the URL before provider rules are considered.

### `completeProvider`

If enabled and domain blocking is active in the runtime, the matching request can be blocked completely.

### `forceRedirection`

Signals that redirections should be enforced by the integration layer for `main_frame` requests.

### `methods`

Optional list of HTTP methods for which the provider should apply.

### `exceptions`

Provider-level URL exceptions.
If the request URL matches one of these expressions, no further processing happens for this provider.

### `rules`

The provider's rule list.
All rule kinds are expressed in this single list.

## Rule Definition

A rule can either be written in short form or long form.

### Short Form

The short form is intended for simple field-removal rules that use only defaults.
It should only be used when all of the following are true:

- the rule kind is `field`
- the action is `remove`
- the rule does not override `active`, `description`, `exceptions`, `requestTypes`, or `preprocessors`
- the rule is not marked as `referralMarketing`

!!! example "Short form"
    ```yaml
    rules:
      - utm_source
      - fbclid
    ```

This is equivalent to the following long-form rule:

```yaml
rules:
  - id: remove-utm-source
    kind: field
    match: 'utm_source'
    action:
      type: remove
```

with all other fields taken from `defaults`.

Short form keeps the catalog compact and is the preferred notation for ordinary field-removal rules.
The engine generates deterministic fallback ids for short-form rules, but these ids are not a persistence contract.
Use the long form with an explicit `id` whenever rule-level toggles need to survive future catalog edits.

### Long Form

Use the long form whenever you need metadata or non-default behavior.
Long-form rules must declare an explicit `id`.

Supported keys:

- `id`
- `aliases`
- `kind`
- `match`
- `active`
- `description`
- `exceptions`
- `requestTypes`
- `preprocessors`
- `referralMarketing`
- `action`

### `id`

The provider-local stable rule identifier.

- Required for every long-form rule
- Must match `^[a-z0-9][a-z0-9_-]*$`
- Must be unique within the provider across both rule ids and aliases

The runtime namespaces this id as `sourceId::providerId::ruleId`.
This namespaced runtime id is what the core engine exposes for persistent rule toggles.

### `aliases`

Optional previous names for a rule.

- Must follow the same slug syntax as `id`
- Must not contain the rule's own `id`
- Must be unique within the provider across both rule ids and aliases

Aliases allow a renamed rule to keep existing persisted toggles working.

### `kind`

Supported rule kinds:

- `field`
- `raw`
- `redirection`

If omitted, `field` is assumed.

### `match`

The regular expression string for the rule.

- `field` rules operate on query and fragment keys
- `raw` rules operate on the full URL string
- `redirection` rules operate on the full URL string

For `field` rewrite rules, the matched key stays unchanged and the action rewrites the corresponding value.
The current value is exposed to preprocessors and `replacePattern` as `§1§`.

### `active`

Whether the rule is active.
If omitted, the rule inherits the value from `defaults.active`.

### `description`

Optional human-readable explanation for the rule.

### `exceptions`

Rule-level exceptions expressed as regular expressions.
If one matches, the rule is skipped.

### `requestTypes`

Defines for which request types the rule applies.

Supported values:

- `all`
- a list such as `['main_frame', 'sub_frame']`

!!! example
    ```yaml
    requestTypes: all
    ```

    ```yaml
    requestTypes: ['main_frame', 'sub_frame']
    ```

Use `all` whenever the rule should apply to every request type.

### `preprocessors`

Preprocessors transform captured regex groups before the action is executed.

Every preprocessor defines:

- `type`
- `inputs`

The `inputs` field controls which capture groups are processed.

Supported forms:

- `all`
- `[1]`
- `[1, 2]`

Common supported preprocessor types in the core engine:

- `urlEncode`
- `urlDecode`
- `doubleUrlEncode`
- `doubleUrlDecode`
- `base64Encode`

!!! example
    ```yaml
    preprocessors:
      - type: base64Encode
        inputs: [1]
      - type: doubleUrlDecode
        inputs: [2]
    ```

    ```yaml
    preprocessors:
      - type: doubleUrlDecode
        inputs: all
    ```

### `referralMarketing`

Marks a field rule as a referral marketing rule.
These rules are only applied when referral marketing is not allowed by the runtime configuration.

## Actions

Every rule resolves to an action.

Supported action types:

- `remove`
- `redirect`
- `rewrite`

### `remove`

Deletes the matched field or removes the raw match from the URL.

!!! example
    ```yaml
    action:
      type: remove
    ```

### `redirect`

Builds a new target URL from regex capture groups and navigates to it.

!!! example
    ```yaml
    action:
      type: redirect
      replacePattern: '§1§'
    ```

### `rewrite`

Builds a new URL string from regex capture groups without implying a redirect-specific runtime behavior.

For `field` rules, `rewrite` keeps the matched query or fragment key and replaces only its value.
For `raw` rules, `rewrite` rebuilds the full URL string from regex capture groups.

!!! example
    ```yaml
    action:
      type: rewrite
      replacePattern: '§1§://§2§.clearurls.xyz/'
    ```

!!! example "Field rewrite"
    ```yaml
    rules:
      - id: rewrite-token
        match: token
        preprocessors:
          - type: base64Encode
            inputs: [1]
        action:
          type: rewrite
          replacePattern: 'wrapped-§1§'
    ```

    This keeps the key `token` and rewrites a value such as `test` to `wrapped-dGVzdA==`.

## `replacePattern`

The `replacePattern` supports placeholder substitution based on regex capture groups.

For example:

```yaml
replacePattern: '§1§://§2§.clearurls.xyz/'
```

with capture groups:

```text
['https', 'test']
```

results in:

```text
https://test.clearurls.xyz/
```

This makes it possible to rebuild a target URL from multiple capture groups instead of being limited to the first group only.

## Complete Example

!!! example "Example provider using the new rule model"
    ```yaml
    version: 2

    defaults:
      active: true
      requestTypes: all
      preprocessors: []
      exceptions: []

    providers:
      example:
        urlPattern: '^https?:\/\/(?:[a-z0-9-]+\.)*?example\.com'
        forceRedirection: true
        rules:
          - utm_source
          - id: 'referral-tag'
            match: 'tag'
            referralMarketing: true
          - id: 'raw-ref'
            kind: raw
            match: '/ref=([^/?]*)'
            action:
              type: rewrite
              replacePattern: '/clean/§1§'
          - id: 'redirect-target'
            kind: redirection
            match: '^https?:\/\/(?:[a-z0-9-]+\.)*?example\.com\/go\?.*target=([^&]+)'
            preprocessors:
              - type: doubleUrlDecode
                inputs: [1]
            action:
              type: redirect
              replacePattern: '§1§'
    ```

## Migration from the Old Format

The recommended migration is:

1. Read the legacy JSON catalog.
2. Convert each provider to the new YAML rule model.
3. Convert:
   - old `rules` to `kind: field`
   - old `rawRules` to `kind: raw`
   - old `redirections` to `kind: redirection`
   - old `referralMarketing` entries to `kind: field` with `referralMarketing: true`
4. Keep provider-level `exceptions` as provider-level exceptions.
5. Move global defaults that repeat across many rules into the `defaults` block instead of copying them into each rule.
6. Add explicit long-form `id` values for every rule that should support stable persisted toggles.

## Conversion Tool

The `core` package contains an interactive converter that migrates a legacy JSON catalog into the new YAML format.

Run it from `core`:

```bash
npm run convert-rules -- /path/to/legacy-rules.json /path/to/new-rules.yaml
```

The tool asks for default values for the new rule fields and then writes the converted YAML file.

## Additional Tooling

The `core` package also contains two non-interactive export tools for the new YAML format.

Convert YAML to the transport-oriented minified JSON representation:

```bash
npm run new-rules-to-json -- /path/to/new-rules.yaml /path/to/new-rules.min.json
```

Convert YAML back to the legacy ClearURLs JSON dataset:

```bash
npm run new-rules-to-legacy -- /path/to/new-rules.yaml /path/to/new-rules.legacy.json
```

!!! attention
    The legacy export is behavior-preserving, not identity-preserving.
    Rule `id` and `aliases` are intentionally dropped because the old format has no place to store them.
    If the YAML file contains behavioral features that cannot be represented in the old format, such as preprocessors,
    the conversion fails instead of silently changing the rules.
