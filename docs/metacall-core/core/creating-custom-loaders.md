---
title: Creating Custom Loaders
---

# Creating Custom Loaders

## Relevant source files

- [cmake/CompileOptions.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/CompileOptions.cmake)
- [cmake/FindNodeJS.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindNodeJS.cmake)
- [source/cli/metacallcli/test/cli-test-rb.py.in](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/test/cli-test-rb.py.in)
- [source/cli/metacallcli/test/cli-test.py.in](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/test/cli-test.py.in)
- [source/loaders/node_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/CMakeLists.txt)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js)
- [source/loaders/node_loader/include/node_loader/node_loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_impl.h)
- [source/loaders/node_loader/include/node_loader/node_loader_trampoline.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_trampoline.h)
- [source/loaders/node_loader/source/node_loader_impl.cpp](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp)
- [source/loaders/node_loader/source/node_loader_port.cpp](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_port.cpp)
- [source/loaders/node_loader/source/node_loader_trampoline.cpp](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_trampoline.cpp)
- [source/loaders/py_loader/include/py_loader/py_loader_dict.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/include/py_loader/py_loader_dict.h)
- [source/loaders/py_loader/include/py_loader/py_loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/include/py_loader/py_loader_impl.h)
- [source/loaders/py_loader/source/py_loader_dict.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_dict.c)
- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/py_loader/source/py_loader_port.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_port.c)
- [source/loaders/ts_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/CMakeLists.txt)
- [source/loaders/ts_loader/bootstrap/lib/bootstrap.ts](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/lib/bootstrap.ts)
- [source/ports/py_port/metacall/\_\_init\_\_.py](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/metacall/__init__.py)
- [source/ports/py_port/metacall/api.py](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/metacall/api.py)
- [source/scripts/python/pointer/source/pointer.py.in](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/pointer/source/pointer.py.in)
- [source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp)
- [source/tests/metacall_node_test/source/main.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_test/source/main.cpp)
- [source/tests/metacall_node_test/source/metacall_node_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_test/source/metacall_node_test.cpp)
- [source/tests/metacall_python_async_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/CMakeLists.txt)
- [source/tests/metacall_python_async_test/source/main.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/source/main.cpp)
- [source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp)
- [source/tests/metacall_python_pointer_test/source/metacall_python_pointer_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_pointer_test/source/metacall_python_pointer_test.cpp)
- [source/tests/metacall_python_port_import_test/source/metacall_python_port_import_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_port_import_test/source/metacall_python_port_import_test.cpp)

This guide explains how to create custom language loaders for MetaCall. Loaders are plugins that enable MetaCall to execute code written in specific programming languages. By creating a custom loader, you can add support for languages not currently integrated into MetaCall or implement specialized versions of existing language runtimes.

For information about using existing loaders, please refer to their respective documentation pages (see [Python Loader](./python-loader.md), [Node.js Loader](./node-js-loader.md), etc.).

## Overview of the Loader System

The MetaCall Loader System serves as a bridge between the MetaCall Core and various language runtimes. Each loader is responsible for loading code from a specific language, executing it within its native runtime, and facilitating cross-language function calls through the MetaCall reflection system.

### Loader Architecture in MetaCall

- [source/loaders/node_loader/source/node_loader_impl.cpp](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp)
- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)

## Loader Interface

Every loader must implement the loader interface defined in the MetaCall Core. This interface consists of several key functions that handle initialization, code loading, function discovery, and cleanup.

- [source/loaders/node_loader/include/node_loader/node_loader_impl.h38-52](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_impl.h#L38-L52)
- [source/loaders/py_loader/include/py_loader/py_loader_impl.h39-53](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/include/py_loader/py_loader_impl.h#L39-L53)

## Step-by-Step Guide to Creating a Custom Loader

### 1\. Project Structure

Start by creating the directory structure for your loader plugin:

```
source/loaders/my_loader/
├── CMakeLists.txt                        # Build configuration
├── include/
│   └── my_loader/
│       ├── my_loader.h                   # Public API
│       ├── my_loader_impl.h              # Implementation interface
│       └── my_loader_api.h               # Export macros
└── source/
    ├── my_loader.c                       # Entry point
    └── my_loader_impl.c/cpp              # Implementation
```

- [source/loaders/node_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/CMakeLists.txt)
- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)

### 2\. Implementing the Loader Interface

Your loader implementation must provide functions for each of the methods defined in the loader interface. Here's an overview of what each function should do:

#### 2.1 Initialize

This function initializes your language runtime and sets up any necessary state for the loader. It should:

1.  Initialize the language runtime
2.  Create data structures to track loaded modules
3.  Register the loader with the MetaCall reflection system
4.  Return a pointer to the loader's implementation data

Example implementation patterns:

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp917-1109](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L917-L1109)

