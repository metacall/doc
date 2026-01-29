---
title: Ports
---

# Ports

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [cmake/FindMetaCall.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindMetaCall.cmake)
- [source/loaders/node_loader/include/node_loader/node_loader_port.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_port.h)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/node_port/.gitignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.gitignore)
- [source/ports/node_port/.npmignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.npmignore)
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
- [source/scripts/python/function/source/function.py](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/function/source/function.py)
- [source/tests/memcheck/valgrind-suppressions.sh](https://github.com/metacall/core/blob/af9cad19/source/tests/memcheck/valgrind-suppressions.sh)
- [source/tests/metacall_function_test/source/metacall_function_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_function_test/source/metacall_function_test.cpp)
- [source/tests/metacall_node_reentrant_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_reentrant_test/CMakeLists.txt)
- [source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

Ports in MetaCall are language-specific interfaces that allow developers to use MetaCall's cross-language function call capabilities from their preferred programming language. They bridge MetaCall Core functionality to specific language environments, providing a natural and idiomatic way to access foreign language code.

For information about loading and executing code from different programming languages, see the [Loader System](./loader-system.md) documentation. While loaders execute foreign code, ports provide the API for accessing MetaCall from a specific language.

## Port System Architecture

Ports connect MetaCall Core to language-specific runtimes, handling type conversions and providing language-appropriate interfaces to MetaCall's functionality.

## Port Implementation Pattern

Ports typically follow this implementation pattern:

1.  **Library Discovery & Loading**: Finding and loading the MetaCall Core library
2.  **Initialization**: Setting up the MetaCall runtime
3.  **API Wrapping**: Providing language-specific wrappers for core functions
4.  **Type Conversion**: Converting between language types and MetaCall's value system
5.  **Integration**: Integrating with language-specific features (e.g., module systems)

## Available Ports

### Node.js Port

The Node.js port is the most comprehensively developed port in MetaCall. It allows JavaScript code running in Node.js to seamlessly interact with code written in other languages supported by MetaCall.

#### Node.js Port Implementation

The Node.js port consists of:

1.  A JavaScript module that provides the API
2.  Native bindings to the MetaCall Core library

At initialization, the port:

- Finds the MetaCall library using platform-specific paths or the `METACALL_INSTALL_PATH` environment variable
- Loads the library using Node.js's `process.dlopen`
- Initializes the MetaCall runtime

#### Node.js Port API

The Node.js port provides the following main functions:
| Function | Description |
| --- | --- |
| `metacall(name, ...args)` | Call a function by name with arguments |
| `metacallfms(name, buffer)` | Call a function with JSON-formatted arguments |
| `metacall_load_from_file(tag, paths)` | Load code from files with language tag |
| `metacall_load_from_memory(tag, code)` | Load code from a string with language tag |
| `metacall_load_from_package(tag, pkg)` | Load code from a package with language tag |
| `metacall_inspect()` | Get metadata about loaded modules and functions |
It also modifies Node.js's `require()` function to enable imports from other languages:

- Direct imports by extension (e.g., `require('./script.py')`)
- Explicit tag imports (e.g., `require('py:module')`)

#### Node.js Port Usage Examples

**Basic usage:**

**Loading code from memory:**

### Python Port

The Python port allows Python applications to use MetaCall for calling functions from other languages.

#### Python Port Implementation

The Python port is distributed as a Python package that can be installed via pip. It provides Python bindings to the MetaCall Core library and follows a similar pattern to the Node.js port.

#### Python Port Usage Example

### Ruby Port

The Ruby port enables Ruby applications to use MetaCall for cross-language function calls.

#### Ruby Port Implementation

The Ruby port is implemented using SWIG to generate Ruby bindings for the MetaCall Core library. It creates a Ruby extension module that interfaces with MetaCall.

### Other Ports

MetaCall also includes or is developing ports for:

- **Rust Port**: Enables Rust applications to use MetaCall
- **Go Port**: Enables Go applications to use MetaCall
- **Java Port**: Provides Java bindings to MetaCall (work in progress)
- **JavaScript Port (V8)**: Direct bindings to V8 JavaScript engine

## Type Conversion System

A key responsibility of ports is bidirectional conversion between language-specific types and MetaCall's value system.

## Cross-Language Function Call Flow

The sequence of a cross-language function call through a port:

## Creating Custom Ports

While MetaCall already provides ports for several languages, you can create new ports for other languages by:

1.  Creating bindings to the MetaCall Core library
2.  Implementing bidirectional type conversion
3.  Providing wrappers for core functions
4.  Handling initialization, shutdown, and resource management
5.  Optionally integrating with the language's module system

Studying existing port implementations provides valuable examples:

- Node.js port: A comprehensive example with module system integration
- Ruby port: An example using SWIG
- Python port: A simpler implementation

## Performance Considerations

When using ports, consider these performance factors:

1.  **Type Conversion Overhead**: Each conversion between language types and MetaCall values adds overhead
2.  **Cross-Language Boundary Costs**: Each call crosses at least two language boundaries
3.  **Serialization**: Complex data structures may need serialization/deserialization

To optimize performance:

- Minimize the number of cross-language calls
- Batch operations when possible
- Keep performance-critical code within a single language
