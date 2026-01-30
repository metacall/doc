---
title: Node.js Loader
---

# Node.js Loader

The Node.js Loader enables MetaCall to load, execute, and interact with JavaScript code running in the Node.js runtime. This loader is a core component that bridges the gap between the Node.js ecosystem and other language runtimes within MetaCall, enabling seamless interoperability between JavaScript and other supported languages.
## Overview

The Node.js Loader allows MetaCall to:

1.  Load and evaluate JavaScript code from files or memory
2.  Execute JavaScript functions and handle their return values
3.  Support asynchronous operations through promises
4.  Convert data types between Node.js and MetaCall's type system
5.  Enable JavaScript code to call functions implemented in other languages

For information about using MetaCall from Node.js, see the [Node.js Port](./node-js-port.md).

- [source/loaders/node_loader/source/node_loader_impl.cpp1-146](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1-L146)
- [source/loaders/node_loader/include/node_loader/node_loader_impl.h20-41](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/include/node_loader/node_loader_impl.h#L20-L41)

## Architecture

The Node.js Loader has a complex architecture that integrates the Node.js runtime with MetaCall's core system.

The Node.js Loader consists of several key components:

1.  **Native Implementation (`node_loader_impl`)**: Implements the loader interface for MetaCall, handling initialization, loading, function discovery, and function execution. Written in C++, it interfaces with Node.js through N-API.
2.  **Native Trampoline (`node_loader_trampoline`)**: Provides a bridge between the native loader implementation and JavaScript, registering native functions that can be called from JavaScript.
3.  **JavaScript Bootstrap (`bootstrap.js`)**: The JavaScript part of the loader that initializes the Node.js environment and provides functions for loading and executing JavaScript code.
4.  **Thread-Safe Communication**: The loader uses thread-safe mechanisms to communicate between the MetaCall thread and the Node.js event loop thread.

- [source/loaders/node_loader/source/node_loader_impl.cpp148-713](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L148-L713)
- [source/loaders/node_loader/source/node_loader_trampoline.cpp1-59](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_trampoline.cpp#L1-L59)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js1-47](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L1-L47)

## Initialization Process

### Loader Initialization

The Node.js Loader's initialization process involves several steps:

The initialization process begins with MetaCall calling `node_loader_impl_initialize`, which creates the loader implementation data structure and starts a separate thread for the Node.js runtime. The Node.js thread initializes the runtime, loads the bootstrap.js file, and sets up the function table that enables communication between JavaScript and native code.

Key steps in the initialization process:

1.  Create the loader implementation structure
2.  Start a dedicated thread for Node.js
3.  Initialize Node.js runtime in the separate thread
4.  Load bootstrap.js and register function callbacks
5.  Set up thread-safe communication channels

- [source/loaders/node_loader/source/node_loader_impl.cpp883-963](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L883-L963)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js21-46](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L21-L46)
- [source/loaders/node_loader/source/node_loader_trampoline.cpp59-127](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_trampoline.cpp#L59-L127)

## Loading JavaScript Code

The Node.js Loader supports loading JavaScript code from files, memory, or packages.

### Loading from Files

When loading code from files, the loader:

1.  Takes an array of file paths to load
2.  Uses a thread-safe function to invoke the JavaScript loader in the Node.js thread
3.  The JavaScript loader (`node_loader_trampoline_load_from_file`) requires the modules and creates a handle
4.  The handle is returned to MetaCall

- [source/loaders/node_loader/source/node_loader_impl.cpp863-872](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L863-L872)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js136-157](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L136-L157)

### Loading from Memory

Loading code from memory follows a similar pattern but executes the code directly instead of requiring a file:

The loader creates a new Node.js module, compiles the buffer as JavaScript code, and returns a handle to the exports.

- [source/loaders/node_loader/bootstrap/lib/bootstrap.js159-200](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L159-L200)
- [source/loaders/node_loader/source/node_loader_impl.cpp873-882](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L873-L882)

## Function Discovery and Execution

### Function Discovery

The Node.js Loader uses a function discovery mechanism to introspect JavaScript functions and create metadata about them:

The discovery process:

1.  Takes a handle to loaded JavaScript code
2.  Uses the espree parser to analyze each exported function
3.  Extracts function signatures, including parameter names
4.  Creates metadata for each function
5.  Registers the functions with MetaCall

The discovery function uses the espree parser (a JavaScript syntax parser) to analyze function signatures and identify parameter names, which enables MetaCall to provide named parameter support.

- [source/loaders/node_loader/bootstrap/lib/bootstrap.js226-251](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L226-L251)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js264-307](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L264-L307)
- [source/loaders/node_loader/source/node_loader_impl.cpp478-477](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L478-L477)

### Function Execution

When a JavaScript function is called through MetaCall, the following process occurs:

The function calling process:

1.  MetaCall calls `function_node_interface_invoke` with a function and arguments
2.  The arguments are converted from MetaCall values to Node.js values
3.  A thread-safe function is used to invoke the JavaScript function in the Node.js thread
4.  The JavaScript function executes and returns a result
5.  The result is converted back to a MetaCall value
6.  The converted result is returned to MetaCall

