---
title: Value Types
---

# Value Types

The MetaCall Value Types system provides a unified type representation for cross-language interoperability. This foundational component enables seamless data conversion between different programming languages by defining a common set of data types and operations. Value Types serve as the bridge between language-specific type systems, allowing MetaCall to pass arguments and return values across language boundaries.
For information about serialization formats used with these value types, see [Serialization Formats](./serialization-formats.md).
## Type System Overview

MetaCall's type system consists of primitive types (like integers and strings) and composite types (like arrays and maps). These types are defined as an enumeration in the core API:

### Supported Types

| Type ID            | Description            | C Type Representation     | Common Usage                       |
| ------------------ | ---------------------- | ------------------------- | ---------------------------------- |
| METACALL_BOOL      | Boolean value          | `boolean` (unsigned char) | Logical values (true/false)        |
| METACALL_CHAR      | Character              | `char`                    | Single character values            |
| METACALL_SHORT     | Short integer          | `short`                   | Small numeric values               |
| METACALL_INT       | Integer                | `int`                     | Standard numeric values            |
| METACALL_LONG      | Long integer           | `long`                    | Larger numeric values              |
| METACALL_FLOAT     | Single-precision float | `float`                   | Decimal values (limited precision) |
| METACALL_DOUBLE    | Double-precision float | `double`                  | Decimal values (higher precision)  |
| METACALL_STRING    | String                 | `char *`                  | Text data                          |
| METACALL_BUFFER    | Binary buffer          | `void *`                  | Raw binary data                    |
| METACALL_ARRAY     | Array of values        | `value *`                 | Sequential collections of values   |
| METACALL_MAP       | Key-value map          | `value *` (of tuples)     | Associative collections of values  |
| METACALL_PTR       | Pointer                | `void *`                  | References to arbitrary memory     |
| METACALL_FUTURE    | Async future           | `future`                  | Asynchronous operation results     |
| METACALL_FUNCTION  | Function reference     | `function`                | References to callable functions   |
| METACALL_NULL      | Null value             | `void *` (NULL)           | Absence of value                   |
| METACALL_CLASS     | Class reference        | `klass`                   | References to class definitions    |
| METACALL_OBJECT    | Object reference       | `object`                  | References to objects              |
| METACALL_EXCEPTION | Exception              | `exception`               | Error information                  |
| METACALL_THROWABLE | Throwable              | `throwable`               | Encapsulated exceptions            |

## Value Memory Model

MetaCall values have a simple but effective memory layout consisting of two parts:

1.  **Value Data**: The actual data content of the value
2.  **Type Header**: The type ID metadata appended to the end

The internal representation adds the type ID at the end of the memory block, which allows for efficient value operations while maintaining type safety. This layout enables MetaCall to determine the type of any value at runtime by accessing the type ID at a known offset from the end of the value.

## Working with Values

### Value Creation

MetaCall provides a comprehensive set of functions for creating values of different types:

Each value type has a corresponding creation function that takes appropriate arguments for that type. For example:

- `metacall_value_create_int(int i)` creates an integer value
- `metacall_value_create_string(const char *str, size_t length)` creates a string value
- `metacall_value_create_array(const void *values[], size_t size)` creates an array value

### Value Extraction

To access the data contained in a value, MetaCall provides extraction functions corresponding to each value type:

### Type Checking

Type safety is an important aspect of working with MetaCall values. The API provides functions to check the type of a value:

- `metacall_value_id(void *v)` returns the type ID of a value
- `metacall_value_type_name(void *v)` returns a human-readable name of the value's type

## Value Type Conversion

MetaCall supports type casting between compatible types. For example, you can cast an integer to a float or a string to a numeric type:

The type conversion system uses rules similar to those in C, with additional support for conversions between more complex types.

## Complex Types

### Arrays and Maps

Arrays and maps are composite types that can contain multiple values:

- **Arrays**: Ordered collections of values accessible by index
- **Maps**: Key-value collections where each key maps to a value

For maps, keys and values are stored as tuples (arrays of two elements), where the first element is the key and the second is the value.

### Functions and Objects

MetaCall also supports more complex types like functions, classes, and objects:

- **Functions**: References to callable code
- **Classes**: Templates for creating objects
- **Objects**: Instances of classes with state and behavior

These types are especially important for the foreign function interface, as they allow passing callable functions between language boundaries.

## Memory Management

### Value Lifecycle

MetaCall values must be explicitly destroyed when no longer needed to avoid memory leaks. The API provides functions for managing value lifecycle:

- `metacall_value_copy(void *v)` creates a deep copy of a value
- `metacall_value_destroy(void *v)` frees the memory used by a value

Complex types like functions, objects, and classes use reference counting to manage their lifecycle properly.

## Serialization Integration

The value type system integrates with MetaCall's serialization system, allowing values to be converted to and from string formats like JSON:

The RapidJSON serializer is the default implementation that converts MetaCall values to JSON strings and vice versa. It handles all the value types appropriately:

- Primitive types are converted to their JSON equivalents
- Arrays become JSON arrays
- Maps become JSON objects
- Complex types (functions, objects) are serialized as JSON strings

## Cross-Language Type Interoperability

One of the primary purposes of the value type system is to facilitate cross-language function calls. When calling a function through MetaCall, arguments are converted from the source language to MetaCall values, then to the target language's native types:

Each language loader in MetaCall implements this bidirectional conversion between the language's native types and MetaCall's value types.

## Error Handling

The value system includes special types for error handling:

- **METACALL_EXCEPTION**: Represents a caught exception with message, label, and stack trace
- **METACALL_THROWABLE**: Wraps an exception value that was thrown but not caught

These types allow exceptions to be propagated across language boundaries, preserving error information.

## Best Practices

When working with MetaCall values, follow these best practices:

1.  **Type Safety**: Always check the type of a value before attempting to extract its content
2.  **Memory Management**: Destroy values when they are no longer needed to avoid memory leaks
3.  **Type Conversion**: Use the appropriate conversion functions when types don't match exactly
4.  **Value Ownership**: Be aware of who owns a value and who is responsible for destroying it
5.  **Error Handling**: Use METACALL_EXCEPTION and METACALL_THROWABLE for robust error propagation

By following these practices, you can effectively leverage MetaCall's value type system for cross-language interoperability.

Sources: [source/tests/metacall_test/source/metacall_test.cpp224-274](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp#L224-L274) [source/metacall/source/metacall.c1139-1162](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L1139-L1162)
