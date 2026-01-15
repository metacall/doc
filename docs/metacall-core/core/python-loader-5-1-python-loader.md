---
title: Python Loader
---

# Python Loader

## Relevant source files

- [deploy/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/deploy/CMakeLists.txt)
- [source/cli/metacallcli/test/cli-test-rb.py.in](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/test/cli-test-rb.py.in)
- [source/cli/metacallcli/test/cli-test.py.in](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/test/cli-test.py.in)
- [source/loaders/c_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/c_loader/CMakeLists.txt)
- [source/loaders/cs_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/cs_loader/CMakeLists.txt)
- [source/loaders/file_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/file_loader/CMakeLists.txt)
- [source/loaders/js_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/js_loader/CMakeLists.txt)
- [source/loaders/jsm_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/jsm_loader/CMakeLists.txt)
- [source/loaders/mock_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/mock_loader/CMakeLists.txt)
- [source/loaders/py_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/CMakeLists.txt)
- [source/loaders/py_loader/include/py_loader/py_loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/include/py_loader/py_loader_impl.h)
- [source/loaders/py_loader/source/py_loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c)
- [source/loaders/py_loader/source/py_loader_port.c](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_port.c)
- [source/loaders/rb_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/CMakeLists.txt)
- [source/ports/py_port/metacall/\_\_init\_\_.py](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/metacall/__init__.py)
- [source/ports/py_port/metacall/api.py](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/metacall/api.py)
- [source/scripts/python/pointer/source/pointer.py.in](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/pointer/source/pointer.py.in)
- [source/serials/metacall_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/CMakeLists.txt)
- [source/serials/rapid_json_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/CMakeLists.txt)
- [source/tests/metacall_node_test/source/main.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_test/source/main.cpp)
- [source/tests/metacall_node_test/source/metacall_node_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_node_test/source/metacall_node_test.cpp)
- [source/tests/metacall_python_async_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/CMakeLists.txt)
- [source/tests/metacall_python_async_test/source/main.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/source/main.cpp)
- [source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_async_test/source/metacall_python_async_test.cpp)
- [source/tests/metacall_python_pointer_test/source/metacall_python_pointer_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_pointer_test/source/metacall_python_pointer_test.cpp)
- [source/tests/metacall_python_port_import_test/source/metacall_python_port_import_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_python_port_import_test/source/metacall_python_port_import_test.cpp)

The Python Loader is a core component of MetaCall that enables loading and executing Python code at runtime, providing interoperability between Python and other programming languages supported by the MetaCall framework. This document covers the internal architecture, functionality, and implementation details of the Python Loader.

## Overview

The Python Loader enables MetaCall to load Python scripts dynamically, expose Python functions to other language environments, and call functions from other languages within Python code. It serves as a bridge between the Python runtime and MetaCall's reflection system, handling type conversions, function discovery, and cross-language function invocation.

## Architecture and Components

The Python Loader follows a modular design that integrates with both the MetaCall Core and the Python C API. It consists of several key components:

1.  **py_loader_impl**: Main implementation that handles loading, discovering, and executing Python code
2.  **py_loader_dict**: Utilities for working with Python dictionaries
3.  **py_loader_port**: MetaCall bindings for Python code to call back into MetaCall
4.  **py_loader_threading**: Thread management for Python's GIL (Global Interpreter Lock)

### Loader Implementation Structure

The Python Loader implements several key data structures:

- **loader_impl_py_type**: Main implementation structure that holds references to Python modules and functions needed for reflection and async support
- **loader_impl_py_function_type**: Represents a Python function in the MetaCall value system
- **loader_impl_py_future_type**: Represents an async Python future for handling asynchronous calls
- **loader_impl_py_class_type**: Represents a Python class
- **loader_impl_py_object_type**: Represents a Python object instance

## Initialization and Configuration

The Python Loader initialization process involves setting up the Python interpreter, importing required modules, and configuring the execution environment.

The initialization process involves:

1.  Initializing the Python interpreter if not already initialized
2.  Importing essential Python modules (inspect, asyncio, builtins, traceback)
3.  Setting up the module search path (sys.path)
4.  Registering MetaCall functions for use within Python code
5.  Initializing threading support for the Python GIL

## Type Conversion System

One of the most important aspects of the Python Loader is the type conversion system that translates between Python objects and MetaCall values. This enables seamless data transfer between different language environments.

The type conversion system consists of two main functions:

1.  **py_loader_impl_capi_to_value_type**: Determines the MetaCall value type for a given Python object
2.  **py_loader_impl_capi_to_value**: Converts a Python object to a MetaCall value
3.  **py_loader_impl_value_to_capi**: Converts a MetaCall value to a Python object

The following table shows the complete type mapping between Python and MetaCall:

Python Type

MetaCall Type

Notes

bool

