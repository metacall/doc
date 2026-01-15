---
title: Go Port
---

# Go Port

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [source/ports/go_port/source/README.md](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/README.md)
- [source/ports/go_port/source/await.go](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/await.go)
- [source/ports/go_port/source/go.mod](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/go.mod)
- [source/ports/go_port/source/go.sum](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/go.sum)
- [source/ports/go_port/source/go_port.go](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/go_port.go)
- [source/ports/go_port/source/go_port_test.go](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/go_port_test.go)
- [source/ports/go_port/source/pointer.go](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/pointer.go)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

The Go Port enables Go applications to interoperate with code written in other programming languages supported by MetaCall. This port provides a thin wrapper around the MetaCall C API, allowing Go developers to load and execute code written in Python, JavaScript, Ruby, and other languages directly from Go code.

For information about other language ports, see [Port System](/metacall/core/2.3-port-system).

## 1\. Overview

The Go Port allows Go applications to:

- Load code from other languages
- Call functions defined in those languages
- Handle async functions with promises
- Convert values between Go and other programming languages

## 2\. Architecture

The Go Port uses CGO to interface with the MetaCall C API. It follows a thread-safe design to ensure that all calls to the MetaCall C API happen in a consistent environment.

### 2.1 Thread Safety

The Go Port ensures thread safety by:

1.  Running all MetaCall C API calls in a single goroutine
2.  Using a channel-based work queue to dispatch operations
3.  Locking the OS thread to maintain a consistent environment for the C API
4.  Using synchronization primitives to coordinate operations

This approach prevents race conditions and ensures that MetaCall's internal state remains consistent.

## 3\. Installation and Setup

### 3.1 Prerequisites

Before using the Go Port, you must have MetaCall installed on your system.

1.  Build and install MetaCall from source, or
2.  Install precompiled binaries

### 3.2 Go Module Installation

To use the Go Port in your Go application:

```
go get github.com/metacall/core/source/ports/go_port/source
```

### 3.3 Environment Setup

When using precompiled binaries on Linux, you may need to set the following environment variables:

```
export CGO_CFLAGS="-I/gnu/store/`ls /gnu/store/ | grep metacall | head -n 1`/include"
export CGO_LDFLAGS="-L/gnu/store/`ls /gnu/store/ | grep metacall | head -n 1`/lib"
export LD_LIBRARY_PATH="/gnu/store/`ls /gnu/store/ | grep metacall | head -n 1`/lib"
```

## 4\. API Reference

### 4.1 Initialization and Shutdown

Function

Description

`Initialize()`

Initializes the MetaCall runtime and starts the worker goroutine

`Destroy()`

Shuts down the MetaCall runtime and stops the worker goroutine

### 4.2 Loading Code

Function

Description

`LoadFromFile(tag string, scripts []string) error`

Loads code from file paths

`LoadFromMemory(tag string, buffer string) error`

Loads code from a string buffer

Parameters:

- `tag`: The language tag (e.g., "py", "node", "rb", "ts")
- `scripts`: Array of script file paths or code string
- Returns an error if loading fails

### 4.3 Calling Functions

Function

Description

`Call(function string, args ...interface{}) (interface{}, error)`

Calls a function with arguments

`Await(function string, resolve, reject awaitCallback, ctx interface{}, args ...interface{}) (interface{}, error)`

Calls an async function with callbacks

Parameters:

- `function`: The function name to call
- `args`: Variable arguments to pass to the function
- For `Await`:
  - `resolve`: Callback for successful completion
  - `reject`: Callback for error handling
  - `ctx`: User context passed to callbacks
- Returns the function result and any error

## 5\. Type Conversion

The Go Port handles type conversion between Go types and MetaCall value types.

### 5.1 Go to MetaCall Conversion

Go Type

MetaCall Type

`nil`

`Null`

`bool`

`Bool`

`byte`

`Char`

`int16`

`Short`

`int`

`Int`

`int64`

`Long`

`float32`

`Float`

`float64`

`Double`

`string`

`String`

`bytes.Buffer`

`Buffer`

`slice`

`Array`

`array`

`Array`

`map`

`Map`

### 5.2 MetaCall to Go Conversion

MetaCall Type

Go Type

`METACALL_NULL`

`nil`

`METACALL_BOOL`

`bool`

`METACALL_CHAR`

`byte`

`METACALL_SHORT`

`int16`

`METACALL_INT`

`int`

`METACALL_LONG`

`int64`

`METACALL_FLOAT`

`float32`

`METACALL_DOUBLE`

`float64`

`METACALL_STRING`

`string`

`METACALL_BUFFER`

`bytes.Buffer`

`METACALL_ARRAY`

`[]interface{}`

`METACALL_MAP`

`map[string]interface{}`

## 6\. Working with Asynchronous Functions

The Go Port supports calling asynchronous functions (like JavaScript promises) through the `Await` function. This allows Go code to interact with asynchronous code from other languages.

The `awaitCallback` type is defined as:

Where:

- First parameter: Value from async function
- Second parameter: User context
- Return value: New value to pass back to MetaCall

## 7\. Usage Examples

### 7.1 Basic Usage

### 7.2 Working with Async Functions

## 8\. Thread Safety and Memory Management

### 8.1 Pointer Management

The Go Port maintains a registry of Go pointers to allow callbacks from C code to access Go objects safely. This is implemented through a map protected by a mutex.

### 8.2 Memory Safety

The Go Port ensures memory safety by:

1.  Properly deallocating C memory in defer statements
2.  Keeping track of Go objects referenced by C code
3.  Using goroutines and channels to coordinate between Go and C
4.  Maintaining a strict synchronization model

## 9\. Performance Considerations

The Go Port includes benchmark tests that measure the performance of various operations. When working with the Go Port, consider:

1.  The overhead of crossing the CGO boundary
2.  The cost of type conversions for complex types
3.  The synchronization overhead of the thread-safe design

For performance-critical applications, batch operations where possible to minimize the number of cross-language calls.

Sources: [source/ports/go_port/source/go_port_test.go202-239](https://github.com/metacall/core/blob/af9cad19/source/ports/go_port/source/go_port_test.go#L202-L239)
