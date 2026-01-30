---
title: Supported Languages
---

# Supported Languages

This page provides a comprehensive overview of programming languages supported by MetaCall, including their integration levels, supported features, and implementation details. For information about the general architecture of MetaCall, see [Architecture](./architecture.md).
## Language Support Overview

MetaCall enables cross-language function calls between multiple programming languages with varying degrees of integration. Each supported language has a corresponding loader that enables MetaCall to interface with the language's runtime environment and execute code written in that language.

The following diagram illustrates the languages currently supported by MetaCall:

## Integration Levels

Languages in MetaCall are integrated at different levels, depending on the features supported and the maturity of the implementation:

## Feature Support Matrix

The following table summarizes the key features supported across different languages:
| Language | Function Calls | Classes & Objects | Async/Await | Exception Handling | Value Conversion | Garbage Collection |
| --- | --- | --- | --- | --- | --- | --- |
| Python | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Node.js | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| TypeScript | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ruby | ✓ | ✓ | Limited | ✓ | ✓ | ✓ |
| Java | ✓ | ✓ | Limited | ✓ | ✓ | ✓ |
| C | ✓ | Limited | ✗ | Limited | ✓ | Manual |
| Rust | ✓ | Limited | ✗ | Limited | ✓ | ✓ |

## Python Support

Python is fully integrated into MetaCall using direct bindings to the Python C API.

### Features

- **Complete Function Support**: Call Python functions with arguments and receive return values
- **Class and Object Support**: Instantiate and interact with Python classes and objects
- **Async/Await**: Support for Python's asynchronous programming model
- **Exception Handling**: Python exceptions are properly captured and converted
- **Value Conversion**: Bidirectional conversion between Python types and MetaCall values

### Implementation Details

The Python loader (`py_loader`) directly interfaces with the Python C API to execute Python code. It handles:

- Function discovery and reflection
- Class and method discovery
- Object instantiation and method calls
- Asynchronous function execution
- Value type conversion

## Node.js Support

Node.js/JavaScript has full integration with comprehensive support for modern JavaScript features.

### Features

- **Function Calls**: Call JavaScript functions with arguments and receive return values
- **Promise Support**: Native handling of JavaScript promises
- **Async/Await**: Full support for async/await patterns
- **Exception Handling**: JavaScript exceptions are properly captured and converted
- **Value Conversion**: Bidirectional conversion between JavaScript types and MetaCall values

### Implementation Details

The Node.js loader (`node_loader`) uses N-API (Node.js API) and a JavaScript bridge for integration. It implements:

- A bootstrap mechanism to initialize the Node.js environment
- Thread-safe function calls between MetaCall and Node.js
- Promise and async/await support
- Complex value conversion between JavaScript and MetaCall types

## TypeScript Support

TypeScript is fully supported through the Node.js loader with additional TypeScript-specific functionality.

### Features

- All Node.js/JavaScript features
- Static type checking and type information
- TypeScript-specific language constructs
- Automatic transpilation to JavaScript

### Implementation Details

The TypeScript loader (`ts_loader`) builds on top of the Node.js loader, adding:

- TypeScript compilation using the TypeScript compiler API
- Type information discovery
- Source file loading and transpilation
- Integration with the JavaScript execution environment

The TypeScript loader first transpiles TypeScript code to JavaScript, then uses the Node.js loader to execute it.

## Ruby Support

Ruby has partial integration with support for core Ruby features.

### Features

- **Function Calls**: Call Ruby functions with arguments and receive return values
- **Class and Object Support**: Instantiate and interact with Ruby classes and objects
- **Limited Async Support**: Basic support for Ruby's asynchronous patterns
- **Exception Handling**: Ruby exceptions are properly captured and converted
- **Value Conversion**: Bidirectional conversion between Ruby types and MetaCall values

### Implementation Details

The Ruby loader (`rb_loader`) interfaces directly with the Ruby C API. It implements:

- Function discovery and invocation
- Class and method discovery
- Object instantiation and method calls
- Value type conversion between Ruby and MetaCall

## Java Support

Java has partial integration with support for Java classes and methods.

### Features

- **Function Calls**: Invoke Java methods with arguments and receive return values
- **Class and Object Support**: Instantiate and interact with Java classes and objects
- **Limited Async Support**: Basic support for Java's asynchronous patterns
- **Exception Handling**: Java exceptions are properly captured and converted
- **Value Conversion**: Bidirectional conversion between Java types and MetaCall values

### Implementation Details

The Java loader (`java_loader`) uses JNI (Java Native Interface) to interact with the Java Virtual Machine. It handles:

- Java class loading and instantiation
- Method discovery and invocation
- Field access and modification
- Static and instance method calls
- Value type conversion between Java and MetaCall

The Java loader uses a bootstrap mechanism with pre-compiled Java code for initialization.

## Rust Support

Rust has basic integration with support for function calls.

### Features

- **Function Calls**: Call Rust functions with arguments and receive return values
- **Limited Object Support**: Basic support for Rust structs and traits
- **Value Conversion**: Conversion between Rust types and MetaCall values

### Implementation Details

The Rust loader (`rs_loader`) compiles Rust code into a shared library which is then loaded by MetaCall. It uses:

- Rust's Foreign Function Interface (FFI)
- CMake-based build system to compile Rust code
- Value type conversion between Rust and MetaCall

The Rust loader requires the Rust toolchain to be installed on the system.

## C Support

C has partial integration with support for basic function calls.

### Features

- **Function Calls**: Call C functions with arguments and receive return values
- **Limited Struct Support**: Basic support for C structs
- **Value Conversion**: Conversion between C types and MetaCall values

### Implementation Details

The C loader enables loading and calling C functions from shared libraries or direct source code. It uses:

- Dynamic library loading mechanisms
- Tiny C Compiler (TCC) for JIT compilation of C code
- Function discovery and invocation
- Value type conversion between C and MetaCall

## Value Conversion Between Languages

MetaCall implements a sophisticated value system that handles conversion between different language types:

The solid lines indicate full support, while the dotted lines indicate partial support.

## Loader Implementation Architecture

Each language loader follows a common implementation pattern but with language-specific adaptations:

## Conclusion

MetaCall supports a wide range of programming languages with varying levels of integration. Python, Node.js, and TypeScript have the most comprehensive support, including features like classes, async/await, and exception handling. Ruby and Java have good support for core features but more limited async capabilities. Rust and C have basic integration focusing on function calls.

The language support continues to evolve with improvements to existing loaders and potential additions of new languages in the future.
