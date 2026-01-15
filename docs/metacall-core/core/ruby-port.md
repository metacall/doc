---
title: Ruby Port
---

# Ruby Port

## Relevant source files

- [VERSION](https://github.com/metacall/core/blob/af9cad19/VERSION)
- [source/loaders/rb_loader/source/rb_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c)
- [source/loaders/rb_loader/source/rb_loader_impl_parser.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl_parser.c)
- [source/metacall/include/metacall/metacall_error.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall_error.h)
- [source/metacall/source/metacall_error.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall_error.c)
- [source/ports/java_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/java_port/CMakeLists.txt)
- [source/ports/js_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/js_port/CMakeLists.txt)
- [source/ports/py_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/CMakeLists.txt)
- [source/ports/rb_port/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/ports/rb_port/CMakeLists.txt)
- [source/reflect/include/reflect/reflect_accessor.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_accessor.h)
- [source/reflect/include/reflect/reflect_class.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_class.h)
- [source/reflect/include/reflect/reflect_exception.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_exception.h)
- [source/reflect/include/reflect/reflect_object.h](https://github.com/metacall/core/blob/af9cad19/source/reflect/include/reflect/reflect_object.h)
- [source/reflect/source/reflect_class.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_class.c)
- [source/reflect/source/reflect_exception.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_exception.c)
- [source/reflect/source/reflect_object.c](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_object.c)
- [source/scripts/python/classname/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/classname/CMakeLists.txt)
- [source/scripts/python/classname/depends/\_\_init\_\_.py](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/classname/depends/__init__.py)
- [source/scripts/python/classname/source/classname.py](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/classname/source/classname.py)
- [source/scripts/ruby/klass/source/klass.rb](https://github.com/metacall/core/blob/af9cad19/source/scripts/ruby/klass/source/klass.rb)
- [source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp)
- [source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp)
- [source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp)
- [source/threading/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/threading/CMakeLists.txt)
- [tools/runtime/Dockerfile](https://github.com/metacall/core/blob/af9cad19/tools/runtime/Dockerfile)

The Ruby Port in MetaCall provides Ruby developers with the ability to use the MetaCall foreign function interface within Ruby applications. This allows Ruby code to seamlessly load and execute functions written in other programming languages like Python, JavaScript, C#, and more. This page documents the architecture, usage, and implementation of the Ruby Port.

For information about executing Ruby code from other languages, see the [Ruby Loader](./ruby-loader.md).

## Architecture

The Ruby Port functions as a bridge between the MetaCall Core library and Ruby applications. It allows Ruby developers to use the MetaCall API to load code from different languages and call functions across language boundaries.

## Implementation

The Ruby Port is implemented as a SWIG-generated wrapper around the MetaCall C API. SWIG (Simplified Wrapper and Interface Generator) creates the necessary bindings to expose MetaCall functionality to Ruby.

## Usage

To use the Ruby Port, you first need to install the MetaCall library and the Ruby Port module. Then, you can use it in your Ruby code as follows:

### Data Type Conversion

The Ruby Port automatically handles data type conversion between Ruby and the MetaCall value system:

Ruby Type

MetaCall Type

String

String

Integer

Int/Long

Float

Float/Double

Array

Array

Hash

Map

nil

Null

Class

Class

Object

Object

### Working with Objects and Classes

The Ruby Port allows working with objects and classes from other languages:

## Building and Installation

The Ruby Port is built as part of the MetaCall build system. It requires Ruby and its development libraries to be installed.

## Testing

The Ruby Port includes tests that verify functionality such as:

1.  Loading code from other languages
2.  Calling functions across language boundaries
3.  Working with objects and classes from other languages
4.  Type conversion between Ruby and MetaCall

## Examples

### Basic Usage Example

### Working with Objects Example

## Limitations and Known Issues

- The Ruby Port has limited platform support. As stated in the CMakeLists.txt, it does not work properly on Windows and macOS.
- There are some issues with garbage collection and memory management when dealing with complex objects.
- The implementation will eventually be replaced when SWIG is removed from the codebase.
- When running tests with address or thread sanitizers, there are issues with the sanitizer runtime.

## Internal Implementation Details

The Ruby Port relies on the Ruby loader's implementation for handling type conversion. The core functionality is implemented in the following components:

1.  **Type Conversion**: Responsible for converting Ruby types to MetaCall values and vice versa.
    - `rb_type_deserialize`: Converts Ruby VALUE objects to MetaCall values
    - `rb_type_serialize`: Converts MetaCall values to Ruby VALUE objects

2.  **Function Calls**: Handles calling MetaCall functions from Ruby
    - Functions are wrapped to handle argument conversion and error handling

3.  **Object/Class System**: Provides interfaces for working with objects and classes
    - Includes methods to create objects, get/set attributes, and call methods

These components work together to provide a seamless interface between Ruby and MetaCall.

Sources: [source/loaders/rb_loader/source/rb_loader_impl.c166-354](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L166-L354) [source/reflect/source/reflect_class.c78-140](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_class.c#L78-L140) [source/reflect/source/reflect_object.c51-106](https://github.com/metacall/core/blob/af9cad19/source/reflect/source/reflect_object.c#L51-L106)
