---
title: Build Configuration
---

# Build Configuration

## Relevant source files

- [.env](https://github.com/metacall/core/blob/af9cad19/.env)
- [.github/workflows/benchmark.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/benchmark.yml)
- [.github/workflows/clang-format.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/clang-format.yml)
- [.github/workflows/docker-hub.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/docker-hub.yml)
- [.github/workflows/linux-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/linux-test.yml)
- [.github/workflows/macos-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/macos-test.yml)
- [.github/workflows/release.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/release.yml)
- [.github/workflows/windows-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/windows-test.yml)
- [CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/CMakeLists.txt)
- [README.md](https://github.com/metacall/core/blob/af9cad19/README.md)
- [deploy/images/overview.png](https://github.com/metacall/core/blob/af9cad19/deploy/images/overview.png)
- [docker-compose.platform.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.platform.yml)
- [docker-compose.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.yml)
- [docs/README.md](https://github.com/metacall/core/blob/af9cad19/docs/README.md)
- [source/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/CMakeLists.txt)
- [source/loaders/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/CMakeLists.txt)
- [source/scripts/python/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/CMakeLists.txt)
- [source/tests/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/CMakeLists.txt)
- [tools/metacall-benchmarks-merge.py](https://github.com/metacall/core/blob/af9cad19/tools/metacall-benchmarks-merge.py)
- [tools/metacall-build.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.ps1)
- [tools/metacall-build.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.sh)
- [tools/metacall-configure.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.ps1)
- [tools/metacall-configure.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.sh)
- [tools/metacall-environment.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.ps1)
- [tools/metacall-environment.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.sh)
- [tools/metacall-runtime.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-runtime.sh)
- [tools/metacall-sanitizer.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-sanitizer.sh)

This page describes how to configure the MetaCall Core build system to enable different features, language loaders, and build options. It explains the various configuration scripts, available options, and how to customize your build based on your requirements.

For information about build system prerequisites, see [Prerequisites](./prerequisites.md). For Docker-based builds, see [Docker Builds](./docker-builds.md).

## Overview

MetaCall's build configuration system allows you to customize which language runtimes, loaders, and features are included in your build. The configuration process works on multiple platforms (Linux, macOS, Windows) and provides a consistent interface across these environments.

## Configuration Scripts

MetaCall provides platform-specific scripts for configuring the build:

Platform

Script

Linux/macOS

`tools/metacall-configure.sh`

Windows

`tools/metacall-configure.ps1`

These scripts provide a simplified interface to the underlying CMake build system, allowing you to easily enable or disable various features.

### Basic Usage

The configuration scripts accept a list of space-separated options that control what features and language loaders will be included in the build.

## Build Options

### Build Types

MetaCall supports different build types that control optimization and debugging features:

Build Type

Description

`debug`

Debug build with all debug symbols and no optimization

`release`

Release build with optimizations and no debug symbols

`relwithdebinfo`

Release build with optimizations and debug symbols

Example usage:

### Language Support Options

Each supported language has a corresponding build option to enable its loader:

Option

Description

Default

`python`

Enable Python loader

OFF

`ruby`

Enable Ruby loader

OFF

`nodejs`

Enable Node.js loader

OFF

`typescript`

Enable TypeScript loader

OFF

`netcore`

Enable .NET Core 1.x loader

OFF

`netcore2`

Enable .NET Core 2.x loader

OFF

`netcore5`

Enable .NET Core 5.x loader

OFF

`netcore7`

Enable .NET Core 7.x loader

OFF

`java`

Enable Java loader

OFF

`c`

Enable C loader

OFF

`cobol`

Enable COBOL loader

OFF

`file`

Enable File loader

OFF

`rpc`

Enable RPC loader

OFF

`wasm`

Enable WebAssembly loader

OFF

`rust`

Enable Rust loader

OFF

`go`

Enable Go port support (loader not available yet)

OFF

Example usage:

### Component Options

The following options control which components of the MetaCall system are built:

Option

Description

Default

`scripts`

Build script examples

OFF

`examples`

Build example applications

OFF

`tests`

Build and run tests

OFF

`benchmarks`

Build and run benchmarks

OFF

`ports`

Build language ports (frontends)

OFF

`install`

Install after building

OFF

Example usage:

### Advanced Options

MetaCall offers additional advanced build options:

Option

Description

Default

`sandbox`

Enable sandboxing support

OFF

`coverage`

Enable code coverage reporting

OFF

`address-sanitizer`

Build with AddressSanitizer

OFF

`thread-sanitizer`

Build with ThreadSanitizer

OFF

`memory-sanitizer`

Build with MemorySanitizer

OFF

Example usage:

## CMake Configuration

The configuration scripts ultimately generate CMake configuration. The options are translated into CMake variables that configure the build system.

### Direct CMake Configuration

For advanced users, it's possible to configure MetaCall directly using CMake instead of the configuration scripts:

The following table shows common CMake options:

CMake Option

Description

Default

`OPTION_BUILD_TESTS`

Build tests

ON

`OPTION_BUILD_BENCHMARKS`

Build benchmarks

OFF

`OPTION_BUILD_EXAMPLES`

Build examples

ON

`OPTION_BUILD_CLI`

Build CLI tools

ON

`OPTION_BUILD_LOADERS`

Build loaders

ON

`OPTION_BUILD_EXTENSIONS`

Build extensions

ON

`OPTION_BUILD_SCRIPTS`

Build scripts

ON

`OPTION_BUILD_SERIALS`

Build serials

ON

`OPTION_BUILD_DETOURS`

Build detours

ON

`OPTION_BUILD_PORTS`

Build ports

OFF

`OPTION_THREAD_SAFE`

Enable thread safety

OFF

`OPTION_FORK_SAFE`

Enable fork safety

ON

## Platform-Specific Considerations

### Linux/macOS

On Linux and macOS, the configuration process is handled by shell scripts:

The configuration creates a `build` directory with all necessary CMake files.

### Windows

On Windows, the configuration process is handled by PowerShell scripts:

The environment script also creates a `CMakeConfig.txt` file that is used during configuration to set additional platform-specific paths.

## Examples

### Basic Development Build

For a basic development build with Python and Node.js support:

### Comprehensive Development Build

For a development build with multiple language support and testing:

### Production Build

For a production-ready build with optimizations:

## Working with Docker

MetaCall also supports building with Docker, which simplifies the environment setup process. The repository includes `docker-compose.yml` for building in different configurations:

This approach is especially useful for CI/CD environments or when you want to ensure a consistent build environment.

## Configuration Variables

When the build is configured, several environment variables are set that control the runtime behavior of MetaCall:

Variable

Description

Default Value

`LOADER_LIBRARY_PATH`

Path to loader plugins

`${CMAKE_BINARY_DIR}`

`LOADER_SCRIPT_PATH`

Path to scripts

`${CMAKE_BINARY_DIR}/scripts`

`CONFIGURATION_PATH`

Path to configuration file

`${CMAKE_BINARY_DIR}/configurations/global.json`

`SERIAL_LIBRARY_PATH`

Path to serial plugins

`${CMAKE_BINARY_DIR}`

`DETOUR_LIBRARY_PATH`

Path to detour plugins

`${CMAKE_BINARY_DIR}`

`PORT_LIBRARY_PATH`

Path to port libraries

`${CMAKE_BINARY_DIR}`

These variables are automatically set during the build process but can be overridden for custom installations.

## Sanitizer Support

MetaCall supports various sanitizers for debugging and detecting runtime issues:

The sanitizers help identify memory leaks, data races, and other runtime issues during development and testing.

Sources: [tools/metacall-sanitizer.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-sanitizer.sh) [.github/workflows/linux-test.yml45-68](https://github.com/metacall/core/blob/af9cad19/.github/workflows/linux-test.yml#L45-L68)
