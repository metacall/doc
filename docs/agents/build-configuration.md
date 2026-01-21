---
title: Build Configuration
description: How to configure MetaCall Core builds (loaders, components, build type, sanitizers) using scripts or CMake.
sidebar_position: 3
---

# Build Configuration

## Overview

MetaCall Core can be built with different configurations depending on your needs.

You can control:

- **Build type** (debug vs release)
- Which **language loaders** are enabled (Python, Node.js, Ruby, etc.)
- Which **components** are included (tests, examples, ports, benchmarks)
- Optional developer features (coverage, sanitizers)

For prerequisites and dependencies, see [Prerequisites](./prerequisites.md).  
For container-based builds, see [Docker Builds](./docker-builds.md).

---

## Key Concepts

### Configuration Script

MetaCall provides wrapper scripts that configure the build by translating simple options into CMake settings.

### Build Type

A build mode that controls optimization and debugging symbols.

### Loader Option

A flag that enables a specific language runtime integration.

### Component Option

A flag that enables optional parts of the project (tests, examples, etc.).

---

## Recommended Configuration Flow

A typical build configuration flow is:

1. Run a **configure script** with options (build type + loaders + components)
2. Build using the build script or your build system
3. Run tests (optional)
4. Install (optional)

---

## Configuration Scripts

MetaCall provides platform-specific configuration scripts:

| Platform    | Script                         |
| ----------- | ------------------------------ |
| Linux/macOS | `tools/metacall-configure.sh`  |
| Windows     | `tools/metacall-configure.ps1` |

These scripts accept **space-separated options**.

---

## Build Types

MetaCall supports the following build types:

| Build Type       | Description                                       |
| ---------------- | ------------------------------------------------- |
| `debug`          | Debug build with symbols and minimal optimization |
| `release`        | Optimized build for production usage              |
| `relwithdebinfo` | Optimized build but keeps debug symbols           |

---

## Language Loader Options

Each supported language has a corresponding option to enable its loader.

| Option       | Description                                              | Default |
| ------------ | -------------------------------------------------------- | ------- |
| `python`     | Enable Python loader                                     | OFF     |
| `ruby`       | Enable Ruby loader                                       | OFF     |
| `nodejs`     | Enable Node.js loader                                    | OFF     |
| `typescript` | Enable TypeScript loader                                 | OFF     |
| `netcore`    | Enable .NET Core 1.x loader                              | OFF     |
| `netcore2`   | Enable .NET Core 2.x loader                              | OFF     |
| `netcore5`   | Enable .NET Core 5.x loader                              | OFF     |
| `netcore7`   | Enable .NET Core 7.x loader                              | OFF     |
| `java`       | Enable Java loader                                       | OFF     |
| `c`          | Enable C loader                                          | OFF     |
| `cobol`      | Enable COBOL loader                                      | OFF     |
| `file`       | Enable File loader                                       | OFF     |
| `rpc`        | Enable RPC loader                                        | OFF     |
| `wasm`       | Enable WebAssembly loader                                | OFF     |
| `rust`       | Enable Rust loader                                       | OFF     |
| `go`         | Enable Go port support (loader may not be available yet) | OFF     |

---

## Component Options

These options control which parts of MetaCall are built:

| Option       | Description                      | Default |
| ------------ | -------------------------------- | ------- |
| `scripts`    | Build script examples            | OFF     |
| `examples`   | Build example applications       | OFF     |
| `tests`      | Build and run tests              | OFF     |
| `benchmarks` | Build and run benchmarks         | OFF     |
| `ports`      | Build language ports (frontends) | OFF     |
| `install`    | Install after building           | OFF     |

---

## Advanced Options

MetaCall provides advanced build options for debugging and analysis:

| Option              | Description                    | Default |
| ------------------- | ------------------------------ | ------- |
| `sandbox`           | Enable sandboxing support      | OFF     |
| `coverage`          | Enable code coverage reporting | OFF     |
| `address-sanitizer` | Build with AddressSanitizer    | OFF     |
| `thread-sanitizer`  | Build with ThreadSanitizer     | OFF     |
| `memory-sanitizer`  | Build with MemorySanitizer     | OFF     |

---

## Direct CMake Configuration (Advanced)

The configuration scripts generate a CMake configuration internally.

If you want full control, you can configure MetaCall directly with CMake.

Common CMake options include:

| CMake Option              | Description          | Default |
| ------------------------- | -------------------- | ------- |
| `OPTION_BUILD_TESTS`      | Build tests          | ON      |
| `OPTION_BUILD_BENCHMARKS` | Build benchmarks     | OFF     |
| `OPTION_BUILD_EXAMPLES`   | Build examples       | ON      |
| `OPTION_BUILD_CLI`        | Build CLI tools      | ON      |
| `OPTION_BUILD_LOADERS`    | Build loaders        | ON      |
| `OPTION_BUILD_EXTENSIONS` | Build extensions     | ON      |
| `OPTION_BUILD_SCRIPTS`    | Build scripts        | ON      |
| `OPTION_BUILD_SERIALS`    | Build serials        | ON      |
| `OPTION_BUILD_DETOURS`    | Build detours        | ON      |
| `OPTION_BUILD_PORTS`      | Build ports          | OFF     |
| `OPTION_THREAD_SAFE`      | Enable thread safety | OFF     |
| `OPTION_FORK_SAFE`        | Enable fork safety   | ON      |

---

## Platform-Specific Notes

### Linux/macOS

On Linux and macOS, configuration is handled by shell scripts and typically produces a `build/` directory containing generated CMake files.

### Windows

On Windows, configuration is handled by PowerShell scripts.

Some configurations may generate helper files (for example, to store platform-specific paths).

---

## Runtime Configuration Variables

After configuration/build, MetaCall may set environment variables that control runtime behavior:

| Variable              | Description                | Default Value                                    |
| --------------------- | -------------------------- | ------------------------------------------------ |
| `LOADER_LIBRARY_PATH` | Path to loader plugins     | `${CMAKE_BINARY_DIR}`                            |
| `LOADER_SCRIPT_PATH`  | Path to scripts            | `${CMAKE_BINARY_DIR}/scripts`                    |
| `CONFIGURATION_PATH`  | Path to configuration file | `${CMAKE_BINARY_DIR}/configurations/global.json` |
| `SERIAL_LIBRARY_PATH` | Path to serial plugins     | `${CMAKE_BINARY_DIR}`                            |
| `DETOUR_LIBRARY_PATH` | Path to detour plugins     | `${CMAKE_BINARY_DIR}`                            |
| `PORT_LIBRARY_PATH`   | Path to port libraries     | `${CMAKE_BINARY_DIR}`                            |

These values are usually set automatically but can be overridden for custom installations.

---

## Common Mistakes / Debugging

### “Language loader is missing at runtime”

Cause:

- The loader was not enabled during configuration.

Fix:

- Reconfigure the build and include the loader option (example: `python`, `nodejs`, etc.).

### “Build works locally but fails in CI”

Cause:

- Missing dependencies or different toolchain versions.

Fix:

- Ensure prerequisites are installed and match the CI environment.
- Consider using Docker builds for reproducible environments.

### “Sanitizer build fails”

Cause:

- Sanitizers depend on compiler/toolchain support.

Fix:

- Use a supported compiler and run a clean build directory before reconfiguring.

---

## Related

- [Prerequisites](./prerequisites.md)
- [Docker Builds](./docker-builds.md)
