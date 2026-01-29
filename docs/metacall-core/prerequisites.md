---
title: Prerequisites
---

# Prerequisites

## Relevant source files

- [CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/CMakeLists.txt)
- [README.md](https://github.com/metacall/core/blob/af9cad19/README.md)
- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [deploy/images/overview.png](https://github.com/metacall/core/blob/af9cad19/deploy/images/overview.png)
- [docker-compose.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.yml)
- [docs/README.md](https://github.com/metacall/core/blob/af9cad19/docs/README.md)
- [source/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/CMakeLists.txt)
- [source/loaders/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/CMakeLists.txt)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [tools/metacall-configure.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.sh)
- [tools/metacall-environment.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.sh)
- [tools/metacall-runtime.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-runtime.sh)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

This page documents the system requirements and dependencies needed to build, install, and run MetaCall Core. It covers required development tools, compilers, language runtimes, and libraries for all supported platforms. For information about configuring the build system after installing prerequisites, see [Build Configuration](./build-configuration.md).

## Base Requirements

MetaCall requires the following base tools on all platforms:

- CMake (>= 3.15)
- Git
- Compiler with C11 and C++11 support
  - GCC (>= 4.9) or Clang (>= 3.4) on Linux/macOS
  - Visual Studio (>= 2015) on Windows

The build process also depends on package managers specific to each platform:

- APT on Debian/Ubuntu
- apk on Alpine Linux
- Homebrew on macOS
- Vcpkg/NuGet on Windows

## Platform-Specific Requirements

MetaCall supports multiple platforms with different setup requirements.

### Linux (Debian/Ubuntu)

On Debian/Ubuntu systems, the following base packages are required:

```
build-essential git cmake wget apt-utils apt-transport-https gnupg dirmngr ca-certificates
```

You can install these with:

### Linux (Alpine)

On Alpine Linux, the following base packages are required:

```
g++ make git cmake wget gnupg ca-certificates
```

You can install these with:

### macOS

On macOS, the following base packages are required and can be installed via Homebrew:

```
llvm cmake git wget gnupg ca-certificates
```

You can install these with:

### Windows

Windows support is provided through the Windows Subsystem for Linux (WSL) or by using Docker containers. Native Windows support is under development.

## Language Runtime Requirements

MetaCall supports multiple programming languages, each with specific version requirements.

### Python

To build with Python support, you need:

```text
*   Python (>= 3.2 <= 3.9)
*   Python development headers
*   pip3

On Debian/Ubuntu:

On Alpine:

On macOS:

### Ruby

To build with Ruby support, you need:

*   Ruby (>= 2.1 <= 2.7)
*   Ruby development headers

On Debian/Ubuntu:

On Alpine:

On macOS:

### NodeJS

To build with NodeJS support, you need:

*   NodeJS (>= 10.22.0 <= 17.x.x)
*   npm

On Debian/Ubuntu:

On Alpine:

On macOS:

### .NET Core

To build with .NET Core support, you need .NET Core SDK/runtime:

For .NET Core 1.x on Debian/Ubuntu:

For .NET Core 2.x, 5.x, or 7.x, the installation process uses Microsoft's package repositories:

### Java

To build with Java support, you need:

*   Java JDK (>= 11)
*   JRE

On Debian/Ubuntu:

On Alpine:

On macOS:

### C Loader

To build with C loader support, you need:

*   libffi
*   clang/LLVM (>= 12)

On Debian/Ubuntu:

On Alpine:

On macOS:

### Rust

To build with Rust support, you need:

*   Rust (nightly-2021-12-04)
*   Additional build tools

On Debian/Ubuntu:

On Alpine:

On macOS:

## Build System Architecture

MetaCall's build system consists of several phases, each with its own prerequisites. The environment setup scripts handle most of these dependencies, but it's useful to understand the overall flow.

## Using the Environment Setup Script

MetaCall provides `metacall-environment.sh` for automatically installing required dependencies. This script accepts parameters to install dependencies for specific loaders:

Available options include:
| Option | Description |
| --- | --- |
| base | Install base build dependencies |
| python | Install Python runtime and development files |
| ruby | Install Ruby runtime and development files |
| netcore | Install .NET Core 1.x runtime |
| netcore2 | Install .NET Core 2.x runtime |
| netcore5 | Install .NET Core 5.x runtime |
| netcore7 | Install .NET Core 7.x runtime |
| nodejs | Install NodeJS runtime and development files |
| typescript | Install TypeScript support |
| java | Install Java JDK and JRE |
| c | Install C loader dependencies (libffi, libclang) |
| cobol | Install GNU Cobol |
| rust | Install Rust (nightly) |
| debug | Build dependencies in debug mode |
| release | Build dependencies in release mode |
Example for a full development environment:

## Dependency Management in Docker

For containerized environments, MetaCall provides Docker configurations in `docker-compose.yml`. These containers manage dependencies in three stages:

1.  **deps**: Installs all development dependencies
2.  **dev**: Builds MetaCall with desired features
3.  **runtime**: Creates a minimal runtime image with only required libraries

## Verifying Prerequisites

After installing prerequisites, you can verify your environment is ready for building MetaCall:

1.  Verify CMake version:

2.  Verify compiler version:

3.  Verify language runtimes (example for Python):


## Setting up Path Environment

MetaCall relies on various environment variables to locate dependencies. The key ones are:
| Variable | Description |
| --- | --- |
| Default Location | LOADER\_LIBRARY\_PATH |
| Directory containing loader plugins | `.` (current directory) |
| LOADER\_SCRIPT\_PATH | Directory containing scripts to be loaded |
| `.` (current directory) | CONFIGURATION\_PATH |
| Global configuration file location | `configurations/global.json` |
| SERIAL\_LIBRARY\_PATH | Directory containing serial plugins |
| `serials` | DETOUR\_LIBRARY\_PATH |
| Directory containing detour plugins | `detours` |
For development, the build directory usually contains all these components. After installation, they are placed in standard system locations.

## Troubleshooting Common Issues

### Missing Dependencies

If you encounter errors about missing libraries or headers, install the specific dependency:

### Version Conflicts

When multiple versions of a dependency are installed, specify the required version in your environment:

### Path Issues

If MetaCall cannot find loaders or scripts, verify environment variables:
```
