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

dev: # Run the NestJS project in development mode
	@echo "Starting development environment..."
	npm run start:dev

check: # Check the code style and linting
	npm run prettier && npm run lint

check-fix: # Check the code style and linting and fix the issues
	npm run prettier:fix && npm run lint:fix

test: # Run tests with coverage
	npm run test:cov

swagger: # Start the project and open Swagger documentation
	npm run start:dev
	open http://localhost:3001/api

clean: # Clean unnecessary directories
	npm run clean

docker:
	@echo Building docker image for ${PROJECT_NAME} v${LAST_VERSION}

ifeq ($(DEBUG),true)
	@echo "Debug mode is on."
	docker build --target final -t ${PROJECT_NAME} -f ./docker/Dockerfile . --no-cache --progress=plain
else
	docker build --platform=linux/amd64 --target final -t ${PROJECT_NAME} -f ./docker/Dockerfile .
endif

run: docker #docker run --env NODE_ENV=production --env-file .env -p 3000:8080 ${PROJECT_NAME}
	docker run -p 8080:3000 ${PROJECT_NAME}

run-interact: # Run the docker image prebuilded
	docker run -it -p 8080:3000 ${PROJECT_NAME}

.PHONY: clean docker run build test install
