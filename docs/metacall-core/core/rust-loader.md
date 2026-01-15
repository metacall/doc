---
title: Rust Loader
---

# Rust Loader

## Relevant source files

- [cmake/FindPatchelf.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindPatchelf.cmake)
- [cmake/FindRust.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindRust.cmake)
- [cmake/InstallGBench.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/InstallGBench.cmake)
- [cmake/InstallGTest.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/InstallGTest.cmake)
- [cmake/InstallLibTCC.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/InstallLibTCC.cmake)
- [cmake/InstallPatchelf.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/InstallPatchelf.cmake)
- [deploy/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/deploy/CMakeLists.txt)
- [source/loaders/c_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/c_loader/CMakeLists.txt)
- [source/loaders/cs_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/cs_loader/CMakeLists.txt)
- [source/loaders/file_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/file_loader/CMakeLists.txt)
- [source/loaders/js_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/js_loader/CMakeLists.txt)
- [source/loaders/jsm_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/jsm_loader/CMakeLists.txt)
- [source/loaders/mock_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/mock_loader/CMakeLists.txt)
- [source/loaders/py_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/CMakeLists.txt)
- [source/loaders/rb_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/CMakeLists.txt)
- [source/loaders/rs_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/CMakeLists.txt)
- [source/loaders/rs_loader/rust/.cargo/config](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/rust/.cargo/config)
- [source/loaders/rs_loader/rust/.vscode/launch.json.in](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/rust/.vscode/launch.json.in)
- [source/loaders/rs_loader/rust/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/rust/CMakeLists.txt)
- [source/loaders/rs_loader/rust/rust-toolchain](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/rust/rust-toolchain)
- [source/loaders/rs_loader/rust/test/file.rs](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/rust/test/file.rs)
- [source/serials/metacall_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/CMakeLists.txt)
- [source/serials/rapid_json_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/CMakeLists.txt)
- [source/tests/metacall_rust_class_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_rust_class_test/CMakeLists.txt)
- [source/tests/metacall_rust_load_from_mem_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_rust_load_from_mem_test/CMakeLists.txt)
- [source/tests/metacall_rust_load_from_package_class_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_rust_load_from_package_class_test/CMakeLists.txt)
- [source/tests/metacall_rust_load_from_package_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_rust_load_from_package_test/CMakeLists.txt)
- [source/tests/metacall_rust_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_rust_test/CMakeLists.txt)

## Overview

The Rust Loader is a component of the MetaCall Core framework that enables loading and executing Rust code from other programming languages. It integrates Rust's performance, safety features, and ecosystem into MetaCall's polyglot environment, allowing cross-language function calls to and from Rust.

For information about the overall MetaCall loader architecture, see [Loader System](./loader-system.md). This document focuses specifically on the Rust Loader's implementation, capabilities, and configuration.

## Current Status

As of the current version, the Rust Loader is marked as out of date and disabled by default. It was originally developed for Rust nightly-2021-12-04 toolchain and requires updating to work with newer Rust compiler versions. It also lacks support for the MUSL toolchain used for static linking.

## Architecture

The Rust Loader implements a split architecture pattern where the interface with MetaCall is written in C, while the actual implementation is written in Rust for better integration with the Rust ecosystem.

### Component Structure

The Rust Loader consists of two primary components:

1.  **rs_loader**: A C library that implements the loader interface required by MetaCall's Loader Manager. It handles the communication between MetaCall and the Rust implementation.
2.  **rs_loader_impl**: A Rust library that contains the actual loader implementation. This component handles compiling, loading, and executing Rust code by interfacing with the Rust toolchain.

### Loading and Execution Flow

The sequence diagram above illustrates how the Rust Loader handles loading and executing Rust code through MetaCall.

## Implementation Details

### Code Loading Methods

The Rust Loader supports three primary methods for loading Rust code:

Method

Function

Description

File

`metacall_load_from_file`

Loads Rust code from .rs source files

Memory

`metacall_load_from_memory`

Loads Rust code provided as a string in memory

Package

`metacall_load_from_package`

Loads a Rust package (Cargo project structure)

### Rust Function Exports

For Rust functions to be accessible from MetaCall, they must be:

1.  Marked with the `#[no_mangle]` attribute to prevent name mangling during compilation
2.  Declared as `pub extern "C"` to use the C calling convention
3.  Use types that can be represented in the C type system or have proper conversions

Example of a properly exported Rust function:

```
#[no_mangle]
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}
```

### Object-Oriented Programming Support

The Rust Loader supports object-oriented programming patterns by mapping Rust structs and their implementations to classes in other languages. This enables:

- Creating instances of Rust structs from other languages
- Calling methods on these instances
- Managing memory and lifetimes appropriately

## Build System

### Rust Toolchain Requirements

The Rust Loader has specific toolchain requirements:

- Uses Rust nightly-2021-12-04 toolchain
- Requires several Rust components:
  - cargo
  - clippy
  - llvm-tools-preview
  - rls
  - rust-analysis
  - rust-analyzer-preview
  - rust-std
  - rustc
  - rustc-dev
  - rustfmt
  - rust-src

### Build Process

The build process for the Rust Loader integrates Cargo builds into the CMake build system:

1.  CMake detects the Rust toolchain using FindRust.cmake
2.  The build type (Debug/Release) determines compilation flags
3.  Cargo is invoked to build the Rust implementation (rs_loader_impl)
4.  On Linux/macOS, patchelf patches the runtime path in the libraries
5.  The built libraries are copied to the output directory

Debug builds produce libraries with a "d" suffix, while release builds produce optimized libraries without the suffix.

### Runtime Dependencies

The Rust Loader requires several runtime dependencies:

- Rust standard library and runtime libraries
- The compiled rs_loader_impl library

These dependencies are installed alongside MetaCall to ensure proper execution of Rust code at runtime.

## Configuration and Debugging

### Environment Variables

The Rust Loader uses several environment variables that aid in development and debugging:

Environment Variable

Purpose

RUST_BACKTRACE=1

Enables full backtrace for Rust panics

RUST_LOG=INFO

Sets the logging level for Rust code

These variables help with debugging Rust code loaded through MetaCall.

### Build Options

The Rust Loader can be enabled or disabled in the MetaCall build through the CMake option `OPTION_BUILD_LOADERS_RS`. When disabled, components that depend on the Rust Loader will also be disabled.

## Limitations and Future Work

### Current Limitations

1.  **Outdated Toolchain**: Requires an outdated nightly Rust toolchain (2021-12-04)
2.  **No MUSL Support**: Doesn't support the MUSL toolchain for static linking
3.  **Limited Type Conversion**: May not support all possible type conversions between Rust and other languages

### Future Improvements

Potential areas for improvement include:

1.  Updating to support modern Rust toolchains
2.  Adding MUSL support for static linking
3.  Expanding type conversion capabilities
4.  Supporting more Rust features like async/await
5.  Optimizing the build process

Sources: [source/loaders/rs_loader/CMakeLists.txt7-17](https://github.com/metacall/core/blob/af9cad19/source/loaders/rs_loader/CMakeLists.txt#L7-L17)
