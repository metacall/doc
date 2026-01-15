---
title: Node.js Port
---

# Node.js Port

## Relevant source files

- [cmake/FindMetaCall.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindMetaCall.cmake)
- [source/loaders/node_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/CMakeLists.txt)
- [source/loaders/node_loader/include/node_loader/node_loader_port.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_port.h)
- [source/loaders/ts_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/CMakeLists.txt)
- [source/ports/node_port/.gitignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.gitignore)
- [source/ports/node_port/.npmignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.npmignore)
- [source/ports/node_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/CMakeLists.txt)
- [source/ports/node_port/LICENSE](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/LICENSE)
- [source/ports/node_port/README.md](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/README.md)
- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/ports/node_port/package-lock.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package-lock.json)
- [source/ports/node_port/package.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package.json)
- [source/ports/node_port/test/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/test/index.js)
- [source/reflect/include/reflect/reflect_value.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_value.h)
- [source/reflect/source/reflect_value.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value.c)
- [source/scripts/node/gram/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/node/gram/CMakeLists.txt)
- [source/scripts/node/gram/source/gram/package-lock.json](https://github.com/metacall/core/blob/af9cad19/source/scripts/node/gram/source/gram/package-lock.json)
- [source/scripts/python/function/source/function.py](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/function/source/function.py)
- [source/scripts/typescript/templating/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/typescript/templating/CMakeLists.txt)
- [source/tests/memcheck/valgrind-suppressions.sh](https://github.com/metacall/core/blob/af9cad19/source/tests/memcheck/valgrind-suppressions.sh)
- [source/tests/metacall_function_test/source/metacall_function_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_function_test/source/metacall_function_test.cpp)
- [source/tests/metacall_node_port_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_port_test/CMakeLists.txt)
- [source/tests/metacall_node_reentrant_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_reentrant_test/CMakeLists.txt)
- [source/tests/metacall_python_open_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_open_test/CMakeLists.txt)
- [source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp)

This document describes the Node.js Port for MetaCall, a component that enables Node.js applications to call functions from other programming languages through MetaCall's foreign function interface. The Node.js Port provides a familiar JavaScript API for Node.js developers to seamlessly integrate with code written in Python, Ruby, C#, and other languages supported by MetaCall.

For information about how language ports work in general, see [Port System](./port-system.md).

## Architecture Overview

The Node.js Port serves as a bridge between Node.js applications and the MetaCall Core. It exposes MetaCall's functionality through a module that can be imported using Node.js's standard `require` function.

## Installation and Setup

The Node.js Port is available as an npm package named `metacall`. It can be installed as follows:

However, this requires the MetaCall Core library to be installed on your system. The port will search for the library in standard locations or use the path specified by the `METACALL_INSTALL_PATH` environment variable.

### Library Detection Process

The Node.js Port uses a sophisticated mechanism to locate the MetaCall Core library:

## Initialization Process

The Node.js Port has two initialization modes:

1.  **Node Loader Mode**: When imported from within MetaCall runtime (via node_loader)
2.  **Standalone Mode**: When imported directly from Node.js

## API Reference

The Node.js Port exposes the following core functions from MetaCall:

Function

Description

`metacall(name, ...args)`

Call a function by name with arguments

`metacallfms(name, buffer)`

Call a function by name with a JSON string representing arguments

`metacall_await(name, ...args)`

Call a function by name and await its result (for async functions)

`metacall_load_from_file(tag, paths)`

Load code from specified files with a language tag

`metacall_load_from_memory(tag, code)`

Load code from a string with a language tag

`metacall_load_from_package(tag, pkg)`

Load code from a package with a language tag

`metacall_load_from_configuration(path)`

Load code from a MetaCall configuration file

`metacall_inspect()`

Get reflection data about all loaded functions

### Function Details

#### metacall

Calls a function by name with the provided arguments. The function must have been previously loaded into the MetaCall runtime.

#### metacall_load_from_file

Loads code from files. The `tag` parameter indicates the language (e.g., 'py' for Python, 'rb' for Ruby).

## Require Override

One of the most powerful features of the Node.js Port is its extension of Node.js's `require` function. This allows developers to directly import modules written in other languages using familiar syntax.

### Language Tags and Extensions

The Node.js Port supports the following language tags and file extensions:

Language

Tag

File Extensions

Python

'py'

.py

Ruby

'rb'

.rb

C#

'cs'

.cs, .vb, .dll

TypeScript

'ts'

.ts, .jsx, .tsx

Rust

'rs'

.rs, .rlib

Mock (for testing)

'mock'

.mock

C

'c'

.c

Cobol

'cob'

.cob, .cbl, .cpy

WebAssembly

'wasm'

.wat, .wasm

## Usage Examples

### Basic Usage

### Using Require Override

### Loading Python Modules

## Internal Implementation

The Node.js Port consists of several key components:

1.  **Library Detection**: Functions to locate the MetaCall library on different platforms
2.  **Initialization Logic**: Code to initialize the port correctly in different contexts
3.  **API Bindings**: JavaScript functions that wrap the native C API
4.  **Require Override**: Extension of the Node.js require system

### Native Binding

The Node.js Port communicates with the MetaCall Core through a native addon (`node_loader_port_module`). In standalone mode, it dynamically loads the MetaCall library using Node.js's `process.dlopen` function.

## Environment Variables

The Node.js Port recognizes the following environment variables:

Variable

Description

`METACALL_INSTALL_PATH`

Custom path to the MetaCall library

`NODE_ENV`

When set to 'debug', enables debug logs

## Callbacks and Function Passing

The Node.js Port supports passing JavaScript functions as callbacks to functions in other languages, and vice versa. This allows for powerful integration scenarios:

## Distribution and Packaging

The Node.js Port is distributed as an npm package. The package structure is defined in `package.json` and includes:

- Main entry point: `index.js`
- TypeScript type definitions: `index.d.ts`
- License: Apache-2.0
- Keywords for npm search

## Build and Test

The Node.js Port is built as part of the MetaCall project using CMake. Tests verify functionality including:

- Loading code from different languages
- Calling functions across language boundaries
- Passing callbacks between languages
- Handle the overridden require function

## Limitations and Known Issues

- Type conversion between languages has some limitations, particularly with complex types
- Some language-specific features may not be fully supported across boundaries
- Class instantiation and object method calls have limited support

Sources: [source/ports/node_port/test/index.js324-329](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/test/index.js#L324-L329)