TYPE_BOOL

Boolean values

int

TYPE_INT/TYPE_LONG

Integer values

float

TYPE_DOUBLE

Floating-point values

str

TYPE_STRING

String values

bytes

TYPE_BUFFER

Binary data

list/tuple

TYPE_ARRAY

Sequential collections

dict

TYPE_MAP

Key-value mappings

function

TYPE_FUNCTION

Callable functions

None

TYPE_NULL

Null/None values

class

TYPE_CLASS

Class definitions

object

TYPE_OBJECT

Class instances

coroutine

TYPE_FUTURE

Async functions

exception

TYPE_EXCEPTION

Error objects

## Function Discovery and Calling Mechanism

The Python Loader discovers functions in loaded Python modules through reflection and makes them available to the MetaCall system. It also implements the mechanism for calling functions both synchronously and asynchronously.

The function discovery process:

1.  Loads Python code via file, memory, or package
2.  Imports the module into the Python runtime
3.  Uses Python's introspection capabilities to discover functions, classes, and methods
4.  Registers discovered functions with the MetaCall reflection system
5.  Sets up appropriate conversion and calling mechanisms

Function calling workflow:

1.  Receives function name and arguments from MetaCall
2.  Converts MetaCall values to Python objects
3.  Calls the Python function with the converted arguments
4.  Converts the Python return value back to a MetaCall value
5.  Returns the result to the caller

## Asynchronous Function Support

The Python Loader implements support for Python's asynchronous programming model using the asyncio library. This allows calling Python async functions and receiving results through MetaCall's future mechanism.

The Python Loader implements several key components for async support:

1.  Detection of async functions using Python's inspection mechanisms
2.  Creating and managing asyncio event loops
3.  Executing coroutines and tracking their state
4.  Converting between Python futures and MetaCall futures
5.  Handling callback resolution for asynchronous results

## The Python Port

The Python Port complements the Python Loader by providing a way to call MetaCall functions from Python code. It allows Python scripts to seamlessly access functions defined in other languages through MetaCall.

The Python Port provides several key functions to Python code:

1.  `metacall`: Call functions from other languages
2.  `metacall_load_from_file`: Load code from files
3.  `metacall_load_from_memory`: Load code from strings
4.  `metacall_load_from_package`: Load code from packages
5.  `metacall_inspect`: Introspect loaded functions and modules

Additionally, it implements import monkey patching, allowing Python code to import modules from other languages using standard Python import syntax.

## Class and Object System

The Python Loader supports working with Python classes and objects, allowing them to be passed between language boundaries and their methods to be called.

The Python Loader implements interfaces for working with classes and objects:

1.  **py_class_interface**: Interface for Python classes
    - Creating new instances (constructor)
    - Accessing static attributes
    - Calling static methods

2.  **py_object_interface**: Interface for Python objects
    - Accessing instance attributes
    - Setting instance attributes
    - Calling instance methods

This system allows for object-oriented programming across language boundaries, preserving class identity and instance state.

## Error Handling and Exception Propagation

The Python Loader includes mechanisms for handling Python exceptions and propagating them through the MetaCall system. This ensures that errors in Python code are properly reported to callers in other languages.

The error handling system:

1.  Detects Python exceptions after function calls
2.  Extracts exception type, value, and traceback information
3.  Converts this information to a MetaCall exception value
4.  Propagates the exception to the caller

This ensures that Python errors are properly handled and reported, regardless of which language initiated the call.

## Building and Deployment

The Python Loader is built as a dynamically loadable module that can be loaded by the MetaCall core. It requires the Python development libraries to be available during compilation.

The build process:

1.  Checks if the Python Loader is enabled in the build configuration
2.  Finds the Python development libraries
3.  Sets up compiler and linker flags
4.  Builds the Python Loader module
5.  Installs the module and dependencies

## Usage Examples

The Python Loader can be used in various ways to enable cross-language function calls:

1.  **Calling Python from C/C++**:

2.  **Calling other languages from Python**:

3.  **Using async/await with Python**:

## Threading and GIL Management

The Python Loader implements proper management of Python's Global Interpreter Lock (GIL) to ensure thread safety when calling Python functions from multiple threads.

The threading system:

1.  Acquires the Python GIL before calling into Python code
2.  Executes the Python function or operation
3.  Releases the GIL when returning to the calling environment
4.  Handles thread state management for asynchronous operations

This ensures that Python's thread-safety requirements are respected while still allowing MetaCall to operate in a multi-threaded environment.

## Conclusion

The Python Loader is a critical component of the MetaCall ecosystem, enabling seamless integration between Python and other programming languages. It handles the complexities of cross-language type conversion, function discovery, class/object interaction, and asynchronous programming to provide a unified function call interface.

For information about other language loaders, see the [Loaders](/metacall/core/5-loaders) section.
