---
title: Loader System
---

# Loader System

The Loader System is a core component of MetaCall that enables loading, executing, and interoperating with code written in different programming languages. This system acts as a bridge between the MetaCall core and language-specific runtimes (such as Python, Node.js, Ruby), providing standardized mechanisms to load code and invoke functions across language boundaries.
For information about how the Loader System is used by ports, see [Port System](./port-system.md).

## Architecture Overview

The Loader System follows a modular architecture where a central Loader Manager coordinates with various language-specific loaders.

## Loader Interface

Each language-specific loader implements a common interface defined by the `loader_impl_interface` structure. This interface provides a standard set of operations that all loaders must support.

### Interface Methods

| Method              | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| `initialize`        | Sets up the loader with required configuration and initializes the language runtime |
| `execution_path`    | Defines a path where scripts can be loaded from                                     |
| `load_from_file`    | Loads code from files on disk                                                       |
| `load_from_memory`  | Loads code from a buffer in memory                                                  |
| `load_from_package` | Loads code from a package (specific to each language, e.g., DLLs for C#)            |
| `clear`             | Unloads code previously loaded                                                      |
| `discover`          | Discovers function signatures and types from loaded code                            |
| `destroy`           | Cleans up and destroys the loader                                                   |

## Loading Process

The loading process involves several key steps that bridge between the language-agnostic MetaCall API and language-specific runtimes.

## Language-Specific Loaders

Each loader implements language-specific mechanisms to initialize the runtime, load code, and bridge between MetaCall's value system and the language's native types.

### Python Loader (py_loader)

The Python loader initializes a Python interpreter, loads Python scripts, and provides bidirectional conversion between Python objects and MetaCall values.

Key features:

- Thread-safe Python interpreter access
- Support for Python modules and packages
- Type conversion between Python and MetaCall
- Supports both Python 2 and Python 3
- Support for async/await via asyncio

### Node.js Loader (node_loader)

The Node.js loader creates a Node.js runtime environment, loads JavaScript code, and handles asynchronous operations using Node.js event loop.

Key features:

- Bootstrap system to initialize Node.js
- JavaScript parsing for function discovery
- Promise support for async operations
- N-API integration for stable interface
- Support for JavaScript modules

The Node.js loader is particularly complex as it needs to maintain its own thread to run the Node.js event loop:

### Other Loaders

The Loader System includes several other language loaders, each with similar architecture but specialized for their language runtime:

- **Ruby Loader (rb_loader)**: Integrates with the Ruby interpreter
- **C# Loader (cs_loader)**: Uses CoreCLR to run .NET code
- **TypeScript Loader (ts_loader)**: Transpiles TypeScript to JavaScript and uses the Node.js loader
- **C Loader (c_loader)**: Compiles C code at runtime using TCC
- **JavaScript V8 Loader (js_loader)**: Uses V8 directly without Node.js

## Function Call Process

Once code is loaded, the Loader System provides mechanisms to discover and call functions across language boundaries.

## Value Type System

A critical aspect of the Loader System is the bidirectional conversion between MetaCall's value system and each language's native types.

## Asynchronous Support

The Loader System provides support for asynchronous programming models, allowing for non-blocking function calls across languages.

## Loader Lifecycle

Each loader follows a standard lifecycle from initialization to destruction.

## Build System Integration

Each loader is built as a separate plugin module that can be loaded at runtime by MetaCall.

## Summary

The Loader System is a versatile and extensible component of MetaCall that enables cross-language interoperability. By providing a common interface implemented by language-specific loaders, it allows seamless function calls across different programming languages. Each loader handles the complexities of initializing language runtimes, loading code, and converting between value types, presenting a unified interface to the MetaCall core.
