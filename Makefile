.DEFAULT_GOAL := help

define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

PROJECT_NAME := $(call GetFromPkg,name)
LAST_VERSION := $(call GetFromPkg,version)

default: help

help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

install: # Install all the dependencies
	npm install

build: # Build the NestJS project (ready for K8S environments)
	npm run build

dev: # Start the project in development mode
	npm run start:dev

check: # Check the code style and linting
	npm run prettier && npm run lint

check-fix: # Check the code style and linting and fix the issues
	npm run prettier:fix && npm run lint:fix

test: # Run tests with coverage
	npm run test:cov

swagger: # Start the project and open Swagger documentation
	npm run start:dev
	open http://localhost:3000/api/docs

clean: # Clean unnecessary directories
	npm run clean

.PHONY: test
