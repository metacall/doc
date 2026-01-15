---
title: Core API
---

# Core API

## Relevant source files

- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/include/metacall/metacall_value.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall_value.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/metacall/source/metacall_value.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall_value.c)
- [source/reflect/include/reflect/reflect_type_id.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_type_id.h)
- [source/reflect/include/reflect/reflect_value_type.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_value_type.h)
- [source/reflect/source/reflect_type_id.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_type_id.c)
- [source/reflect/source/reflect_value_type.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type.c)
- [source/reflect/source/reflect_value_type_cast.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type_cast.c)
- [source/reflect/source/reflect_value_type_id_size.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type_id_size.c)
- [source/serials/metacall_serial/source/metacall_serial_impl_serialize.c](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/source/metacall_serial_impl_serialize.c)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)
- [source/tests/serial_test/source/serial_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp)

The MetaCall Core API provides the fundamental interface for interoperating between different programming languages. It enables loading code from various languages, executing functions across language boundaries, and handling data conversion between different type systems.

This page documents the C API that serves as the foundation for all MetaCall functionality. For language-specific ports that provide native bindings, see [Ports](./ports.md).

## Core API Architecture

## API Workflow

## 1\. Initialization API

Before using any MetaCall functionality, the library must be initialized.

### Basic Initialization

This initializes the MetaCall runtime with default settings. Returns 0 on success, non-zero on failure.

### Advanced Initialization

The `options_value` must be a MetaCall map value containing configuration options for the specified loader.

### Command-line Arguments

For applications that need to pass command-line arguments to language runtimes:

### Checking Initialization Status

## 2\. Loading Code API

MetaCall provides multiple ways to load code from different sources.

### Loading from Files

The `tag` parameter ("py" in this example) specifies the language loader to use. Supported tags include:

- "py" for Python
- "node" or "js" for JavaScript (Node.js)
- "rb" for Ruby
- "cs" for C#
- "c" for C
- "java" for Java
- "ts" for TypeScript
- "file" for static files

The `handle` parameter is optional:

- If NULL, functions are loaded into the global scope
- If a pointer to NULL, a new handle is created for the loaded code
- If a pointer to an existing handle, functions are added to that handle

### Loading from Memory

### Loading from Package

### Loading from Configuration

The configuration file format is:

### Setting Execution Paths

Before loading code, you can define execution paths for the loader to search for imports:

## 3\. Function Calling API

MetaCall offers several ways to call functions across language boundaries.

### Basic Function Call

The arguments are automatically converted to appropriate MetaCall values based on their C types.

### Vector-Based Function Call

### Typed Function Call

### Handle-Specific Function Call

When using handles to avoid name collisions:

### Function References

For repeated calls to the same function:

For handle-specific function references:

### Function Introspection

## 4\. Value System

The MetaCall value system provides a common representation for data across language boundaries.

### Value Types

MetaCall supports the following value types:

Value Type ID

C Type

Description

METACALL_BOOL

boolean

Boolean value (0 or 1)

METACALL_CHAR

char

Single character

METACALL_SHORT

short

Short integer

METACALL_INT

int

Integer

METACALL_LONG

long

Long integer

METACALL_FLOAT

float

Single-precision floating point

METACALL_DOUBLE

double

Double-precision floating point

METACALL_STRING

char\*

Null-terminated string

METACALL_BUFFER

void\*

Binary data buffer

METACALL_ARRAY

void\*\*

Array of values

METACALL_MAP

void\*\*

Key-value pairs

METACALL_PTR

void\*

Opaque pointer

METACALL_FUNCTION

void\*

Function reference

METACALL_NULL

NULL

Null value

METACALL_CLASS

void\*

Class definition

METACALL_OBJECT

void\*

Object instance

METACALL_EXCEPTION

void\*

Exception

METACALL_THROWABLE

void\*

Value with exception

### Creating Values

### Converting Values

### Value Operations

## 5\. Serialization

MetaCall provides serialization capabilities for converting values to and from string representations.

### Serializing Values

### Deserializing Values

The default serialization format is RapidJSON, accessed via:

## 6\. Error Handling

MetaCall provides error handling mechanisms for dealing with exceptions and errors that occur during cross-language calls.

### Checking for Errors

### Using Throwable Values

## 7\. Memory Management

Proper memory management is critical when using the MetaCall Core API.

### Value Lifecycle

1.  Values created with `metacall_value_create_*` functions must be explicitly destroyed with `metacall_value_destroy`
2.  Values returned from `metacall` and related functions must also be destroyed
3.  Values borrowed from arrays or maps should not be destroyed individually

### Custom Allocators

MetaCall allows using custom allocators for serialization and deserialization:

## 8\. Advanced Features

### Function Registration

Register C functions to be callable from other languages:

### Handle Management

Create and manage handles to isolate loaded code:

### Inspecting Loaded Code

## 9\. Shutdown

When you're finished using MetaCall, properly clean up resources:

This function:

1.  Unloads all loaded code
2.  Destroys all loaders and handles
3.  Cleans up all allocated resources

## Type System Relationships

## Function Call Flow

## Example Usage

Simple Python function call from C:

Sources: [source/tests/metacall_test/source/metacall_test.cpp161-179](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp#L161-L179)
