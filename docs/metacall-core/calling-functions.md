---
title: Calling Functions
---

# Calling Functions

This document explains how to use MetaCall to call functions across language boundaries, including different API variations, argument handling, and value conversion. For information about loading code before calling functions, see [Loading Code](./loading-code.md).
## Overview of Function Calling in MetaCall

MetaCall provides several ways to call functions across language boundaries. The core API offers different functions based on how you want to pass arguments and how you reference the function you want to call.

## Core Function Call API

### Calling Functions by Name

The simplest way to call functions is using the `metacall` function:

This function looks up a function by name across all loaded modules and calls it with the provided arguments. For example:

For more control over arguments, there are variants:
| Function | Description |
| --- | --- |
| `metacall` | Call by name with variable arguments |
| `metacallv` | Call by name with array of arguments |
| `metacallv_s` | Call by name with array of arguments and explicit size |
| `metacallt` | Call by name with explicit argument types |
| `metacallt_s` | Call by name with explicit argument types and size |

### Calling Functions by Handle

To avoid name collisions when multiple modules define functions with the same name, you can use handle-specific function calls:

Example:

### Calling Functions by Reference

You can also get a function reference first and then call it:

Example:

### Serialized Function Calls

For interoperation with external systems, MetaCall supports serialized function calls:

Example:

## Function Call Lifecycle

The following diagram shows the sequence of operations when calling a function in MetaCall:

## Type Conversion

When calling functions across language boundaries, MetaCall handles type conversion automatically:

When calling a function, MetaCall will try to convert arguments to the expected types based on the function's signature. If the conversion is not possible, the call may fail.

## Function Metadata

You can inspect function metadata to understand its parameters and return type:

Example:

## Language-Specific Ports

Each language port provides a more idiomatic way to call functions.

### Node.js Port

In Node.js, you can call functions like this:

You can also import functions directly:

### Go Port

In Go, you can call functions like this:

## Examples

### Basic Function Call

### Function Call with Array Arguments

### Working with Function References

### Asynchronous Function Calls

For asynchronous functions (like JavaScript Promises), you can check the async status and use futures:

## Error Handling

When a function call fails, there are several possible causes:

1.  The function doesn't exist
2.  The arguments are incompatible with the function's signature
3.  The function threw an exception

In the C API, function call failures are indicated by returning `NULL`. In language-specific ports, errors may be propagated as exceptions or error objects according to the language's conventions.

Always check for errors when making function calls across language boundaries.

## Best Practices

1.  **Clean up memory**: Always destroy MetaCall values with `metacall_value_destroy` when you're done with them.
2.  **Use handle-specific calls**: When working with multiple modules that might define functions with the same name, use handle-specific functions like `metacallhv`.
3.  **Check function metadata**: Before calling a function, you can inspect its parameters and return type to ensure compatibility.
4.  **Prefer language-specific ports**: When possible, use the language-specific port API for more idiomatic code.
5.  **Handle errors**: Always check for and handle errors when making cross-language function calls.
6.  **Be mindful of type conversions**: While MetaCall handles type conversions automatically, be aware of potential issues with complex types or language-specific behaviors.

Sources: [source/metacall/source/metacall.c1126-1188](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L1126-L1188) [source/metacall/source/metacall.c516-554](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L516-L554) [source/metacall/source/metacall.c1019-1081](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L1019-L1081)