#### 2.2 Load From File

This function loads code from one or more files. It should:

1.  Process each file path
2.  Load and execute the code using the language runtime
3.  Create a handle to represent the loaded module(s)
4.  Return the handle for further operations

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp1419-1484](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1419-L1484)

#### 2.3 Load From Memory

This function loads code from a memory buffer. It should:

1.  Compile/interpret the provided code buffer
2.  Execute it in the language runtime
3.  Create a handle to represent the loaded module
4.  Return the handle

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp1486-1528](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1486-L1528)

#### 2.4 Load From Package

This function loads code from a package (e.g., compiled libraries, archives). It should:

1.  Load the specified package using the language's package system
2.  Initialize the package in the runtime
3.  Create a handle to represent the loaded package
4.  Return the handle

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp1530-1553](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1530-L1553)

#### 2.5 Clear

This function clears a previously loaded module/package. It should:

1.  Free resources associated with the handle
2.  Remove the module from the language runtime if applicable
3.  Return 0 on success, non-zero on failure

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp1555-1588](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1555-L1588)

#### 2.6 Discover

This function discovers functions and other symbols in a loaded module. It should:

1.  Traverse the module to find exported functions/objects
2.  For each found function, register it with the reflection system
3.  Handle type information for parameters and return values
4.  Return 0 on success, non-zero on failure

- [source/loaders/py_loader/source/py_loader_impl.c181-196](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L181-L196)
- [source/loaders/node_loader/source/node_loader_impl.cpp1590-1642](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1590-L1642)

#### 2.7 Destroy

This function cleans up and shuts down the loader. It should:

1.  Free all resources associated with the loader
2.  Shutdown the language runtime properly
3.  Return 0 on success, non-zero on failure

- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/node_loader/source/node_loader_impl.cpp1644-1671](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1644-L1671)

### 3\. Value Conversion System

One of the most critical aspects of implementing a loader is handling value conversion between MetaCall's type system and your language's native types.

For each direction of conversion, you need to implement handler functions:

1.  **Language to MetaCall**: Convert your language's native types to MetaCall value types
2.  **MetaCall to Language**: Convert MetaCall value types back to your language's native types

These conversions need to handle all of MetaCall's supported value types, including complex types like arrays, maps, and function references.

- [source/loaders/py_loader/source/py_loader_impl.c875-1267](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L875-L1267)
- [source/loaders/node_loader/source/node_loader_impl.cpp1210-1451](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1210-L1451)

### 4\. Function Call Interface

Your loader must also implement a way to call functions defined in your language from MetaCall. This typically involves:

1.  Creating a function interface that bridges between MetaCall and your language
2.  Handling parameter conversion
3.  Managing return values
4.  Proper error handling

For asynchronous languages, you may also need to implement support for Promises/Futures.

- [source/loaders/py_loader/source/py_loader_impl.c357-423](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L357-L423)
- [source/loaders/node_loader/source/node_loader_impl.cpp3200-3280](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L3200-L3280)

### 5\. Handling Asynchronous Code

For languages with asynchronous capabilities (like JavaScript with Promises), you need to implement support for the MetaCall future API:

