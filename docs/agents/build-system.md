---
title: Build System
description: Overview of how MetaCall Core is built, configured, tested, and packaged across platforms.
sidebar_position: 4
---

# Build System

## Overview

MetaCall Core uses a flexible build system designed to support:

- multiple operating systems (Linux, macOS, Windows)
- multiple language runtimes (Python, Node.js, Ruby, etc.)
- multiple workflows (local builds, Docker builds, CI builds)

The build system combines:

- environment setup scripts (install dependencies)
- configuration scripts (generate build settings)
- CMake (core build tool)
- Docker Compose (reproducible container builds)

For the overall MetaCall runtime design, see [Architecture](./architecture.md).

---

## Key Concepts

### Environment Setup

A step that installs required system dependencies and language runtimes needed for the loaders you want to build.

### Configuration

A step that selects:

- build type (debug/release)
- loaders to enable
- components like tests/examples/ports

### CMake Build

The compilation step that builds libraries, loaders, tools, and optional components.

### Docker Build

A container-based workflow used for consistent builds and CI execution.

---

## Main Components

## Environment Scripts

Environment scripts prepare the system by installing dependencies needed to build MetaCall.

Typical responsibilities include:

- platform detection (Linux/macOS/Windows)
- distribution detection on Linux (Debian/Ubuntu/Alpine)
- installing compilers and build tools
- installing language-specific dependencies (Python, Ruby, Node.js, etc.)

---

## Configuration Scripts

Configuration scripts translate simple command-line options into CMake configuration.

They typically control:

- build type (debug/release)
- which loaders are enabled
- whether tests/examples/benchmarks are built

For detailed option lists, see [Build Configuration](./build-configuration.md).

---

## CMake Build System

MetaCall uses CMake as the primary build system.

CMake handles:

- project configuration options
- dependency checks and integration
- building targets (core libraries, loaders, tools)
- enabling/disabling optional components

---

## Docker Build System

MetaCall also supports Docker-based builds to ensure consistent environments across machines and CI.

The Docker workflow is typically organized into multiple services/stages such as:

1. `deps` — base image with build dependencies installed
2. `dev` — development build image with compiled artifacts
3. `runtime` — minimal runtime image
4. `cli` — image focused on command-line usage

For details, see [Docker Builds](./docker-builds.md).

---

## Build Workflows

## Local Build Workflow (High Level)

A typical local workflow looks like:

1. Install prerequisites (compiler, CMake, language runtimes)
2. Configure the build (select loaders and features)
3. Build the project
4. Run tests (optional)
5. Install (optional)

---

## Docker Build Workflow (High Level)

A typical Docker workflow looks like:

1. Build dependency image(s)
2. Build MetaCall inside the container
3. Run tests inside the container
4. Produce runtime/CLI images if needed

Docker workflows are commonly used when:

- you want reproducible builds
- you want CI parity locally
- you want to avoid host dependency issues

---

## Build Configuration Options (Summary)

MetaCall build configuration commonly includes:

### Build Types

- `debug`
- `release`
- `relwithdebinfo`

### Language Loader Options

Examples include:

- `python`
- `nodejs`
- `ruby`
- `typescript`
- `netcore`, `netcore2`, `netcore5`, `netcore7`
- `java`
- `c`
- `cobol`
- `rust`

### Additional Options

Examples include:

- `tests`
- `examples`
- `scripts`
- `benchmarks`
- `ports`
- `sandbox`
- `coverage`
- `address-sanitizer`
- `thread-sanitizer`
- `memory-sanitizer`

For the full meaning and usage of these flags, see [Build Configuration](./build-configuration.md).

---

## CMake Integration (What Configuration Scripts Generate)

Configuration scripts typically map user flags into CMake options.

Common CMake options include:

| Option                    | Description                              | Default |
| ------------------------- | ---------------------------------------- | ------- |
| `BUILD_SHARED_LIBS`       | Build shared libraries instead of static | ON      |
| `OPTION_BUILD_TESTS`      | Build tests                              | ON      |
| `OPTION_BUILD_BENCHMARKS` | Build benchmarks                         | OFF     |
| `OPTION_BUILD_EXAMPLES`   | Build examples                           | ON      |
| `OPTION_BUILD_CLI`        | Build command line interface             | ON      |
| `OPTION_BUILD_LOADERS`    | Build loaders                            | ON      |
| `OPTION_BUILD_EXTENSIONS` | Build extensions                         | ON      |
| `OPTION_BUILD_SCRIPTS`    | Build scripts                            | ON      |
| `OPTION_BUILD_SERIALS`    | Build serials                            | ON      |
| `OPTION_BUILD_DETOURS`    | Build detours                            | ON      |
| `OPTION_BUILD_PORTS`      | Build ports                              | OFF     |
| `OPTION_COVERAGE`         | Enable coverage                          | OFF     |

---

## Loader Configuration (Runtime Dependency Discovery)

Language loaders often require runtime-specific libraries and paths.

The build system can generate loader configuration outputs so MetaCall knows where to find loader dependencies at runtime.

This is typically done through build macros that:

- begin a loader configuration block
- define runtime library dependencies and paths
- finalize and emit configuration metadata

The result is commonly a JSON-style configuration describing loader runtime paths.

---

## Building Across Platforms

MetaCall supports building across multiple platforms.

### Linux

On Linux, the build system may:

- detect the distribution (Debian/Ubuntu/Alpine)
- install the correct packages for dependencies
- configure platform-specific flags automatically

### macOS

On macOS, the build system often:

- installs dependencies via Homebrew
- applies platform-specific flags or workarounds when needed

### Windows

On Windows, the build system typically:

- uses PowerShell scripts for configuration
- integrates with Windows toolchains and paths

---

## Continuous Integration (CI)

MetaCall uses CI workflows to validate builds across environments.

Common CI steps include:

1. build (often using Docker for consistency)
2. run tests (including sanitizer builds when enabled)
3. run coverage reporting (optional)
4. package artifacts (optional)

---

## Common Mistakes / Debugging

### “Build succeeds but runtime cannot load a language”

Cause:

- the loader was not enabled during configuration.

Fix:

- reconfigure and enable the loader (example: `python`, `nodejs`, etc.)

### “Docker build works but local build fails”

Cause:

- missing dependencies on host system.

Fix:

- verify prerequisites are installed, or use Docker builds for consistency.

### “Tests fail only in CI”

Cause:

- toolchain differences, missing runtime packages, or stricter build flags.

Fix:

- reproduce using Docker builds and enable debug output.

---

## Related

- [Architecture](./architecture.md)
- [Build Configuration](./build-configuration.md)
- [Docker Builds](./docker-builds.md)
- [Overview](./overview.md)
