---
title: Core Components
---

# Core Components

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

The Core Components form the foundation of MetaCall, providing essential functionality for cross-language function calls. This page details the internal systems that enable code written in different programming languages to seamlessly interact: the Core API, reflection system, value system, serialization, and detour mechanisms.

For information about language-specific runtimes, see [Loader System](./loader-system.md). For information about language-specific interfaces to MetaCall, see [Port System](./port-system.md).

## Core Architecture

The following diagram illustrates the main components within MetaCall Core and how they interact:

## MetaCall API

The MetaCall API provides the public interface for applications to interact with the system. It exposes functions for initialization, code loading, and cross-language function calls.

### Initialization Process

The initialization sequence is implemented in [source/metacall/source/metacall.c222-341](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L222-L341) covering:

1.  **Detour initialization**: Sets up function hooking capabilities
2.  **Configuration initialization**: Loads settings using the default serializer (RapidJSON)
3.  **Loader initialization**: Prepares the loader system for loading code from different languages

Key initialization functions include:

- `metacall_initialize()`: Standard initialization
- `metacall_initialize_ex()`: Initialization with extended configuration options
- `metacall_is_initialized()`: Checks initialization status

### Code Loading

MetaCall provides multiple ways to load code from different languages:

Function

Purpose

Key Implementation

`metacall_load_from_file()`

Load code from files

[source/metacall/source/metacall.c446-473](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L446-L473)

`metacall_load_from_memory()`

Load code from memory buffers

[source/metacall/source/metacall.c475-478](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L475-L478)

`metacall_load_from_package()`

Load code from packages

[source/metacall/source/metacall.c480-483](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L480-L483)

`metacall_load_from_configuration()`

Load code based on configuration

[source/metacall/source/metacall.c485-488](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L485-L488)

These functions delegate to the loader system, which handles language-specific loading.

### Function Calling

The core function calling mechanism is implemented through several variants:

Key function calling methods:

- `metacall()`: Call by name with variable arguments [source/metacall/source/metacall.c556-661](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L556-L661)
- `metacallv()`: Call by name with array of values [source/metacall/source/metacall.c490-502](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L490-L502)
- `metacallfv()`: Call a function reference with array of values [source/metacall/source/metacall.c1112-1188](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L1112-L1188)
- `metacallfs()`: Call a function with serialized arguments [source/metacall/source/metacall.c1274-1375](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L1274-L1375)

## Reflection System

The Reflection System provides introspection capabilities, allowing MetaCall to discover and represent functions, objects, and types across language boundaries.

Key reflection components:

1.  **Context**: Represents a loading context that contains scopes and symbols
    - Each loader and handle has its own context
    - Global context combines symbols from multiple sources
    - Implemented in `reflect_context.c`

2.  **Scope**: A namespace containing functions, classes, and other symbols
    - Used to look up symbols by name
    - Implemented in `reflect_scope.c`

3.  **Function**: Represents a callable function with signature information
    - Contains metadata about parameters and return types
    - Stores implementation details for invocation
    - Implemented in `reflect_function.c`

4.  **Type**: Describes data types for function parameters and return values
    - Used for type checking and conversion
    - Implemented in `reflect_type.c`

When code is loaded, the loader discovers functions and other symbols, creating reflection objects that represent them. These are then registered in the appropriate scope and context, making them available for invocation.

## Value System

The Value System handles data representation and conversion between different languages. It provides a common format for passing values across language boundaries.

### Type Hierarchy

The type system is defined in [source/reflect/include/reflect/reflect_type_id.h30-54](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_type_id.h#L30-L54) and includes:

1.  **Primitive Types**: Boolean, character, and numeric types
2.  **Complex Types**: String, buffer, array, map, and pointer types
3.  **Function Types**: Function and future types
4.  **Special Types**: Null, class, object, exception, and throwable types

### Value Operations

The Value System provides operations for creating, converting, and manipulating values:

Operation

Description

Implementation

Creation

Create values of specific types

`value_create_*()` functions in [source/reflect/source/reflect_value_type.c212-350](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type.c#L212-L350)

Conversion

Extract native types from values

`value_to_*()` functions in [source/reflect/source/reflect_value_type.c352-489](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type.c#L352-L489)

Casting

Convert between different value types

`value_type_cast()` in [source/reflect/source/reflect_value_type_cast.c21-538](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type_cast.c#L21-L538)

Reference

Create references to values

`value_type_reference()` in [source/reflect/source/reflect_value_type.c156-161](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type.c#L156-L161)

Each value consists of data and a type ID header, allowing for proper type handling across languages:

The Value System enables MetaCall to handle data seamlessly across language boundaries, providing automatic type conversion where appropriate.

## Serialization System

The Serialization System converts values to and from serialized formats (primarily JSON), enabling data interchange between different components.

The default serialization implementation, RapidJSON, is defined in [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp) and provides:

1.  **Serialization**: Converts MetaCall values to JSON strings
    - Implemented in `rapid_json_serial_impl_serialize_value()` [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp70-329](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L70-L329)

2.  **Deserialization**: Converts JSON strings to MetaCall values
    - Implemented in `rapid_json_serial_impl_deserialize_value()` [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp371-526](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L371-L526)

The serialization system is used for:

- Function calls that use serialized arguments (`metacallfs()`)
- Loading code from configuration
- Inspecting the state of loaded modules and functions

## Detours System

The Detours System provides function hooking capabilities, allowing interception and modification of function calls.

The Detours System is initialized during MetaCall startup [source/metacall/source/metacall.c260-285](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L260-L285) and provides:

1.  **Function Hooking**: Intercept calls to functions
2.  **Link System**: Manage connections between intercepted functions
3.  **Fork Safety**: Special handling for process forking scenarios

MetaCall uses the Funchook library for the actual function interception mechanism, as defined in [source/metacall/source/metacall.c135-137](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L135-L137)

## Cross-Language Function Call Flow

The following diagram illustrates the complete flow of a cross-language function call through the core components:

This sequence demonstrates how:

1.  The application calls `metacall()` with a function name and arguments
2.  Arguments are converted to MetaCall's internal value representation
3.  The function is looked up in the appropriate context
4.  Arguments are converted to the target language's types
5.  The function is executed in its native runtime
6.  The result is converted back to MetaCall's value representation
7.  The value is returned to the calling application

## Summary

The Core Components of MetaCall work together to enable seamless cross-language function calls:

- The **MetaCall API** provides a consistent interface for application developers
- The **Reflection System** handles introspection of functions and types
- The **Value System** manages data representation and conversion
- The **Serialization System** handles data interchange in standardized formats
- The **Detours System** enables function hooking for advanced use cases

These components form the foundation upon which MetaCall's multi-language capabilities are built, allowing developers to work in their preferred languages while easily integrating with code written in other languages.

Sources: [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c) [source/reflect/source/reflect_value_type.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_value_type.c) [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
