---
title: Loaders
---

# Loaders

Loaders are a fundamental component of the MetaCall system, responsible for loading and executing code from different programming languages. Each loader acts as a bridge between the MetaCall Core and a specific language runtime, enabling cross-language function calls. This document provides a detailed overview of the loader architecture, implementation, and the various language loaders supported by MetaCall.
For information about Ports (which enable using MetaCall from within a specific language), see [Ports](./ports.md).
## Architecture Overview

## Loader Interface

All loaders implement a common interface defined in the loader implementation interface (`loader_impl_interface`). This standardized interface enables MetaCall to interact with various language runtimes in a consistent manner.

### Interface Functions

| Function            | Purpose                                  | Parameters                                                                  | Return Value                      |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------------- | --------------------------------- |
| `initialize`        | Initialize the loader with configuration | `loader_impl impl, configuration config`                                    | Pointer to loader data            |
| `execution_path`    | Add a path to runtime's search paths     | `loader_impl impl, const loader_path path`                                  | 0 on success, non-zero on failure |
| `load_from_file`    | Load code from file(s)                   | `loader_impl impl, const loader_path paths[], size_t size`                  | Handle to loaded code             |
| `load_from_memory`  | Load code from memory buffer             | `loader_impl impl, const loader_name name, const char *buffer, size_t size` | Handle to loaded code             |
| `load_from_package` | Load code from a package                 | `loader_impl impl, const loader_path path`                                  | Handle to loaded code             |
| `clear`             | Unload code                              | `loader_impl impl, loader_handle handle`                                    | 0 on success, non-zero on failure |
| `discover`          | Discover and register functions          | `loader_impl impl, loader_handle handle, context ctx`                       | 0 on success, non-zero on failure |
| `destroy`           | Clean up loader resources                | `loader_impl impl`                                                          | 0 on success, non-zero on failure |

## Loader Manager

The Loader Manager acts as a central coordinator for all loader operations. It:

1.  Loads loader plugins dynamically at runtime based on configuration
2.  Registers loaders with the MetaCall core
3.  Dispatches function calls to the appropriate loader
4.  Manages loader lifecycle

## Supported Loaders

MetaCall includes several language loaders, each implemented as a plugin that can be enabled or disabled during build configuration.

### Node.js Loader

The Node.js loader (`node_loader`) enables loading and executing JavaScript code using Node.js.

The Node.js loader works by:

1.  Starting a Node.js runtime in a separate thread
2.  Loading a bootstrap script (`bootstrap.js`) to set up the environment
3.  Using a trampoline mechanism to handle communication between C++ and JavaScript
4.  Supporting asynchronous function calls with promises
5.  Converting between MetaCall values and JavaScript values using N-API

#### Value Conversion

| MetaCall Type         | JavaScript Type       |
| --------------------- | --------------------- |
| `null`                | `null` or `undefined` |
| `bool`                | `boolean`             |
| `int`/`long`/`double` | `number`              |
| `string`              | `string`              |
| `array`               | `Array`               |
| `map`                 | `Object`              |
| `function`            | `Function`            |
| `future`              | `Promise`             |

### Python Loader

The Python loader (`py_loader`) enables loading and executing Python code.

The Python loader:

1.  Initializes the Python interpreter
2.  Uses the Python C API to interact with Python
3.  Provides special handling for Python dictionaries
4.  Includes threading support for Python
5.  Converts between MetaCall values and Python objects

### Ruby Loader

The Ruby loader (`rb_loader`) enables loading and executing Ruby code.

### C# Loader

The C# loader (`cs_loader`) enables loading and executing C# code using .NET Core.

### TypeScript Loader

The TypeScript loader (`ts_loader`) is built on top of the Node.js loader. It transpiles TypeScript code to JavaScript and then utilizes the Node.js loader for execution.

The TypeScript loader:

1.  Depends on the Node.js loader
2.  Uses TypeScript's compiler API to transpile TypeScript to JavaScript
3.  Provides type information for function discovery
4.  Handles TypeScript-specific language features

### C Loader

The C loader (`c_loader`) enables loading and executing C code at runtime using the Tiny C Compiler.

## Cross-Language Function Calls

## Asynchronous Function Calls

MetaCall supports asynchronous function calls through its future system. This is particularly important for languages like JavaScript that have built-in asynchronous programming models.

## Building and Configuring Loaders

Loaders are built as plugins and can be enabled or disabled using CMake options. Each loader has its own set of dependencies that must be installed on the system.
| Loader | CMake Option | Dependencies |
| --- | --- | --- |
| Node.js | `OPTION_BUILD_LOADERS_NODE` | Node.js development libraries |
| Python | `OPTION_BUILD_LOADERS_PY` | Python development libraries |
| Ruby | `OPTION_BUILD_LOADERS_RB` | Ruby development libraries |
| C# | `OPTION_BUILD_LOADERS_CS` | .NET Core development libraries |
| TypeScript | `OPTION_BUILD_LOADERS_TS` | Node.js loader |
| C | `OPTION_BUILD_LOADERS_C` | TCC, libffi, libclang |
| JavaScript (V8) | `OPTION_BUILD_LOADERS_JS` | V8 libraries |
| JavaScript (SpiderMonkey) | `OPTION_BUILD_LOADERS_JSM` | SpiderMonkey libraries |

## Loader Configuration

Loaders can be configured using the MetaCall configuration system. Configuration options are loader-specific and typically include paths to runtime executables, library paths, and runtime options.

Example configuration for the Node.js loader:

## Creating Custom Loaders

To create a custom loader for a new language, you need to:

1.  Create a new loader module with the required interface functions
2.  Implement value conversion between MetaCall values and language-specific values
3.  Build the loader as a plugin
4.  Register the loader with the loader manager

Here's a simplified outline of a custom loader implementation:

A full implementation would also need to handle value conversion, function discovery, error handling, and proper cleanup of resources.
