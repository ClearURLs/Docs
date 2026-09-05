# Compiled List Format

The compiled list format is the canonical runtime input of the ClearURLs core.

It is not meant to be hand-written. Human-edited rule catalogs should use the
[new rule format](new-rules.md), then be compiled into this normalized JSON
shape before they are passed to the runtime.

## Goals

The compiled format exists to keep the runtime small and predictable:

- all defaults are already resolved
- all long-form and short-form rules have explicit ids
- all aliases are preserved
- all authoring shorthand is removed
- the runtime does not need YAML parsing or schema validation

## Top-Level Shape

```json
{
  "id": "core",
  "defaultActive": true,
  "providers": []
}
```

- `id`: stable list identifier
- `defaultActive`: default activation state of the whole list
- `providers`: compiled providers of the list

## Provider Shape

```json
{
  "providerId": "google",
  "urlPattern": "^https?:\\/\\/(?:[a-z0-9-]+\\.)*google(?:\\.[a-z]{2,}){1,}",
  "defaultActive": true,
  "completeProvider": false,
  "forceRedirection": true,
  "methods": ["GET"],
  "rules": []
}
```

- `providerId`: stable provider identifier within the list
- `urlPattern`: canonical provider matcher source
- `defaultActive`: default activation state of the provider
- `completeProvider`: block the whole request when the provider matches
- `forceRedirection`: mark redirect results as forced redirects
- `methods`: optional HTTP method restriction
- `rules`: all provider rules as one normalized list

## Rule Shape

```json
{
  "id": "field-utm-source",
  "aliases": ["legacy-utm-source"],
  "kind": "field",
  "section": "rules",
  "match": "^utm_source$",
  "flags": "i",
  "action": {
    "type": "remove"
  },
  "activeDefault": true,
  "description": "",
  "exceptions": [],
  "requestTypes": "all",
  "preprocessors": [],
  "referralMarketing": false
}
```

- `id`: stable provider-local rule id
- `aliases`: optional legacy ids for persistent settings migration
- `kind`: `exception`, `field`, `raw`, or `redirection`
- `section`: legacy-compatible logical rule section
- `match`: canonical regex source used at runtime
- `flags`: canonical regex flags used at runtime
- `action`: `remove`, `rewrite`, or `redirect`
- `activeDefault`: configured default activation state
- `description`: optional human-readable description
- `exceptions`: rule-level exception regex sources
- `requestTypes`: `all` or an explicit list
- `preprocessors`: normalized preprocessor definitions
- `referralMarketing`: whether the rule is part of referral-marketing handling

## Runtime IDs

The runtime namespaces compiled rule ids by list and provider:

```text
listId::providerId::ruleId
```

For example:

```text
core::google::field-utm-source
```

These runtime ids are used by the catalog layer for persistent activation
overrides.

## Relationship to the Runtime

The runtime consumes compiled lists through two steps:

1. `CatalogManager` loads one or more compiled lists, applies list/provider/rule
   activation state, deduplicates compatible providers, and builds an immutable
   active snapshot.
2. `ClearUrlsEngine` cleans URLs against that active snapshot.

The runtime no longer reads YAML or legacy rule JSON directly.
