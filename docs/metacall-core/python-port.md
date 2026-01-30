---
title: Python Port
---

# Python Port

The Python Port provides a bridge between Python applications and MetaCall's cross-language function invocation capabilities. It allows Python code to seamlessly call functions written in other languages (like JavaScript, Ruby, C#) and exposes Python functions to be called from other languages.
For information about the Python loader (which allows calling Python functions from other languages), see the [Python Loader](./python-loader.md) page.

## Architecture Overview

The Python Port integrates with MetaCall's core through a C extension module that provides Python bindings to the MetaCall API. It consists of several key components that work together to provide cross-language interoperability.

## Installation and Setup

The Python Port is installed as a Python package that communicates with the MetaCall core library. It's designed to work with the installed MetaCall runtime.

### Requirements

- Python 3.x
- MetaCall Core library installed on the system

### Installation

The Python Port is automatically installed when you build MetaCall with the Python Port option enabled. It's configured in the CMake build system.

## API Reference

The Python Port exposes the following core functions:
| Function | Description |
| --- | --- |
| `metacall_load_from_file(tag, paths)` | Loads code from files into MetaCall |
| `metacall_load_from_package(tag, path)` | Loads a package into MetaCall |
| `metacall_load_from_memory(tag, buffer)` | Loads code from a string buffer |
| `metacall(function_name, *args)` | Calls a function by name with variable arguments |
| `metacall_inspect()` | Returns metadata about loaded functions as a Python dictionary |
| `metacall_value_create_ptr(ptr)` | Creates a MetaCall pointer value |
| `metacall_value_reference(v)` | Creates a reference to a MetaCall value |
| `metacall_value_dereference(ptr)` | Dereferences a MetaCall pointer |

## Basic Usage

### Loading Code from Files

### Calling Functions

### Loading Code from Memory

## Import System

One of the most powerful features of the Python Port is its custom import system that allows Python code to import functions from other languages using standard Python import syntax.

The import system supports several import patterns:

1.  Direct module import:
2.  From import for specific functions:
3.  Import by file extension:

## Advanced Features

### Asynchronous Function Calls

The Python Port supports working with asynchronous functions across language boundaries. It can interact with JavaScript promises, Python coroutines, and other asynchronous mechanisms.

### Working with Pointers

The Python Port provides special functions for handling pointers, which can be useful when working with native code:

## Internal Implementation

### Module Loading

The Python Port dynamically loads the MetaCall core C library based on the platform. This is handled through platform-specific modules.

### Value Conversion

The Python Port handles value conversion between Python objects and MetaCall values. This involves translating primitive types like numbers and strings, as well as complex types like lists, dictionaries, and functions.

### Threading Considerations

The Python Port handles the Global Interpreter Lock (GIL) appropriately when making calls to MetaCall, ensuring thread safety while allowing concurrent operations.

## Limitations and Troubleshooting

### Common Issues

1.  **Library Not Found**: If the MetaCall library cannot be found, ensure the `LOADER_LIBRARY_PATH` environment variable is set correctly.
2.  **Type Conversion Errors**: Some complex types may not convert perfectly between languages. In these cases, consider using simpler data structures.
3.  **Platform Support**: The Python Port has been primarily tested on Linux. While it should work on Windows and macOS, there might be platform-specific issues.

### Error Handling

Errors from cross-language calls are converted to Python exceptions when possible. This allows using standard Python error handling mechanisms.

## Conclusion

The Python Port provides a powerful way to integrate Python applications with code written in other languages. By leveraging MetaCall's cross-language function call capabilities, developers can build polyglot applications that combine the strengths of multiple programming languages.

Sources: [source/ports/py_port/metacall/api.py1-298](https://github.com/metacall/core/blob/af9cad19/source/ports/py_port/metacall/api.py#L1-L298) [source/loaders/py_loader/source/py_loader_port.c1-980](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_port.c#L1-L980)
