---
title: Build System
---

# Build System

## Relevant source files

- [CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/CMakeLists.txt)
- [README.md](https://github.com/metacall/core/blob/af9cad19/README.md)
- [deploy/images/overview.png](https://github.com/metacall/core/blob/af9cad19/deploy/images/overview.png)
- [docker-compose.cache.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.cache.yml)
- [docker-compose.sh](https://github.com/metacall/core/blob/af9cad19/docker-compose.sh)
- [docker-compose.test.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.test.yml)
- [docker-compose.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.yml)
- [docs/README.md](https://github.com/metacall/core/blob/af9cad19/docs/README.md)
- [source/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/CMakeLists.txt)
- [source/loaders/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/CMakeLists.txt)
- [tools/metacall-configure.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.sh)
- [tools/metacall-environment.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.sh)
- [tools/metacall-runtime.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-runtime.sh)

The MetaCall build system provides a flexible and comprehensive way to build, test, and package the MetaCall Core across different platforms. This document explains the architecture and usage of the build system, including environment setup, configuration options, and build workflows for both local development and Docker-based builds.

For information about the overall architecture of MetaCall, see [Architecture](./architecture.md).

## Overview

MetaCall's build system is designed to handle the complexity of building a polyglot runtime that supports multiple programming languages and platforms. It consists of several components that work together to provide a seamless build experience.

## Key Components

The build system consists of the following key components:

### Environment Scripts

Environment scripts are responsible for setting up dependencies required to build MetaCall. The main script is `metacall-environment.sh`, which installs language runtimes and other dependencies based on command-line options.

Key features of the environment scripts:

- Platform detection (Linux, macOS)
- Linux distribution detection (Debian, Ubuntu, Alpine)
- Installation of build dependencies
- Installation of language-specific dependencies (Python, Ruby, NodeJS, etc.)

Example usage:

This would install dependencies for Python, NodeJS, and Ruby loaders.

### Configuration Scripts

The configuration script `metacall-configure.sh` is used to configure the CMake build system based on command-line options. It sets various build options like which language loaders to build, build type (Debug/Release), and whether to build tests, examples, etc.

Example usage:

This would configure the CMake build system to build Python, NodeJS, and Ruby loaders.

### CMake Build System

MetaCall uses CMake as its primary build system. The main `CMakeLists.txt` file defines the overall project structure, build options, and targets.

Key aspects of the CMake build system:

- Project configuration options
- Dependency management
- Build targets for libraries, loaders, and executables
- Testing and packaging

### Docker Build System

For containerized building and testing, MetaCall provides a Docker-based build system using Docker Compose. This allows for consistent builds across different environments and simplifies the setup process.

The Docker build system consists of several services:

1.  `deps` - Base image with all dependencies
2.  `dev` - Development image with the MetaCall source code and build artifacts
3.  `runtime` - Runtime image with only the necessary files to run MetaCall
4.  `cli` - Command-line interface image for running MetaCall

## Build Workflow

### Local Build Workflow

The typical workflow for building MetaCall locally follows these steps:

### Docker Build Workflow

For Docker-based builds, the workflow uses the `docker-compose.sh` script:

## Build Configuration Options

MetaCall provides numerous configuration options to customize the build. These options are passed to the `metacall-configure.sh` script.

### Build Types

- `debug` - Build with debug symbols and no optimization
- `release` - Build with optimization and no debug symbols
- `relwithdebinfo` - Build with both optimization and debug symbols

### Language Support Options

- `python` - Build with Python loader support
- `ruby` - Build with Ruby loader support
- `nodejs` - Build with NodeJS loader support
- `typescript` - Build with TypeScript loader support
- `v8` - Build with V8 JavaScript engine support
- `netcore` - Build with .NET Core support
- `netcore2` - Build with .NET Core 2 support
- `netcore5` - Build with .NET Core 5 support
- `netcore7` - Build with .NET Core 7 support
- `java` - Build with Java support
- `c` - Build with C loader support
- `cobol` - Build with COBOL support
- `rust` - Build with Rust support

### Additional Options

- `tests` - Build and run tests
- `examples` - Build examples
- `scripts` - Build scripts
- `benchmarks` - Build benchmarks
- `ports` - Build language ports
- `sandbox` - Build with sandboxing support
- `coverage` - Build with code coverage support
- `address-sanitizer` - Build with address sanitizer
- `thread-sanitizer` - Build with thread sanitizer
- `memory-sanitizer` - Build with memory sanitizer

## CMake Integration

The `metacall-configure.sh` script generates CMake build options based on the command-line arguments and passes them to CMake. These options control which components are built and how they are configured.

The key CMake options include:
| Option | Description | Default |
| --- | --- | --- |
| `BUILD_SHARED_LIBS` | Build shared libraries instead of static | ON |
| `OPTION_BUILD_TESTS` | Build tests | ON |
| `OPTION_BUILD_BENCHMARKS` | Build benchmarks | OFF |
| `OPTION_BUILD_EXAMPLES` | Build examples | ON |
| `OPTION_BUILD_CLI` | Build command line interface | ON |
| `OPTION_BUILD_LOADERS` | Build loaders | ON |
| `OPTION_BUILD_EXTENSIONS` | Build extensions | ON |
| `OPTION_BUILD_SCRIPTS` | Build scripts | ON |
| `OPTION_BUILD_SERIALS` | Build serials | ON |
| `OPTION_BUILD_DETOURS` | Build detours | ON |
| `OPTION_BUILD_PORTS` | Build ports | OFF |
| `OPTION_COVERAGE` | Enable coverage | OFF |

## Language Loader Configuration

Language loaders in MetaCall require specific configuration to locate their runtime dependencies. The build system generates loader-specific configuration files based on the installed dependencies.

The loader configuration works through a set of CMake macros:

- `loader_configuration_begin(TARGET)` - Begin configuration for a loader
- `loader_configuration_deps(LIBRARY PATHS...)` - Define library dependencies
- `loader_configuartion_end()` - Finalize the configuration

These macros generate JSON configuration files that tell MetaCall where to find loader dependencies at runtime.

## Docker Build System

The Docker build system uses a multi-stage approach to create efficient images:

1.  `deps` stage: Installs all dependencies required for building
2.  `dev` stage: Builds MetaCall from source
3.  `runtime` stage: Creates a minimal runtime image
4.  `cli` stage: Creates a CLI image for command-line usage

The Docker build system is managed through the `docker-compose.sh` script, which provides the following commands:

- `build` - Build all Docker images
- `rebuild` - Rebuild Docker images without using cache
- `test` - Build and run tests in Docker
- `test-address-sanitizer` - Run tests with address sanitizer
- `test-thread-sanitizer` - Run tests with thread sanitizer
- `test-memory-sanitizer` - Run tests with memory sanitizer
- `coverage` - Build and run tests with coverage
- `pack` - Create distribution packages

## Building for Different Platforms

MetaCall supports building on different platforms, primarily Linux and macOS. The build system automatically detects the platform and adapts the build process accordingly.

### Linux Build

On Linux, the build system detects the distribution (Debian, Ubuntu, Alpine) and installs the appropriate dependencies. It also sets up the correct build flags for the platform.

### macOS Build

On macOS, the build system uses Homebrew to install dependencies and sets up the correct build flags for macOS. It also includes specific workarounds for macOS-specific issues.

## Continuous Integration

MetaCall uses GitHub Actions for continuous integration. The Docker build system is used to ensure consistent builds across different environments.

The CI process includes:

1.  Building the Docker images
2.  Running tests with various sanitizers
3.  Code coverage analysis
4.  Creating distribution packages

## Conclusion

The MetaCall build system provides a flexible and robust way to build, test, and package the MetaCall Core. It supports multiple platforms, languages, and build configurations, making it possible to customize the build process to specific needs.

For more information on using MetaCall, see [Overview](./overview.md) and [Architecture](./architecture.md).
