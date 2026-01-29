---
title: Value Handling
---

# Value Handling

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

The MetaCall Value System is a core component that enables cross-language function calls by providing a common value representation across different programming languages. This page explains how values are represented, created, manipulated, converted, and serialized within the MetaCall framework.

For information about calling functions with these values, see [Calling Functions](./calling-functions.md). For information about how values are serialized and transferred, see [Serialization and Value System](./serialization-and-value-system.md).

## Value System Architecture

The MetaCall Value System acts as a bridge between different programming languages by providing a common representation for data types. Each value in MetaCall encapsulates both the actual data and its type information, allowing for proper interpretation across language boundaries.

The value system is built around a few key components:

1.  **Value Container**: A memory block that stores both type information and actual data
2.  **Type ID System**: Enumeration that identifies the data type of a value
3.  **Type Conversions**: Mechanisms for converting between different value types
4.  **Value Operations**: Functions for creating, accessing, and destroying values

## Value Types

MetaCall supports a wide range of value types, which are defined in the `metacall_value_id` enumeration.

The type system is divided into several categories:

1.  **Primitive Types**: Boolean, characters, and numeric types (int, long, float, double)
2.  **String Types**: Character strings with length information
3.  **Container Types**: Arrays and maps for complex data structures
4.  **Special Types**: Functions, objects, classes, exceptions, and null values
5.  **Buffer Type**: Raw memory buffers for binary data

Each type has a corresponding human-readable name accessible through the `metacall_value_id_name()` function.

## Value Creation and Access

MetaCall provides a comprehensive API for creating and accessing values of different types.

### Creating Values

For each supported type, there is a corresponding creation function:
| Function | Purpose |
| --- | --- |
| `metacall_value_create_bool(boolean b)` | Create a boolean value |
| `metacall_value_create_char(char c)` | Create a character value |
| `metacall_value_create_int(int i)` | Create an integer value |
| `metacall_value_create_long(long l)` | Create a long integer value |
| `metacall_value_create_float(float f)` | Create a float value |
| `metacall_value_create_double(double d)` | Create a double value |
| `metacall_value_create_string(const char *str, size_t length)` | Create a string value |
| `metacall_value_create_buffer(const void *buffer, size_t size)` | Create a buffer value |
| `metacall_value_create_array(const void *values[], size_t size)` | Create an array value |
| `metacall_value_create_map(const void *tuples[], size_t size)` | Create a map value |
| `metacall_value_create_null()` | Create a null value |
| `metacall_value_create_function(void *f)` | Create a function value |
| `metacall_value_create_class(void *c)` | Create a class value |
| `metacall_value_create_object(void *o)` | Create an object value |
| `metacall_value_create_exception(void *ex)` | Create an exception value |
| `metacall_value_create_throwable(void *th)` | Create a throwable value |

### Accessing Values

Similarly, to extract data from a value, there are accessor functions:
| Function | Purpose |
| --- | --- |
| `metacall_value_to_bool(void *v)` | Extract boolean from value |
| `metacall_value_to_char(void *v)` | Extract character from value |
| `metacall_value_to_int(void *v)` | Extract integer from value |
| `metacall_value_to_long(void *v)` | Extract long integer from value |
| `metacall_value_to_float(void *v)` | Extract float from value |
| `metacall_value_to_double(void *v)` | Extract double from value |
| `metacall_value_to_string(void *v)` | Extract string from value |
| `metacall_value_to_buffer(void *v)` | Extract buffer from value |
| `metacall_value_to_array(void *v)` | Extract array from value |
| `metacall_value_to_map(void *v)` | Extract map from value |
| `metacall_value_to_null(void *v)` | Extract null from value |
| `metacall_value_to_function(void *v)` | Extract function from value |
| `metacall_value_to_class(void *v)` | Extract class from value |
| `metacall_value_to_object(void *v)` | Extract object from value |
| `metacall_value_to_exception(void *v)` | Extract exception from value |

### Value Lifecycle Example

## Type Conversions

MetaCall provides type conversion capabilities through the value casting system. This is essential for cross-language integration where different type systems need to be reconciled.

### Type Casting

The `value_type_cast` function handles conversions between different value types. It follows these rules:

1.  If source and destination types are the same, no conversion is necessary
2.  For numeric types, promotion (widening) or demotion (narrowing) is performed
3.  Conversions that would result in data loss are handled carefully
4.  Special conversions (e.g., between string and numeric types) are supported

### Automatic Type Conversion

During function calls, MetaCall attempts to automatically convert values to match the expected parameter types of the function:

This automatic conversion helps smooth the integration between languages with different type systems.

## Serialization and Deserialization

MetaCall uses serialization to convert values to and from string representations, which is crucial for interprocess communication and persistent storage.

### Serialization Process

The RapidJSON implementation handles the serialization of MetaCall values to JSON format. This process involves:

1.  Determining the type of the value
2.  Converting the value to an appropriate JSON representation
3.  Handling special types like functions, objects, and exceptions

### Example: Serializing Complex Values

For complex types like arrays and maps, the serialization process is recursive:

The deserialization process performs the reverse operation, converting JSON data back into MetaCall values.

## Memory Management

Value handling in MetaCall includes proper memory management to prevent leaks and ensure efficient resource usage.

### Value Lifecycle

1.  **Creation**: Values are created with `metacall_value_create_*` functions, allocating memory
2.  **Reference**: Values can be referenced to share data without copying
3.  **Copying**: Deep copies are created with `metacall_value_copy`
4.  **Destruction**: Values must be explicitly destroyed with `metacall_value_destroy`

### Memory Considerations

- Values with internal references (like arrays or maps) manage those references recursively
- Functions, classes, and objects use reference counting for proper cleanup
- When values are passed to function calls, they're automatically copied or cast as needed
- When function calls return values, the caller becomes responsible for destroying them

### Example: Memory Management in Function Calls

## Value Handling in Cross-Language Calls

The value system is a critical component in cross-language function calls. Here's an example of how values are processed during a function call:

This process ensures that data can be correctly passed between languages with different type systems.

## Conclusion

The MetaCall Value System provides a robust foundation for cross-language interoperability by:

1.  Offering a common representation for values across different programming languages
2.  Supporting a wide range of primitive and complex data types
3.  Providing automatic type conversion when possible
4.  Including serialization capabilities for data transport
5.  Ensuring proper memory management throughout the value lifecycle

Understanding the value system is essential for effectively using MetaCall to build polyglot applications.
