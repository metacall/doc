---
title: Ruby Loader
---

# Ruby Loader

## Relevant source files

- [deploy/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/deploy/CMakeLists.txt)
- [source/loaders/c_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/c_loader/CMakeLists.txt)
- [source/loaders/cs_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/cs_loader/CMakeLists.txt)
- [source/loaders/file_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/file_loader/CMakeLists.txt)
- [source/loaders/js_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/js_loader/CMakeLists.txt)
- [source/loaders/jsm_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/jsm_loader/CMakeLists.txt)
- [source/loaders/mock_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/mock_loader/CMakeLists.txt)
- [source/loaders/py_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/CMakeLists.txt)
- [source/loaders/rb_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/CMakeLists.txt)
- [source/loaders/rb_loader/source/rb_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c)
- [source/loaders/rb_loader/source/rb_loader_impl_parser.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl_parser.c)
- [source/metacall/include/metacall/metacall_error.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall_error.h)
- [source/metacall/source/metacall_error.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall_error.c)
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
- [source/serials/metacall_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/CMakeLists.txt)
- [source/serials/rapid_json_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/CMakeLists.txt)
- [source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp)
- [source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp)
- [source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp)
- [source/threading/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/threading/CMakeLists.txt)

The Ruby Loader is a plugin for MetaCall Core that enables loading, executing, and interfacing with Ruby code at runtime. This component allows Ruby functions, objects, and classes to be called from other programming languages supported by MetaCall, and vice versa.

## Architecture

The Ruby Loader follows the standard loader architecture of MetaCall, implementing Ruby-specific capabilities to bridge the Ruby interpreter with the MetaCall reflection system.

### Ruby Loader Components

- [source/loaders/rb_loader/source/rb_loader_impl.c149-600](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L149-L600)
- [source/loaders/rb_loader/source/rb_loader_impl.c602-754](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L602-L754)
- [source/loaders/rb_loader/source/rb_loader_impl.c756-936](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L756-L936)

### Loading and Execution Flow

- [source/loaders/rb_loader/source/rb_loader_impl.c977-1040](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L977-L1040)
- [source/loaders/rb_loader/source/rb_loader_impl.c1228-1285](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L1228-L1285)
- [source/loaders/rb_loader/source/rb_loader_impl.c397-554](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L397-L554)

## Initialization

When the Ruby Loader is initialized, it performs the following operations:

1.  Initializes the Ruby interpreter with `ruby_sysinit()` and `ruby_init()`
2.  Sets up the Ruby load path with `ruby_init_loadpath()`
3.  Initializes the type system to map between Ruby and MetaCall types
4.  Registers the loader with the MetaCall system

The initialization code can be found in the `rb_loader_impl_initialize` function:

- [source/loaders/rb_loader/source/rb_loader_impl.c977-1040](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L977-L1040)

## Type Conversion System

The Ruby Loader implements a comprehensive type conversion system to translate between Ruby types and MetaCall's type system. This conversion is handled by two main functions:

1.  `rb_type_deserialize`: Converts Ruby values to MetaCall values
2.  `rb_type_serialize`: Converts MetaCall values to Ruby values

The type mapping is as follows:
| Ruby Type | MetaCall Type |
| --- | --- |
| T_TRUE/T_FALSE | BOOL |
| T_FIXNUM | INT |
| T_BIGNUM | LONG |
| T_FLOAT | DOUBLE |
| T_STRING | STRING |
| T_ARRAY | ARRAY |
| T_NIL | NULL |
| T_OBJECT | OBJECT |
| T_CLASS | CLASS |
For example, here's how a Ruby string is converted to a MetaCall string:

- [source/loaders/rb_loader/source/rb_loader_impl.c166-307](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L166-L307)
- [source/loaders/rb_loader/source/rb_loader_impl.c309-354](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L309-L354)

## Loading Ruby Code

The Ruby Loader supports loading Ruby code from files, memory, or packages. Two main methods are implemented:

