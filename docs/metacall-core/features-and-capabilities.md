---
title: Features and Capabilities
---

# Features and Capabilities

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

This page provides a comprehensive overview of MetaCall's core features and capabilities as a polyglot runtime environment. MetaCall enables seamless cross-language function calls, allowing developers to write and execute code in multiple programming languages within the same application. For information about specific language implementations, see [Supported Languages](./supported-languages.md).

## Core Features

MetaCall provides a set of powerful features designed to enable polyglot programming with minimal overhead:

1.  **Cross-Language Function Calls**: Call functions across language boundaries with automatic type conversion
2.  **Dynamic Code Loading**: Load code from files, memory, or packages at runtime
3.  **Type Conversion System**: Automatic conversion of data types between different languages
4.  **Reflection API**: Introspection capabilities for dynamically discovering functions and types
5.  **Multiple Language Support**: Integration with major programming languages
6.  **Language-Specific Ports**: Native interfaces for using MetaCall from specific languages

## Cross-Language Function Calling

MetaCall's primary feature is the ability to call functions across language boundaries. This is implemented through a foreign function interface (FFI) that handles parameter marshalling and type conversion.

MetaCall provides multiple ways to call functions across language boundaries:

1.  **By Name**: Call functions by their name as a string
2.  **By Function Reference**: Call functions using a function reference
3.  **With Value Arrays**: Call functions using arrays of MetaCall values
4.  **By Handle**: Call functions from a specific loaded module

## Value Type System

MetaCall features a unified value type system that enables seamless conversion between different language types. It supports primitive types, composite types, and language-specific objects.

The value system provides functions for creating, converting, and manipulating values:

- **Creation**: `metacall_value_create_*` functions for creating values
- **Conversion**: `metacall_value_to_*` functions for extracting values
- **Type Information**: `metacall_value_id` for identifying value types
- **Memory Management**: `metacall_value_destroy` for freeing values

## Code Loading Mechanisms

MetaCall provides multiple ways to load code from different sources:

The loading mechanisms include:

1.  **Load from File**: Load code from one or more source files
2.  **Load from Memory**: Load code from a string in memory
3.  **Load from Package**: Load code from a package (e.g., zip, npm, pip)
4.  **Load from Configuration**: Load code based on a configuration file

The `handle` parameter in these functions can be used to:

- Pass `NULL` to load symbols into the global scope
- Pass a pointer to `NULL` to create a new handle with private scope
- Pass a pointer to an existing handle to populate it with new symbols

## Handle and Scope Management

MetaCall uses handles to manage the scope of loaded functions and symbols. This allows for isolation between different modules and prevents naming conflicts.

Key handle operations include:

1.  **Handle Initialization**: Create an empty handle
2.  **Handle Population**: Populate one handle with symbols from another
3.  **Function Access**: Get a function from a specific handle
4.  **Handle Export**: Export handle contents as a value map

## Supported Languages

MetaCall supports multiple programming languages through its loader system. Each language has a dedicated loader that bridges between the MetaCall core and the language's native environment.
| Language | Tag | Load from File | Load from Memory | Async | Status |
| --- | --- | --- | --- | --- | --- |
| Python | `py` | ✓ | ✓ | ✓ | Stable |
| Node.js | `node` | ✓ | ✓ | ✓ | Stable |
| JavaScript | `js` | ✓ | ✓ | ✓ | Stable |
| Ruby | `rb` | ✓ | ✓ | ✓ | Stable |
| C# | `cs` | ✓ | ✓ | ✓ | Stable |
| Rust | `rs` | ✓ | ✓ | ✓ | Stable |
| C | `c` | ✓ | ✓ | ✗ | Stable |
| TypeScript | `ts` | ✓ | ✓ | ✓ | Stable |
| Cobol | `cob` | ✓ | ✗ | ✗ | Experimental |
| File | `file` | ✓ | ✗ | ✗ | Stable |
| Mock | `mock` | ✓ | ✓ | ✗ | Testing |
Each language loader implements a common interface defined in `loader_impl_interface.h`, enabling consistent behavior across languages.

## Language Ports

MetaCall provides language-specific ports that allow developers to use MetaCall functionality natively from their preferred programming language. These ports wrap the MetaCall C API with idiomatic interfaces for each language.