- [source/loaders/node_loader/source/node_loader_impl.cpp479-508](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L479-L508)
- [source/loaders/node_loader/source/node_loader_impl.cpp853-862](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L853-L862)

## Asynchronous Support

One of the most powerful features of the Node.js Loader is its support for asynchronous JavaScript code, including Promises and async/await.

### Promise and Async/Await Support

The Node.js Loader provides special handling for asynchronous JavaScript code:

1.  When an async function or Promise is called via MetaCall, the loader creates a JavaScript Promise
2.  The Promise is linked to MetaCall's callback system via trampolines
3.  When the Promise resolves or rejects, the corresponding MetaCall callback is invoked
4.  Results are converted between Node.js and MetaCall value systems

The `function_node_interface_await` function handles this process, allowing MetaCall code to work with JavaScript Promises in a natural way.

Example from bootstrap.js:

- [source/loaders/node_loader/bootstrap/lib/bootstrap.js345-378](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L345-L378)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js380-409](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L380-L409)
- [source/loaders/node_loader/source/node_loader_impl.cpp505-508](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L505-L508)
- [source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp75-143](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp#L75-L143)

## Type Conversion

The Node.js Loader includes a sophisticated type conversion system that translates between Node.js values and MetaCall values.

### Type Mapping

| MetaCall Type | Node.js Type              | Conversion Function                      |
| ------------- | ------------------------- | ---------------------------------------- |
| `NULL`        | `undefined` or `null`     | `node_loader_impl_value_create_null`     |
| `BOOL`        | `Boolean`                 | `node_loader_impl_value_create_bool`     |
| `CHAR`        | `String` (length 1)       | `node_loader_impl_value_create_char`     |
| `SHORT`       | `Number`                  | `node_loader_impl_value_create_short`    |
| `INT`         | `Number`                  | `node_loader_impl_value_create_int`      |
| `LONG`        | `Number` or `BigInt`      | `node_loader_impl_value_create_long`     |
| `FLOAT`       | `Number`                  | `node_loader_impl_value_create_float`    |
| `DOUBLE`      | `Number`                  | `node_loader_impl_value_create_double`   |
| `STRING`      | `String`                  | `node_loader_impl_value_create_string`   |
| `BUFFER`      | `Buffer` or `ArrayBuffer` | `node_loader_impl_value_create_buffer`   |
| `ARRAY`       | `Array`                   | `node_loader_impl_value_create_array`    |
| `MAP`         | `Object`                  | `node_loader_impl_value_create_map`      |
| `PTR`         | N-API External            | `node_loader_impl_value_create_ptr`      |
| `FUTURE`      | `Promise`                 | `node_loader_impl_value_create_future`   |
| `FUNCTION`    | `Function`                | `node_loader_impl_value_create_function` |

### Node.js to MetaCall Conversion

The conversion from Node.js values to MetaCall values is handled by the `node_loader_impl_napi_to_value` function:

The conversion process:

1.  Determine the type of the Node.js value
2.  Apply the appropriate conversion function
3.  Create a MetaCall value of the corresponding type
4.  Handle special cases like Maps, Arrays, Functions, and Promises

- [source/loaders/node_loader/source/node_loader_impl.cpp1210-1529](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1210-L1529)

### MetaCall to Node.js Conversion

The conversion from MetaCall values to Node.js values is handled by the `node_loader_impl_value_to_napi` function:

- [source/loaders/node_loader/source/node_loader_impl.cpp1530-1827](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L1530-L1827)

## Thread Safety and Interoperability

The Node.js Loader uses a complex system to ensure thread safety when interacting between MetaCall's threads and Node.js's event loop.

### Thread-Safe Communication

The Node.js Loader uses N-API's thread-safe functions to safely communicate between MetaCall's thread and the Node.js event loop thread. This ensures that JavaScript code always executes on the Node.js thread, while allowing MetaCall to make calls from any thread.

Key components of the thread-safety system:

1.  **Thread-safe function wrappers**: `loader_impl_threadsafe_type` template class that wraps N-API's thread-safe functions
2.  **Async context structures**: Structures like `loader_impl_async_func_call_safe_type` that carry data between threads
3.  **Mutex and condition variables**: Used for synchronization between threads
4.  **Event loop integration**: The loader ensures that JavaScript code executes on the Node.js event loop

- [source/loaders/node_loader/source/node_loader_impl.cpp166-407](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L166-L407)
- [source/loaders/node_loader/source/node_loader_impl.cpp879-889](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L879-L889)

## Build and Configuration

The Node.js Loader has several build and configuration options that control its behavior.

### Build Dependencies

The Node.js Loader requires:

1.  Node.js development headers (v10 or later)
2.  V8 JavaScript engine headers
3.  libuv headers (if not using shared libuv)

### Configuration Options

The loader can be configured using CMake options:
| Option | Description |
| --- | --- |
| `OPTION_BUILD_LOADERS_NODE` | Enable or disable building the Node.js loader |
| `NodeJS_CMAKE_DEBUG` | Print paths for debugging Node.js dependencies |
| `NodeJS_EXECUTABLE_ONLY` | Find only Node.js executable (avoid library and include files) |
| `NodeJS_SHARED_UV` | If enabled, libuv won't be required by this script |
| `NodeJS_BUILD_FROM_SOURCE` | If enabled, Node.js runtime library will be built from source |
| `NodeJS_BUILD_WITHOUT_ICU` | If enabled, Node.js runtime library will be built without internationalization support |
| `NodeJS_INSTALL_PREFIX` | Define a custom install prefix for Node.js (Linux / Darwin only) |

- [source/loaders/node_loader/CMakeLists.txt1-43](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/CMakeLists.txt#L1-L43)
- [cmake/FindNodeJS.cmake6-35](https://github.com/metacall/core/blob/af9cad19/cmake/FindNodeJS.cmake#L6-L35)
- [cmake/FindNodeJS.cmake408-623](https://github.com/metacall/core/blob/af9cad19/cmake/FindNodeJS.cmake#L408-L623)

### Building the Node.js Loader

The build process for the Node.js Loader involves:

1.  Finding Node.js dependencies (headers and libraries)
2.  Building or downloading the Node.js library if not available
3.  Building the loader module
4.  Installing the bootstrap.js file and dependencies

If the Node.js library is not found, the build system can automatically download and build it from source, which is useful for systems where the Node.js shared library is not available.

- [source/loaders/node_loader/CMakeLists.txt1-274](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/CMakeLists.txt#L1-L274)
- [source/loaders/node_loader/bootstrap/CMakeLists.txt1-115](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/CMakeLists.txt#L1-L115)

## Limitations and Known Issues

### Known Issues

1.  **Fork Safety**: The Node.js Loader is not completely fork-safe due to how Node.js thread pools work with Linux's fork-one strategy.

    ```
    To solve the deadlock we have to make MetaCall fork tolerant.
    The problem is that when Linux makes a fork it uses fork-one strategy, this means
    that only the caller thread is cloned, the others are not, so the NodeJS thread pool
    does not survive. When the thread pool tries to continue it blocks the whole application.
    ```

2.  **Node.js Initialization**: Node.js cannot be reinitialized, which complicates detour mechanisms.

    ```
    Detour method is not valid because of NodeJS cannot be reinitialized, platform pointer already initialized in CHECK macro
    ```

3.  **Multi-Isolate Support**: The current implementation may not fully support multi-isolate environments.

    ```
    TODO: The current implementation may not support multi-isolate environments. We should test it.
    ```

4.  **Memory Management**: Special care must be taken with memory management across language boundaries.

- [source/loaders/node_loader/source/node_loader_impl.cpp125-147](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L125-L147)
- [source/loaders/node_loader/source/node_loader_impl.cpp704-706](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L704-L706)

## Usage Examples

### Loading and Calling JavaScript Code

### Working with Asynchronous Functions

- [source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp36-264](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_async_test/source/metacall_node_async_test.cpp#L36-L264)

## Internal Components

### Trampoline System

The Node.js Loader uses a trampoline system to bridge between native code and JavaScript. The trampoline component implements functions that can be called from JavaScript and forwards them to the appropriate native implementations.

Key trampoline functions include:

1.  `node_loader_trampoline_register`: Registers native functions with JavaScript
2.  `node_loader_trampoline_resolve`: Handles promise resolution
3.  `node_loader_trampoline_reject`: Handles promise rejection
4.  `node_loader_trampoline_destroy`: Cleans up resources

- [source/loaders/node_loader/source/node_loader_trampoline.cpp12-347](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_trampoline.cpp#L12-L347)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js411-457](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L411-L457)

### Bootstrap Module

The bootstrap.js module is the JavaScript component of the Node.js Loader, providing:

1.  JavaScript implementations of loader functions
2.  Integration with Node.js's module system
3.  Function introspection using the espree parser
4.  Promise and async/await support

The bootstrap module is loaded when the Node.js runtime initializes and serves as the bridge between native code and JavaScript.

- [source/loaders/node_loader/bootstrap/lib/bootstrap.js1-457](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L1-L457)
- [source/loaders/node_loader/bootstrap/CMakeLists.txt1-115](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/CMakeLists.txt#L1-L115)

## Integration with TypeScript

The Node.js Loader serves as the foundation for the TypeScript Loader, which extends its capabilities to support TypeScript code. The TypeScript Loader is implemented as a child loader of the Node.js Loader, using the same fundamental mechanisms but adding TypeScript-specific functionality.

The relationship between the Node.js Loader and TypeScript Loader is shown below:

For more information about the TypeScript Loader, see the TypeScript Loader documentation.

- [source/loaders/ts_loader/bootstrap/lib/bootstrap.ts1-51](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/lib/bootstrap.ts#L1-L51)
- [source/loaders/ts_loader/bootstrap/CMakeLists.txt1-146](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/CMakeLists.txt#L1-L146)
