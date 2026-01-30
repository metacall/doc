---
title: Serialization Formats
---

# Serialization Formats

## Overview

The MetaCall Serialization system provides a framework for converting MetaCall values to and from various data formats. This system is essential for cross-language interoperability, remote procedure calls, and data persistence. The serialization framework is part of the larger MetaCall Core and works closely with the Value System to handle the conversion of data types across different languages and formats.

For information about the value types themselves, see [Value Types](./value-types.md).

## Serialization Architecture

The serialization system uses a plugin-based architecture where different serialization formats can be registered and used through a common interface.

### Serialization Components and Flow

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp49-68](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L49-L68)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp355-368](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L355-L368)

## Supported Serialization Formats

### 1\. JSON (RapidJSON)

The primary serialization format in MetaCall is JSON, implemented using the RapidJSON library. This format provides a comprehensive mapping between MetaCall values and standard JSON.

Type mappings:
| MetaCall Type | JSON Representation |
| --- | --- |
| Boolean | Boolean (true/false) |
| Char, Short, Int, Long | Number |
| Float, Double | Number (with decimal) |
| String | String |
| Buffer | Object with "data" array and "length" field |
| Array | Array |
| Map | Object |
| Pointer | String (memory address) |
| Function | String ("\[Function\]") |
| Future | String ("\[Future\]") |
| Class | String ("\[Class\]") |
| Object | String ("\[Object\]") |
| Null | null |
| Exception | Object with message, label, code, and stacktrace |
| Throwable | Object with "ExceptionThrown" property |

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp70-130](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L70-L130)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp131-216](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L131-L216)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp217-294](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L217-L294)

### 2\. MetaCall Native Format

The MetaCall native format is a simpler string-based representation primarily used for debugging and internal display. It uses format strings to represent values directly.

Format strings used in native serialization:

- [source/serials/metacall_serial/source/metacall_serial_impl_serialize.c83-106](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/source/metacall_serial_impl_serialize.c#L83-L106)
- [source/serials/metacall_serial/source/metacall_serial_impl_serialize.c145-186](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/source/metacall_serial_impl_serialize.c#L145-L186)

## Serialization and Deserialization Process

- [source/tests/serial_test/source/serial_test.cpp131-144](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L131-L144)
- [source/tests/serial_test/source/serial_test.cpp198-220](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L198-L220)

## Type Handling in RapidJSON Serialization

### Primitives and Simple Types

The RapidJSON serializer handles basic types like numbers, strings, and booleans directly:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp74-85](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L74-L85)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp98-102](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L98-L102)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp124-132](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L124-L132)

### Complex Types (Buffer, Array, Map)

Complex types require recursive processing:

#### Buffer Serialization

Buffer is serialized as a JSON object with "data" array and "length" field:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp134-173](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L134-L173)

#### Array Serialization

Array is serialized as a JSON array:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp175-192](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L175-L192)

#### Map Serialization

Map is serialized as a JSON object:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp194-216](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L194-L216)

### Special Types (Exception, Throwable)

Exception and throwable types have special handling:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp261-293](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L261-L293)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp295-313](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L295-L313)

## Deserialization Process

Deserialization follows a similar pattern but in reverse. The RapidJSON deserializer examines the JSON value type and creates the appropriate MetaCall value:

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp371-428](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L371-L428)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp434-472](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L434-L472)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp473-517](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L473-L517)

## Using the Serialization API

### Basic Usage Pattern

- [source/tests/serial_test/source/serial_test.cpp75-133](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L75-L133)
- [source/tests/serial_test/source/serial_test.cpp438-450](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L438-L450)

### Examples with Different Types

#### Serializing Primitive Values

- [source/tests/serial_test/source/serial_test.cpp374-435](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L374-L435)

#### Serializing Complex Types

- [source/tests/serial_test/source/serial_test.cpp86-115](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L86-L115)
- [source/tests/serial_test/source/serial_test.cpp134-164](https://github.com/metacall/core/blob/af9cad19/source/tests/serial_test/source/serial_test.cpp#L134-L164)

## Adding Custom Serialization Formats

The MetaCall serialization system is extensible. To add a new format, you need to implement five core functions:

These functions follow the pattern established by the existing RapidJSON and MetaCall format implementations.

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp49-67](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L49-L67)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp355-369](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L355-L369)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp525-549](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L525-L549)
- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp551-561](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L551-L561)

## Performance Considerations

When working with serialization in MetaCall, keep these performance considerations in mind:

1.  RapidJSON is optimized for performance but has limitations with extremely large data structures
2.  Complex nested structures may require multiple passes during serialization/deserialization
3.  When possible, reuse serialization handles to avoid initialization overhead
4.  Consider memory usage when working with large structures, especially with the buffer type

- [source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp15-16](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/source/rapid_json_serial_impl.cpp#L15-L16)

## Conclusion

MetaCall's serialization system provides a flexible way to convert between in-memory values and various data formats. The primary supported format is JSON via RapidJSON, with a simpler string-based MetaCall format also available. The system's modular design allows for adding custom formats to meet specific requirements.
