---
title: Port System
---

# Port System

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [cmake/FindMetaCall.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindMetaCall.cmake)
- [source/loaders/node_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/CMakeLists.txt)
- [source/loaders/node_loader/include/node_loader/node_loader_port.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_port.h)
- [source/loaders/ts_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/CMakeLists.txt)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/node_port/.gitignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.gitignore)
- [source/ports/node_port/.npmignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.npmignore)
- [source/ports/node_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/CMakeLists.txt)
- [source/ports/node_port/LICENSE](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/LICENSE)
- [source/ports/node_port/README.md](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/README.md)
- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/ports/node_port/package-lock.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package-lock.json)
- [source/ports/node_port/package.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package.json)
- [source/ports/node_port/test/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/test/index.js)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
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
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

The Port System in MetaCall provides language-specific interfaces that allow developers to use MetaCall's cross-language function call capabilities naturally from their preferred programming language. Ports act as bridges between the MetaCall Core and various programming language environments, enabling seamless integration of MetaCall functionality into applications written in languages like Node.js, Python, Ruby, Rust, and others.

For information about implementing custom loaders for language support, see [Creating Custom Loaders](./creating-custom-loaders.md).

## Port System Overview

The Port System serves as an adapter layer that translates between a specific programming language's conventions and MetaCall's internal API. Unlike loaders which enable MetaCall to execute code in different languages, ports allow developers to use MetaCall from different languages.

- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)

## Port System Architecture

Each port follows a similar architectural pattern but with language-specific implementations. The primary components of a port include:

1.  **Core API Bindings**: Wrappers around the MetaCall C API functions
2.  **Type Conversion Layer**: Converts between language-specific types and MetaCall's value system
3.  **Module/Import Integration**: Extends the language's native module or import system (when applicable)
4.  **Error Handling**: Provides language-appropriate error handling mechanisms

- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)

## Port Implementation Approaches

MetaCall uses different implementation approaches for its ports depending on the language characteristics:

Port

Implementation Approach

Binding Method

Node.js

JavaScript with native addon integration

Node API (N-API)

Python

Python C API or SWIG

C extension module

Ruby

SWIG-generated Ruby bindings

Ruby C extension

Rust

Rust FFI

Foreign Function Interface

Go

Go C bindings

cgo

Java

JNI interface

Java Native Interface

- [source/ports/node_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)

## Node.js Port

The Node.js port is the most developed and feature-complete port in MetaCall. It allows Node.js applications to seamlessly call functions written in Python, Ruby, C#, and other languages supported by MetaCall loaders.

### Library Discovery and Loading

The Node.js port first attempts to find the MetaCall library on the system, either through the environment variable `METACALL_INSTALL_PATH` or by searching common installation locations.

- [source/ports/node_port/index.js61-108](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L61-L108)

### Node.js API Functions

The Node.js port exposes the following main functions:

- [source/ports/node_port/index.js154-294](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L154-L294)

### Module System Integration

The Node.js port extends the native `require` function to support loading code from non-JavaScript languages:

The system supports loading different languages based on file extensions:

Extension

Language/Loader

.py

Python

.rb

Ruby

.cs, .vb

C#

.cob, .cbl, .cpy

Cobol

.js, .node

Node.js

.wat

WebAssembly

.ts, .jsx, .tsx

TypeScript

.rs

Rust

.c

C

It also supports explicit language prefixes in require calls: `require('py:module')` for Python modules.

- [source/ports/node_port/index.js342-444](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L342-L444)
- [source/ports/node_port/index.js345-388](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L345-L388)

## Python Port

The Python port allows Python applications to use MetaCall to call functions written in other languages.

### Implementation

The Python port is implemented using Python's C extension APIs, with a simplified installation process:

- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)

## Ruby Port

The Ruby port enables Ruby applications to call functions in other languages through MetaCall.

### Implementation

The Ruby port uses SWIG to generate Ruby bindings for the MetaCall C API:

- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)

## Port Data Flow

When a function is called through a port, the data follows this flow:

- [source/ports/node_port/index.js154-161](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L154-L161)
- [source/reflect/source/reflect_value.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value.c)

## Type Conversion

One of the most important aspects of the port system is type conversion between different language type systems. MetaCall uses its Value System to represent values in a language-agnostic way, and ports handle the conversion between language-specific types and MetaCall values.

- [source/reflect/include/reflect/reflect_value.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_value.h)
- [source/reflect/source/reflect_value.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value.c)

## Port System Build Integration

The ports are built and installed as part of the MetaCall build process, with configuration controlled through CMake options:

```
OPTION_BUILD_PORTS             - Enable building ports
OPTION_BUILD_PORTS_NODE        - Enable Node.js port
OPTION_BUILD_PORTS_PY          - Enable Python port
OPTION_BUILD_PORTS_RB          - Enable Ruby port
OPTION_BUILD_PORTS_RS          - Enable Rust port
OPTION_BUILD_PORTS_JAVA        - Enable Java port
```

Each port has its own CMakeLists.txt file that defines how it's built and installed.

- [source/ports/node_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)

## Using Ports in Applications

### Node.js Port Example

### Python Port Example

- [source/ports/node_port/test/index.js65-178](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/test/index.js#L65-L178)
- [source/ports/node_port/README.md](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/README.md)

## Port System Architecture Details

The port system follows a layered architecture:

1.  **Language-Specific Interface Layer**: Provides a native API for the host language
2.  **Binding Layer**: Connects the language-specific interface to the MetaCall Core
3.  **Type Conversion Layer**: Handles conversion between language types and MetaCall values
4.  **Error Handling Layer**: Translates C-level errors to language-appropriate exceptions

- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/loaders/node_loader/include/node_loader/node_loader_port.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_port.h)

## Port Initialization Process

When a port is initialized, it goes through several steps to set up the environment:

1.  Find and load the MetaCall library
2.  Initialize the MetaCall runtime
3.  Register language-specific type conversions
4.  Set up module/import system integration (if applicable)
5.  Export the port API

In the Node.js port, this process includes detecting whether the port is being loaded from the Node.js loader or directly from Node.js:

- [source/ports/node_port/index.js110-153](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js#L110-L153)
- [source/loaders/node_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/CMakeLists.txt)

## Conclusion

The Port System is a crucial component of MetaCall, providing language-specific interfaces that allow developers to use MetaCall from their preferred programming languages. By creating a bridge between different language environments and the MetaCall Core, ports enable truly polyglot programming where code written in one language can seamlessly call code written in other languages.

The Node.js port is the most mature and feature-complete port, with extensive support for module integration, type conversion, and error handling. Other ports for Python, Ruby, Rust, Go, and Java are in various stages of development and offer similar functionality tailored to their respective language ecosystems.

Through the Port System, MetaCall achieves its goal of enabling cross-language function calls with minimal friction, allowing developers to leverage the strengths of different programming languages within a single application.
