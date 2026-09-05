#######
# Documentation site (Fumadocs / Next.js, fully static)
#######

NODE_IMAGE ?= node:22-alpine
OUT_DIR := $(CURDIR)/out

DOCKER_RUN_DOC_MOUNTS := -v $(CURDIR):/work -w /work
DOCKER_RUN_DOC_OPTS := --rm $(DOCKER_RUN_DOC_MOUNTS)

# Default: full static build into ./out
docs: docs-clean docs-build

# Writer mode: dev server on http://localhost:8000
docs-serve:
	docker run $(DOCKER_RUN_DOC_OPTS) -p 8000:3000 $(NODE_IMAGE) sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile || pnpm i; exec pnpm dev -p 3000"

docs-build:
	docker run $(DOCKER_RUN_DOC_OPTS) $(NODE_IMAGE) sh -c "corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile || pnpm i && pnpm build"

# Local (no docker) variants
install:
	npm install

dev:
	npm run dev

build:
	npm run build

docs-clean:
	rm -rf $(OUT_DIR) .next

.PHONY: docs docs-serve docs-build install dev build docs-clean
