---
title: Error Handling
---

# Error Handling

## Relevant source files

- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/loaders/rb_loader/source/rb_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl.c)
- [source/loaders/rb_loader/source/rb_loader_impl_parser.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/source/rb_loader_impl_parser.c)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/include/metacall/metacall_error.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall_error.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
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
- [source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_object_class_test/source/metacall_python_object_class_test.cpp)
- [source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_ruby_object_class_test/source/metacall_ruby_object_class_test.cpp)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)
- [source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/reflect_object_class_test/source/reflect_object_class_test.cpp)
- [source/threading/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/threading/CMakeLists.txt)

This page documents the error handling mechanisms in MetaCall Core, explaining how errors are represented, propagated, and handled across language boundaries. It covers the exception system, return codes, error logging, and best practices for handling errors when using MetaCall.

## 1\. Error Representation in MetaCall

MetaCall uses several approaches for error representation:

1.  **Return Codes**: Most functions return an integer status code (0 for success, non-zero for error).
2.  **NULL Returns**: Functions that return pointers often return `NULL` to indicate errors.
3.  **Exceptions**: A structured exception system to represent detailed error information.
4.  **Logging**: Error messages are logged through MetaCall's logging system.

### 1.1. The Exception System

MetaCall implements a cross-language exception system through the `exception` type, designed to capture error information regardless of source language.

The `exception` type contains:

- `message`: Descriptive error message
- `label`: Error type or category
- `code`: Numeric error code
- `stacktrace`: Stack trace from where the error originated
- `id`: Thread ID where the error was raised
- `ref`: Reference counter for memory management

## 2\. Error Handling Flow

Error handling in MetaCall follows a general pattern that allows errors to be propagated across language boundaries.

### 2.1. Error Propagation Across Language Boundaries

When an error occurs in a function executed through MetaCall, it's captured and propagated back through the call chain:

1.  The language-specific loader captures the error in the runtime's native format
2.  The error is translated to a MetaCall representation
3.  The error is returned to the caller, either as a return code or exception

## 3\. Error Checking Patterns

### 3.1. Return Code Checking

Most MetaCall API functions return status codes that should be checked:

Common functions that return status codes:

- `metacall_initialize()`
- `metacall_load_from_file()`
- `metacall_load_from_memory()`
- `metacall_execution_path()`

### 3.2. NULL Return Checking

Functions that return values often return `NULL` on error:

Common functions that may return `NULL` on error:

- `metacall()`, `metacallv()`, `metacallt()`
- `metacall_function()`
- Various value-returning functions

### 3.3. Error Logging

Errors are logged through MetaCall's logging system. The default log output is `stdout`, but this can be configured:

## 4\. Error Handling in Different Contexts

### 4.1. Error Handling in API Functions

The MetaCall API itself uses consistent error handling patterns:

Common error handling patterns in API functions:

1.  **Early return**: Check conditions and return early on error
2.  **Logging**: Log detailed error information for diagnostics
3.  **Cleanup**: Free resources before returning error status

### 4.2. Error Handling in Language Loaders

Language loaders handle errors specific to their runtime:

1.  **Python Loader**: Captures Python exceptions and converts them to MetaCall errors
2.  **Ruby Loader**: Uses `rb_protect` to safely call Ruby methods and capture exceptions
3.  **Node.js Loader**: Converts JavaScript exceptions to MetaCall errors

## 5\. Best Practices for Error Handling

When using MetaCall, follow these error handling best practices:

1.  **Always check return codes** of MetaCall API functions
2.  **Validate pointers** returned from MetaCall before using them
3.  **Properly destroy values** to avoid memory leaks, especially when handling errors
4.  **Configure appropriate logging** to capture error details
5.  **Handle language-specific exceptions** when working with language ports

### 5.1 Example Error Handling Pattern

A robust error handling pattern for MetaCall:

## 6\. Error Handling Implementation Details

### 6.1. Exception Implementation

The `exception` type uses reference counting for memory management:

When the reference count reaches zero, the exception is destroyed, freeing all allocated memory.

### 6.2. Function Call Error Handling

When a function is called through `metacall()`, errors are handled as follows:

1.  Arguments are validated
2.  The function is looked up
3.  If the function is not found, `NULL` is returned
4.  The function is called with appropriate error handling
5.  The return value is processed or an error is returned

## 7\. Cross-Language Error Handling

MetaCall provides consistent error handling across different programming languages:

### 7.1. Python Errors

Python exceptions are captured and converted to MetaCall errors or exceptions. The Python traceback is preserved and can be accessed through the exception object.

### 7.2. Ruby Errors

Ruby errors are captured using Ruby's `rb_protect` mechanism and are converted to MetaCall errors:

The Ruby loader also includes a macro to print exception details:

### 7.3. Node.js/JavaScript Errors

JavaScript exceptions are captured using N-API's error handling mechanisms and are converted to MetaCall errors.

## 8\. Conclusion

MetaCall provides a robust error handling system that works across language boundaries. By consistently checking return codes, validating pointers, and properly managing resources, you can build reliable polyglot applications that gracefully handle errors regardless of the source language.

Remember that errors can occur at various levels, from language runtime errors to MetaCall API errors to application logic errors. A good error handling strategy should account for all these possibilities.
