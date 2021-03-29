
#######
# This Makefile contains all targets related to the documentation
#######
ARGS=$(filter-out $@,$(MAKECMDGOALS))

CLEARURLS_DOCS_BUILD_IMAGE ?= clearurls-docs

SITE_DIR := $(CURDIR)/site

DOCKER_RUN_DOC_PORT := 8000
DOCKER_RUN_DOC_MOUNTS := -v $(CURDIR):/mkdocs
DOCKER_RUN_DOC_OPTS := --rm $(DOCKER_RUN_DOC_MOUNTS) -p $(DOCKER_RUN_DOC_PORT):8000

# Default: generates the documentation into $(SITE_DIR)
docs: docs-clean docs-image docs-build docs-deploy

# Writer Mode: build and serve docs on http://localhost:8000 with mkdocs
docs-serve: docs-image
	docker run  $(DOCKER_RUN_DOC_OPTS) $(CLEARURLS_DOCS_BUILD_IMAGE) mkdocs serve

# Utilities Targets for each step
docs-image:
	docker build -t $(CLEARURLS_DOCS_BUILD_IMAGE) -f docs.Dockerfile ./

docs-build: docs-image
	docker run $(DOCKER_RUN_DOC_OPTS) $(CLEARURLS_DOCS_BUILD_IMAGE) sh -c "mkdocs build \
		&& chown -R $(shell id -u):$(shell id -g) ./site"

docs-mike: docs-image
		docker run $(DOCKER_RUN_DOC_OPTS) $(CLEARURLS_DOCS_BUILD_IMAGE) sh -c "mike ${ARGS}"

docs-clean:
	rm -rf $(SITE_DIR)

.PHONY: all docs docs-clean docs-build docs-mike