- [source/loaders/node_loader/source/node_loader_impl.cpp3283-3367](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L3283-L3367)
- [source/loaders/py_loader/source/py_loader_impl.c835-870](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L835-L870)
- [source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp75-210](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp#L75-L210)

### 6\. CMake Configuration

Your loader needs a proper CMakeLists.txt file to integrate with the MetaCall build system. Here's a template:

- [source/loaders/node_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/CMakeLists.txt)
- [source/loaders/ts_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/CMakeLists.txt)

## Type System Integration

A critical part of creating a custom loader is proper integration with MetaCall's type system. Your loader must map between native language types and MetaCall's type system.

### Required Types to Support

| MetaCall Type    | Description           | Example in Implementation              |
| ---------------- | --------------------- | -------------------------------------- |
| `NULL`           | Null/None value       | Map to language's null/nil/None        |
| `BOOL`           | Boolean value         | Convert to/from language's boolean     |
| `CHAR`           | Single character      | Map to char or single-character string |
| `INT`/`LONG`     | Integer values        | Map to language integers               |
| `FLOAT`/`DOUBLE` | Floating point values | Map to language floats                 |
| `STRING`         | Text string           | Map to language string type            |
| `ARRAY`          | Sequence of values    | Map to language arrays/lists           |
| `MAP`            | Key-value mapping     | Map to language dictionaries/objects   |
| `POINTER`        | Raw pointer           | Special handling for FFI               |
| `FUNCTION`       | Function reference    | Wrap language functions                |
| `FUTURE`         | Async result          | Map to language promises/futures       |

- [source/loaders/py_loader/source/py_loader_impl.c875-952](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L875-L952)
- [source/loaders/node_loader/source/node_loader_impl.cpp1210-1267](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1210-L1267)

## Best Practices

### Memory Management

Proper memory management is crucial for loaders:

1.  **Ref counting**: Ensure proper reference counting for language objects
2.  **Resource cleanup**: Free all resources in the destroy method
3.  **Value ownership**: Be clear about who owns values during conversion

- [source/loaders/py_loader/source/py_loader_impl.c193-194](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L193-L194)
- [source/loaders/node_loader/source/node_loader_impl.cpp1145-1158](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1145-L1158)

### Thread Safety

Many language runtimes have specific threading models:

1.  **GIL**: Python's Global Interpreter Lock requires careful handling
2.  **Event loops**: Node.js's event loop must be respected
3.  **Thread access**: Some runtimes only allow API calls from specific threads

The MetaCall core may call your loader from different threads, so proper synchronization is necessary.

- [source/loaders/py_loader/source/py_loader_threading.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_threading.h)
- [source/loaders/node_loader/source/node_loader_impl.cpp202-233](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L202-L233)

### Error Handling

Proper error handling is essential for a stable loader:

1.  **Language exceptions**: Catch and convert language exceptions to MetaCall errors
2.  **Error propagation**: Ensure errors are properly propagated back to callers
3.  **Cleanup on error**: Release resources even when errors occur

- [source/loaders/py_loader/source/py_loader_impl.c157-161](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L157-L161)
- [source/loaders/node_loader/source/node_loader_impl.cpp945-1033](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L945-L1033)

## Testing Your Loader

Testing is critical to ensure your loader correctly implements all required functionality:

1.  **Basic loading**: Test loading scripts from file and memory
2.  **Function calls**: Test calling functions with various parameter types
3.  **Error cases**: Test error handling and edge cases
4.  **Type conversions**: Test all type conversions in both directions
5.  **Asynchronous operations**: Test async function calls if applicable

Look at existing tests for examples of how to test your loader:

- [source/tests/metacall_node_test/source/metacall_node_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_test/source/metacall_node_test.cpp)
- [source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp)

## Bootstrap and Initialization

Some loaders (like the Node.js loader) use a bootstrap process to initialize the language runtime and set up necessary callbacks. If your language runtime requires special initialization, you might need to implement a similar bootstrap mechanism.

- [source/loaders/node_loader/bootstrap/lib/bootstrap.js](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js)
- [source/loaders/ts_loader/bootstrap/lib/bootstrap.ts](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/lib/bootstrap.ts)

## Conclusion

Creating a custom loader for MetaCall involves implementing the loader interface, handling type conversions, managing function calls, and dealing with language-specific challenges. By following this guide and studying the existing loaders, you can integrate new languages into the MetaCall ecosystem.

Remember to carefully handle:

- Memory management between MetaCall and your language runtime
- Thread safety considerations for your language
- Proper type conversions in both directions
- Error handling and propagation

With a well-implemented loader, you can seamlessly integrate your preferred programming language with all other languages supported by MetaCall, enabling true polyglot programming.
