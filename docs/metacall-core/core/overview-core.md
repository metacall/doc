---
title: Overview
---

# Overview

## Relevant source files

- [CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/CMakeLists.txt)
- [README.md](https://github.com/metacall/core/blob/af9cad19/README.md)
- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [deploy/images/overview.png](https://github.com/metacall/core/blob/af9cad19/deploy/images/overview.png)
- [docker-compose.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.yml)
- [docs/README.md](https://github.com/metacall/core/blob/af9cad19/docs/README.md)
- [source/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/CMakeLists.txt)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/loaders/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/CMakeLists.txt)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)
- [tools/metacall-configure.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.sh)
- [tools/metacall-environment.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.sh)
- [tools/metacall-runtime.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-runtime.sh)

MetaCall is a polyglot runtime that enables cross-language function interface calls. It allows developers to seamlessly call functions, methods, and procedures between different programming languages, effectively breaking down language barriers in software development.

This document introduces the core concepts of MetaCall, providing a high-level understanding of its architecture and functionality. For more detailed information about features and capabilities, see [Features and Capabilities](/metacall/core/1.1-features-and-capabilities), and for a comprehensive list of supported languages, see [Supported Languages](/metacall/core/1.2-supported-languages).

## Purpose and Key Features

MetaCall's primary purpose is to enable cross-language interoperability, allowing developers to:

- Call functions between different programming languages with minimal overhead
- Use the best language for each specific task in a single application
- Integrate existing code written in different languages without rewrites
- Build polyglot applications with a unified function call interface

The key features include:

- Foreign function interface across multiple languages
- Dynamic loading of code from files, memory, or packages
- Type conversion between different language type systems
- Support for both synchronous and asynchronous function calls
- Extensible architecture through loaders and ports

## Core Concepts

MetaCall operates around several core concepts:

1.  **Loaders (Backends)**: Plugins that enable loading and executing code from specific languages (Python, NodeJS, Ruby, etc.)
2.  **Ports (Frontends)**: Language-specific bindings that expose MetaCall functionality to different programming languages
3.  **Value System**: Handles conversion between different language-specific data types
4.  **Reflection**: Provides introspection capabilities for loaded functions and types
5.  **Function Calling**: Various mechanisms for invoking functions across language boundaries

## Basic Usage Example

The following example demonstrates calling a Python function from JavaScript:

Python file (`sum.py`):

JavaScript file (`main.js`):

Command line:

This simple example shows MetaCall's core capability: calling a Python function directly from JavaScript code as if it were a native JavaScript function.

## Architecture Overview

## Cross-Language Function Call Flow

## Core Components

### MetaCall API

The MetaCall API provides functions for loading code, calling functions, and handling values across language boundaries. Key functions include:

- `metacall_initialize()` - Initialize the MetaCall runtime
- `metacall_load_from_file()` - Load code from files
- `metacall_load_from_memory()` - Load code from a memory buffer
- `metacall()` - Call a function by name with arguments
- `metacallv()` - Call a function with an array of values
- `metacall_value_create_*()` - Create values for different types
- `metacall_value_to_*()` - Convert values to specific types

### Loader System

The loader system is responsible for loading and executing code from different programming languages. Each loader implements a common interface but handles the specifics of its language runtime:

1.  **Loader Manager**: Coordinates the loaders and handles function discovery
2.  **Language Loaders**: Interface with specific language runtimes (Python, NodeJS, etc.)
3.  **Handles**: Represent loaded code modules that contain callable functions

### Value System

The value system provides a unified way to represent and convert values between different language type systems:

- Common type representation for basic types (int, float, string, etc.)
- Type conversion between languages
- Memory management for values

## Build and Environment Setup

MetaCall includes tools for setting up the development environment and building the system:

- `metacall-environment.sh` - Sets up the development environment with required dependencies
- `metacall-configure.sh` - Configures the build with specific options
- `metacall-build.sh` - Builds the MetaCall system

## Installing and Using MetaCall

MetaCall can be installed via a simple installation script:

After installation, you can use the `metacall` command to run code that calls functions between languages.

## Language Support

MetaCall supports numerous programming languages as both loaders (backends) and ports (frontends). The loaders allow loading and executing code, while the ports enable using MetaCall from within a specific language.

Currently supported languages include Python, NodeJS, Ruby, C#, Java, TypeScript, WebAssembly, C, Rust, and more. For a detailed list of supported languages and their integration levels, see [Supported Languages](/metacall/core/1.2-supported-languages).

## Further Resources

For more information about MetaCall, consult these additional resources:

- [Features and Capabilities](/metacall/core/1.1-features-and-capabilities) - Detailed list of MetaCall's features
- [Architecture](/metacall/core/2-architecture) - Detailed architecture documentation
- [Core API](/metacall/core/4-core-api) - Complete API reference
- [Loaders](/metacall/core/5-loaders) - Information about language-specific loaders
- [Ports](/metacall/core/6-ports) - Documentation on using MetaCall from different languages