Available ports include:

1.  **Node.js Port**: Use MetaCall from Node.js applications
2.  **Python Port**: Use MetaCall from Python applications
3.  **Ruby Port**: Use MetaCall from Ruby applications
4.  **Rust Port**: Use MetaCall from Rust applications
5.  **Go Port**: Use MetaCall from Go applications
6.  **Java Port**: Use MetaCall from Java applications (in development)

These ports are implemented using language-specific binding technologies, such as SWIG for Ruby and JNI for Java.

## Configuration and Initialization

MetaCall provides configuration options that can be set during initialization to customize its behavior.

Key initialization functions include:

1.  **Basic Initialization**: Initialize MetaCall with default settings
2.  **Extended Initialization**: Initialize with custom configuration
3.  **Command-line Arguments**: Pass arguments to language runtimes
4.  **Flags**: Set special runtime flags
5.  **Execution Paths**: Set paths for finding modules and scripts

## Runtime Environment

MetaCall can be deployed as a runtime environment using Docker containers, providing a consistent execution environment across different platforms.

The runtime environment includes:

1.  **MetaCall CLI**: Command-line interface for running scripts
2.  **Pre-installed Languages**: Python, Node.js, Ruby, etc.
3.  **Pre-configured Libraries**: Language-specific libraries
4.  **Environment Variables**: Configured for MetaCall paths and plugins

```
LOADER_LIBRARY_PATH=/usr/local/lib
LOADER_SCRIPT_PATH=/usr/local/scripts
CONFIGURATION_PATH=/usr/local/share/metacall/configurations/global.json
SERIAL_LIBRARY_PATH=/usr/local/lib
DETOUR_LIBRARY_PATH=/usr/local/lib
PORT_LIBRARY_PATH=/usr/local/lib
NODE_PATH=/usr/local/lib/node_modules
```

These environment variables can be configured to customize the runtime behavior.

## API Reference Overview

MetaCall provides a rich API for managing the lifecycle of polyglot applications:

### Initialization and Shutdown

- `metacall_initialize()`: Initialize the MetaCall runtime
- `metacall_initialize_ex()`: Initialize with custom configuration
- `metacall_destroy()`: Clean up and shut down the runtime

### Code Loading

- `metacall_load_from_file()`: Load code from files
- `metacall_load_from_memory()`: Load code from memory
- `metacall_load_from_package()`: Load code from a package
- `metacall_load_from_configuration()`: Load code from configuration

### Function Calling

- `metacall()`: Call a function by name with variable arguments
- `metacallv()`: Call a function by name with an array of values
- `metacallf()`: Call a function by reference with variable arguments
- `metacallfv()`: Call a function by reference with an array of values

### Value Handling

- `metacall_value_create_*()`: Create MetaCall values
- `metacall_value_to_*()`: Convert MetaCall values to native types
- `metacall_value_destroy()`: Free memory of MetaCall values

### Handle Management

- `metacall_handle_initialize()`: Create a new handle
- `metacall_handle_function()`: Get a function from a handle
- `metacall_handle_export()`: Export handle contents as a value

## Extension and Plugin System

MetaCall includes a plugin system that allows for extending its functionality with custom loaders, serializers, and other components.

The plugin system is initialized during the MetaCall startup process and allows for:

1.  **Custom Loaders**: Add support for new programming languages
2.  **Custom Serializers**: Add new serialization formats
3.  **Custom Detours**: Add new function hooking mechanisms

Plugins are loaded from the plugin path, which can be configured using environment variables or the configuration system.

## Summary

MetaCall provides a comprehensive set of features for polyglot programming:

- Cross-language function calls with automatic type conversion
- Support for multiple programming languages through a loader system
- Dynamic code loading from files, memory, or packages
- Scope management through handles
- Language-specific ports for native integration
- Configuration options for customizing behavior
- Runtime environment for consistent deployment
- Plugin system for extensibility

These capabilities enable developers to leverage the strengths of different programming languages within a single application, facilitating code reuse and improving development efficiency.

Sources: [source/metacall/include/metacall/metacall.h20-35](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h#L20-L35) [VERSION1](https://github.com/metacall/core/blob/af9cad19/VERSION#L1-L1)
