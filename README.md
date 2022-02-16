# Overview

This repository includes the source files used to build the documentation used for the official documentation site. You can visit the official documentation site here: https://docs.clearurls.xyz/

# Build

Use the given Makefile to build the doc: `make docs`

# Develop

Use the given Makefile to develop. You can see all changes in realtime with: `make docs-serve`

# Release

`mike deploy --push --update-aliases <version> latest`

or for dev versions

`mike deploy --push --update-aliases <version> dev`
