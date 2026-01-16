---
title: Initialization and Shutdown
---

# Initialization and Shutdown

## Relevant source files

- [cmake/FindMetaCall.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindMetaCall.cmake)
- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/loaders/node_loader/include/node_loader/node_loader_port.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_port.h)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/ports/node_port/.gitignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.gitignore)
- [source/ports/node_port/.npmignore](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/.npmignore)
- [source/ports/node_port/LICENSE](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/LICENSE)
- [source/ports/node_port/README.md](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/README.md)
- [source/ports/node_port/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/index.js)
- [source/ports/node_port/package-lock.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package-lock.json)
- [source/ports/node_port/package.json](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/package.json)
- [source/ports/node_port/test/index.js](https://github.com/metacall/core/blob/af9cad19/source/ports/node_port/test/index.js)
- [source/reflect/include/reflect/reflect_value.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_value.h)
- [source/reflect/source/reflect_value.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value.c)
- [source/scripts/python/function/source/function.py](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/function/source/function.py)
- [source/tests/memcheck/valgrind-suppressions.sh](https://github.com/metacall/core/blob/af9cad19/source/tests/memcheck/valgrind-suppressions.sh)
- [source/tests/metacall_function_test/source/metacall_function_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_function_test/source/metacall_function_test.cpp)
- [source/tests/metacall_node_reentrant_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_reentrant_test/CMakeLists.txt)
- [source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_reentrant_test/source/metacall_python_reentrant_test.cpp)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)

This page documents the initialization and shutdown procedures for the MetaCall runtime environment across different programming languages. Proper initialization is essential for setting up the runtime environment before making cross-language function calls, while orderly shutdown ensures resources are released correctly.

## Core Initialization Process

MetaCall employs a lifecycle management system that requires initialization before use and proper shutdown to prevent resource leaks. The initialization flow sets up multiple subsystems including logging, dynamic loading, type conversion, and serialization.

### Basic Initialization

The simplest way to initialize MetaCall is by calling `metacall_initialize()`, which prepares the runtime environment with default settings:

### Extended Initialization with Configuration

For more control over the initialization process, `metacall_initialize_ex()` accepts configuration options to customize loader behavior:

This allows you to pass language-specific configuration options to each loader during initialization.

### Command-line Arguments

When running MetaCall as an application, you can pass command-line arguments using:

These arguments are available to the runtimes that may need them.

### Auto-initialization Mechanism

MetaCall employs a constructor mechanism that automatically initializes when loaded as a library:

## Node.js Initialization

The Node.js port demonstrates how initialization works in a language-specific context:

## Shutdown Process

Proper shutdown is essential to avoid resource leaks. The shutdown process typically follows this sequence:

## Loader Initialization and Destruction

Loaders are initialized in a specific order and then destroyed in reverse order (LIFO) to ensure proper dependency handling:

## Checking Initialization Status

You can check if MetaCall or a specific loader is initialized using:

## Settings Flags During Initialization

MetaCall supports various flags that can be set before initialization:

## Initialization and Shutdown in C/C++

Example of proper initialization and shutdown in C/C++:

## Best Practices

1.  **Always check initialization result**: MetaCall functions return 0 on success and non-zero on error.
2.  **Register shutdown handlers**: In many contexts, you can register `metacall_destroy()` with `atexit()` to ensure resources are cleaned up.
3.  **Handle host environments**: When integrating MetaCall with an existing language runtime, use the host environment configuration:
4.  **Initialize once**: MetaCall has protections against multiple initializations, but it's still good practice to check before initializing:
5.  **Loader-specific path initialization**: Set execution paths for loaders before loading code:

## Lifecycle Diagram

The complete lifecycle of a MetaCall application follows this pattern:

## Value Validation During Operations

MetaCall checks value validity during operations to detect potential memory corruption or use-after-free scenarios:

## Troubleshooting Initialization Issues

Common initialization issues and solutions:
| Issue | Possible Cause | Solution |
| --- | --- | --- |
| Function returns `NULL` | MetaCall not initialized | Call `metacall_initialize()` before using MetaCall functions |
| Loader fails to initialize | Missing dependencies | Check if language runtime is properly installed |
| Memory leaks | Missing `metacall_destroy()` | Ensure proper shutdown or register with `atexit()` |
| Crashes during initialization | Conflicting runtimes | Use `METACALL_HOST` environment variable |
| File loading errors | Incorrect execution path | Set correct path with `metacall_execution_path()` |
Sources: [source/metacall/source/metacall.c222-341](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L222-L341) [source/loader/source/loader_impl.c391-511](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L391-L511)
