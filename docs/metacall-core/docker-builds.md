---
title: Docker Builds
---

# Docker Builds

This document describes how to use Docker to build, test, and deploy MetaCall. Docker provides a consistent environment for building MetaCall across different platforms and simplifies the development process by isolating dependencies. For information about building MetaCall without Docker, see [Build System](./build-system.md) and [Build Configuration](./build-configuration.md).

## Overview of MetaCall Docker Build System

MetaCall uses Docker Compose to manage multiple Docker images that serve different purposes in the development, testing, and deployment workflow. The system consists of four main Docker images arranged in a dependency hierarchy.

Each image serves a specific purpose in the MetaCall ecosystem:

- **deps**: Contains all dependencies required to build MetaCall (compiler, libraries, etc.)
- **dev**: Contains the built MetaCall from source code, used for development and testing
- **runtime**: Contains only the runtime dependencies, optimized for production deployments
- **cli**: Provides a lightweight command-line interface to MetaCall

## Docker Image Structure and Composition

The MetaCall Docker build system is designed as a multi-stage build process where each stage builds upon the previous one:

### deps Image

The `deps` image installs all development dependencies required to build MetaCall, including:

- Base build tools (gcc, cmake, git)
- Language-specific dependencies (Python, Ruby, NodeJS, etc.)
- External libraries (RapidJSON, libffi, etc.)

This image is built using the `metacall-environment.sh` script to install dependencies based on configuration options.

### dev Image

The `dev` image builds MetaCall from source using the dependencies installed in the `deps` image. It includes:

- Full MetaCall build with all components
- Development tools and debugging symbols
- Test suite and examples

This image is primarily used for development and testing and serves as the base for the runtime and CLI images.

### runtime Image

The `runtime` image is a minimal image containing only the components necessary to run MetaCall in production, including:

- MetaCall core libraries
- Selected language runtimes (Python, NodeJS, etc.)
- Required runtime dependencies

This image is optimized for deployment and is smaller than the dev image.

### cli Image

The `cli` image provides a command-line interface to interact with MetaCall, making it easy to run scripts in different languages:

- MetaCall CLI tool
- Minimal dependencies required for CLI operation
- Default entry point is the metacall CLI

This image is used for executing MetaCall commands in CI/CD pipelines or as an interactive development environment.

## Building Docker Images

MetaCall provides a convenient shell script (`docker-compose.sh`) to manage the Docker build process. This script simplifies the building, testing, and deploying of Docker images.

### Basic Build Commands

To build all MetaCall Docker images:

This command builds the following images in sequence:

1.  `metacall/core:deps`
2.  `metacall/core:dev`
3.  `metacall/core:runtime`
4.  `metacall/core:cli`

To rebuild all images without using cached layers:

### Customizing the Build

The Docker build process can be customized through environment variables:
| Environment Variable | Description | Default |
| --- | --- | --- |
| `METACALL_BASE_IMAGE` | Base OS image | `debian:buster` |
| `METACALL_PATH` | Path to MetaCall source code | `/metacall` |
| `METACALL_BUILD_TYPE` | Build type (debug, release) | `release` |
| `METACALL_INSTALL_OPTIONS` | Dependencies to install | Varies by image |
| `METACALL_BUILD_OPTIONS` | Components to build | Varies by image |
These variables can be set before running the build commands:

## Testing with Docker

MetaCall provides specialized Docker configurations for testing, including support for memory sanitizers and code coverage analysis.

### Running Basic Tests

To build and run tests in Docker:

This command builds the deps and dev images with test configuration and runs the test suite inside the Docker container.

### Running Sanitizer Tests

For detecting memory errors and other issues, MetaCall supports various sanitizers:

These commands build MetaCall with the corresponding sanitizer enabled and run the test suite.

### Running Coverage Analysis

To generate code coverage reports:

This builds MetaCall with coverage instrumentation enabled and runs the test suite, generating coverage reports that can be viewed in HTML format.

## Development Workflow with Docker

Here's a typical development workflow using the MetaCall Docker build system:

### Local Development

When developing locally, you can use Docker volumes to mount your local source code into the Docker container:

This allows you to modify code on your host machine and compile/test it inside the Docker container.

### Using the CLI Image

The CLI image provides a convenient way to run MetaCall commands:

This executes the specified script using MetaCall's polyglot runtime.

## Distribution and Deployment

MetaCall Docker images can be distributed and deployed in various ways.

### Pushing Images to a Registry

To push MetaCall images to a Docker registry:

This pushes all four images (deps, dev, runtime, cli) to the specified registry.

### Versioning Images

To tag images with a specific version:

This creates version-specific tags based on the version in the VERSION file.

### Using Build Caching

To speed up builds by using a remote cache:

This builds images using layers cached in a remote registry, which can significantly improve build times in CI/CD pipelines.

### Creating Distribution Packages

MetaCall can generate distribution packages (deb, rpm, etc.) using Docker:

This builds packages inside the Docker container and copies them to the specified artifacts path.

## Multi-Platform Builds

MetaCall supports building for multiple platforms using Docker's BuildKit:

This builds images for the specified platform, allowing MetaCall to run on different architectures such as ARM64.

## Environment Variables for Docker Images

The following environment variables are used within the Docker containers:
| Variable | Description | Default in Runtime Image |
| --- | --- | --- |
| `LOADER_LIBRARY_PATH` | Path to loader plugins | `/usr/local/lib` |
| `LOADER_SCRIPT_PATH` | Path to scripts | `/usr/local/scripts` |
| `CONFIGURATION_PATH` | Path to configuration | `/usr/local/share/metacall/configurations/global.json` |
| `SERIAL_LIBRARY_PATH` | Path to serial plugins | `/usr/local/lib` |
| `DETOUR_LIBRARY_PATH` | Path to detour plugins | `/usr/local/lib` |
| `PORT_LIBRARY_PATH` | Path to port libraries | `/usr/local/lib` |
| `NODE_PATH` | Path to Node.js modules | `/usr/local/lib/node_modules` |
These variables configure the runtime behavior of MetaCall within the Docker containers.

## Troubleshooting Docker Builds

Common issues when building MetaCall with Docker and their solutions:

1.  **Build fails with dependency errors**:
    - Check if the base image has changed
    - Verify that all required dependencies are included in the build options

2.  **Tests fail in Docker but pass locally**:
    - Environment variables might be different
    - Path issues specific to Docker environment
    - Check if sanitizers are finding issues that don't manifest locally

3.  **Docker builds are slow**:
    - Use the cache option with a properly configured registry
    - Consider optimizing the build options to include only necessary components