### Loading from Files

The `rb_loader_impl_load_from_file` function loads Ruby code from files:

1.  Creates a handle to manage the loaded modules
2.  For each file path, it:
    - Extracts the module name from the path
    - Loads the Ruby module with `rb_loader_impl_load_from_file_module`
    - Adds the module to the handle's module vector
3.  Returns the handle to the MetaCall system

- [source/loaders/rb_loader/source/rb_loader_impl.c1228-1285](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L1228-L1285)

### Loading from Memory

The `rb_loader_impl_load_from_memory` function loads Ruby code from a memory buffer:

1.  Creates a handle to manage the loaded module
2.  Loads the Ruby module using `rb_loader_impl_load_from_memory_module`
3.  Adds the module to the handle's module vector
4.  Returns the handle to the MetaCall system

- [source/loaders/rb_loader/source/rb_loader_impl.c1356-1396](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L1356-L1396)

Both loading methods use a parser (`rb_loader_impl_key_parse`) to identify Ruby functions that can be called from other languages:

- [source/loaders/rb_loader/source/rb_loader_impl_parser.c53-2112](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl_parser.c#L53-L2112)

## Function Invocation

When a Ruby function is called through MetaCall, the `function_rb_interface_invoke` function handles the invocation:

1.  Converts MetaCall arguments to Ruby values
2.  Determines the invocation strategy:
    - Typed: Using keyword arguments
    - Duck-typed: Using positional arguments
    - Mixed: A combination of both
3.  Calls the Ruby function using the appropriate strategy
4.  Captures any Ruby exceptions that occur
5.  Converts the Ruby result back to a MetaCall value

The function supports three invocation strategies based on whether the function's signature is defined with named arguments:

- [source/loaders/rb_loader/source/rb_loader_impl.c397-554](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L397-L554)

## Object and Class Support

The Ruby Loader provides comprehensive support for working with Ruby objects and classes through the following interfaces:

### Object Interface

The object interface enables interacting with Ruby objects:

1.  `rb_object_interface_get`: Retrieves object attributes
2.  `rb_object_interface_set`: Sets object attributes
3.  `rb_object_interface_method_invoke`: Calls object methods

For example, retrieving an object attribute:

- [source/loaders/rb_loader/source/rb_loader_impl.c602-754](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L602-L754)

### Class Interface

The class interface enables working with Ruby classes:

1.  `rb_class_interface_constructor`: Creates new class instances
2.  `rb_class_interface_static_get`: Retrieves class static attributes
3.  `rb_class_interface_static_set`: Sets class static attributes
4.  `rb_class_interface_static_invoke`: Calls class static methods

- [source/loaders/rb_loader/source/rb_loader_impl.c756-936](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L756-L936)

### Initialization of Types

The Ruby Loader initializes the type system to map between Ruby types and MetaCall types:

- [source/loaders/rb_loader/source/rb_loader_impl.c938-975](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L938-L975)

## Error Handling

The Ruby Loader includes error handling to capture Ruby exceptions during code execution:

This macro is used throughout the code to handle Ruby exceptions and log them appropriately.

- [source/loaders/rb_loader/source/rb_loader_impl.c381-395](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c#L381-L395)

## Build Dependencies

The Ruby Loader has the following build dependencies:

1.  Ruby development libraries and headers
2.  MetaCall Core libraries

These dependencies are configured in the CMakeLists.txt file:

On Windows platforms, the Ruby DLL is copied to the output directory to ensure proper runtime loading.

- [source/loaders/rb_loader/CMakeLists.txt1-219](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/CMakeLists.txt#L1-L219)

## Usage Examples

### Loading Ruby Code

### Working with Ruby Objects

### Working with Ruby Classes

- [source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp32-164](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp#L32-L164)
- [source/scripts/ruby/klass/source/klass.rb1-45](https://github.com/metacall/core/blob/af9cad19/source/scripts/ruby/klass/source/klass.rb#L1-L45)
