---
title: Serialization and Value System
---

# Serialization and Value System

The MetaCall Serialization and Value System provides a unified way to represent and convert data between different programming languages, as well as serialize and deserialize this data for storage or transmission. This is a core component of MetaCall that enables seamless cross-language interoperability.

## Purpose and Scope

This document covers:

- The value representation system used by MetaCall to work with data across language boundaries
- The serialization mechanisms that convert between MetaCall values and serialized formats
- The API for working with values and serialization in MetaCall

For information about how values are used in function calls, see [Core API](./core-api.md). For information about language-specific type conversion, see [Loaders](./loaders.md).

## Value System Architecture

### Value Structure

In MetaCall, values are represented using an opaque pointer type called `value`. Each value internally consists of:

1.  **Data Section**: Contains the actual value data (e.g., integers, strings, arrays)
2.  **Type Header Section**: Contains a `type_id` that identifies the type of value

This design allows MetaCall to:

- Store any type of data in a unified container
- Determine the type of value at runtime
- Convert between different value types when appropriate

The value memory layout is:

```
+----------------+-------------+
| Data (n bytes) | type_id (4) |
+----------------+-------------+
```

### Supported Value Types

MetaCall supports a wide range of value types to accommodate different programming languages:
| Type ID | C Type | Description |
| --- | --- | --- |
| TYPE_BOOL | boolean | Boolean value (0 or 1) |
| TYPE_CHAR | char | Single character |
| TYPE_SHORT | short | 16-bit integer |
| TYPE_INT | int | 32-bit integer |
| TYPE_LONG | long | 64-bit integer |
| TYPE_FLOAT | float | Single-precision floating-point |
| TYPE_DOUBLE | double | Double-precision floating-point |
| TYPE_STRING | char\* | Null-terminated string |
| TYPE_BUFFER | void\* | Binary data buffer |
| TYPE_ARRAY | value\* | Array of values |
| TYPE_MAP | value\* | Key-value pairs (as array of tuples) |
| TYPE_PTR | void\* | Generic pointer |
| TYPE_FUNCTION | function | Function handle |
| TYPE_NULL | NULL | Null value |
| TYPE_CLASS | klass | Class definition |
| TYPE_OBJECT | object | Object instance |
| TYPE_EXCEPTION | exception | Exception object |
| TYPE_THROWABLE | throwable | Wrapped exception |

### Value API

The Value API provides functions for creating, accessing, converting, and managing values:

1.  **Creation Functions**: `value_create_*` / `metacall_value_create_*`
    - Create values of specific types (e.g., `metacall_value_create_int(5)`)

2.  **Conversion Functions**: `value_to_*` / `metacall_value_to_*`
    - Extract data from values in specific types (e.g., `metacall_value_to_int(v)`)

3.  **Type Information**: `value_type_id` / `metacall_value_id`
    - Get the type ID of a value

4.  **Value Operations**:
    - `value_type_copy` / `metacall_value_copy`: Deep copy a value
    - `value_type_cast` / `metacall_value_cast`: Convert between value types
    - `metacall_value_destroy`: Free memory used by a value

## Serialization System

The Serialization System provides a bridge between MetaCall's internal value representation and various serialized formats like JSON. This enables:

1.  **Data Exchange**: Transfer data between different systems
2.  **Persistence**: Store values in a standardized format
3.  **Function Calls**: Pass arguments to functions as serialized strings

### Serialization Formats

MetaCall uses a plugin-based approach for serialization, with the default implementation being RapidJSON. The default format can be accessed using `metacall_serial()`, which returns `"rapid_json"`.

### Serialization Process

The serialization process maps MetaCall values to appropriate representations in the target format:

For compound types:

- **Arrays** are serialized as JSON arrays
- **Maps** are serialized as JSON objects
- **Complex objects** (functions, classes) are serialized to descriptive strings

### Deserialization Process

Deserialization converts serialized data back into MetaCall values, with type detection based on the serialized format:

### Serialization API

The key functions in the serialization API are:
| Function | Description |
| --- | --- |
| `metacall_serialize(const char *name, void *v, size_t *size, void *allocator)` | Serialize a value to a string using the specified format |
| `metacall_deserialize(const char *name, const char *buffer, size_t size, void *allocator)` | Deserialize a string into a value using the specified format |

## Integration with MetaCall Core

The Serialization and Value System is a fundamental part of MetaCall's architecture, enabling cross-language function calls by providing:

1.  **Common Value Representation**: A unified way to represent data from different languages
2.  **Type Conversion**: Converting between language-specific types and MetaCall values
3.  **Function Call Serialization**: Passing function arguments as serialized strings

### Value System in Function Calls

When calling functions across language boundaries, MetaCall uses the value system to:

1.  Convert input arguments to MetaCall values
2.  Call the function with these values
3.  Convert the return value back to the caller's language

### Serialized Function Calls

MetaCall also supports calling functions with serialized arguments using the `metacallfs` and `metacallfms` functions:

## API Reference

### Value Creation and Conversion

### Serialization

## Best Practices

1.  **Memory Management**: Always destroy values with `metacall_value_destroy` when you're done with them
2.  **Type Safety**: Check the value type with `metacall_value_id` before conversion
3.  **Serialization Error Handling**: Check for NULL returns from serialization/deserialization functions
4.  **Value Copying**: Use `metacall_value_copy` when you need to keep a value beyond its original scope
5.  **Performance**: Avoid unnecessary serialization/deserialization when possible

Sources: [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp) [source/tests/serial_test/source/serial_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp)
