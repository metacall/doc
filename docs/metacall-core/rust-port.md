---
title: Rust Port
---

# Rust Port

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [source/ports/rs_port/.devcontainer/devcontainer.json](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/.devcontainer/devcontainer.json)
- [source/ports/rs_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/CMakeLists.txt)
- [source/ports/rs_port/Dockerfile](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/Dockerfile)
- [source/ports/rs_port/build.rs](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/build.rs)
- [source/ports/rs_port/inline/src/lib.rs](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/inline/src/lib.rs)
- [source/ports/rs_port/rust-toolchain](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/rust-toolchain)
- [source/ports/rs_port/src/bindings.rs](https://github.com/metacall/core/blob/af9cad19/source/ports/rs_port/src/bindings.rs)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

The Rust Port provides a Rust language interface to the MetaCall Core, allowing Rust developers to call functions written in other programming languages directly from their Rust applications. This component enables cross-language interoperability, making it possible to integrate code from languages like Python, JavaScript, Ruby, and others into a Rust codebase.

For information about running Rust code from other languages, see [Rust Loader](./rust-loader.md).

## Architecture

The Rust Port architecture consists of three main components:

1.  **FFI Bindings**: Rust bindings to the MetaCall C API generated using bindgen
2.  **Proc Macros**: Macros for embedding code from other languages inline in Rust code
3.  **Build Integration**: Build scripts that configure linking with the MetaCall Core library

### Rust Port System Structure

## FFI Bindings

The Rust Port uses bindgen to generate Rust FFI bindings to the MetaCall C API. These bindings provide unsafe Rust functions that directly map to the C API functions.

Key MetaCall functions exposed through the bindings include:

- `metacall`: For calling functions by name
- `metacall_load_from_file`: For loading code from files
- `metacall_value_*`: Functions for handling MetaCall values

The bindings are automatically generated during the build process by the CMake build system, which invokes bindgen with the MetaCall C header files.

Important characteristics of these bindings:

- **Unsafe API**: All functions are marked with `unsafe` as they involve FFI calls
- **Raw Pointers**: Functions use raw pointers (`*mut c_void`) for data transfer
- **Manual Memory Management**: Caller is responsible for freeing allocated resources
- **C-style API**: Function names and patterns follow the C API conventions

## Proc Macros for Inline Code

The Rust Port includes proc macros that enable embedding code from other languages directly in Rust code. These macros are defined in the `inline` sub-crate and include:

This allows writing code like:

The macro parses the embedded code at compile time and generates the necessary Rust code to load and execute it using MetaCall.

## Build System

The Rust Port uses a hybrid build system combining CMake and Cargo:

### CMake Integration

The CMake configuration:

- Checks if the Rust Port is enabled
- Finds the Rust toolchain
- Generates bindings using bindgen
- Invokes Cargo to build the Rust crate
- Sets up test environment variables

### Cargo Build Script

The Cargo build script (`build.rs`) configures linking against the MetaCall library:

## Function Call Flow

When a function is called through the Rust Port, the following sequence occurs:

## API Overview

The Rust Port provides bindings to the MetaCall Core API, enabling:

- Loading code from other languages
- Calling functions across language boundaries
- Converting values between languages
- Error handling

The bindings are low-level and correspond directly to the C API functions. They require careful memory management and error handling due to their unsafe nature.

For a more detailed description of the underlying API functions, see the [Core API](./core-api.md) page.

## Installation and Usage

### Installation

The Rust Port is included in the MetaCall Core repository and is typically built as part of the overall MetaCall build process. To enable it, you need to configure the build with:

### Basic Usage

Based on the available bindings, usage would involve:

This example demonstrates:

1.  Initializing the MetaCall runtime
2.  Loading a Python script
3.  Creating MetaCall values for arguments
4.  Calling a function
5.  Converting the result
6.  Cleaning up resources

## Testing

The Rust Port includes tests run through Cargo's test framework. The CMake build system sets up the necessary environment variables for the tests:
| Environment Variable | Purpose |
| --- | --- |
| `LOADER_LIBRARY_PATH` | Path to language loaders |
| `LOADER_SCRIPT_PATH` | Path to test scripts |
| `CONFIGURATION_PATH` | Path to MetaCall configuration |
| `PROJECT_LIBRARY_PATH_NAME` | Path to project libraries |
The test environment is also configured to support debugging in VS Code through the generation of `.vscode/.env` and `config.toml` files.

## Docker Development Environment

A Docker environment is provided for development:

The Docker image includes all dependencies needed for building and testing the Rust Port, including:

- Clang and LLVM for bindgen
- Rust toolchain with nightly and clippy components
- MetaCall Core built with appropriate options

## Related Topics

For related information, see:

- [Rust Loader](./rust-loader.md) for loading Rust code from other languages
- [Core API](./core-api.md) for the underlying MetaCall API
- [Port System](./port-system.md) for an overview of MetaCall ports
