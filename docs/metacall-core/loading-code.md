---
title: Loading Code
---

# Loading Code

This document details the methods and processes for loading source code from various programming languages into the MetaCall runtime. Loading code is a fundamental operation in MetaCall that allows functions written in different languages to be callable from any supported language in the MetaCall ecosystem.
## Overview of Code Loading

MetaCall provides several methods to load code into its runtime environment, enabling cross-language function calls. The loading process involves parsing source code, extracting function signatures, and registering these functions in the MetaCall runtime.

- [source/metacall/source/metacall.c444-489](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L444-L489)
- [source/loader/source/loader.c381-544](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c#L381-L544)
- [source/loader/source/loader_impl.c426-542](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L426-L542)

## Loading Methods

MetaCall provides three primary methods for loading code into the runtime:

### 1\. Loading from File

Loads code from one or more script files:

This method accepts:

- `tag`: Extension or identifier of the programming language (e.g., "py", "node", "rb")
- `paths`: Array of file paths to load
- `size`: Number of file paths in the array
- `handle`: Optional pointer to receive the handle of the loaded module

- [source/metacall/source/metacall.c444-473](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L444-L473)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js136-157](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L136-L157)
- [source/loaders/py_loader/source/py_loader_impl.c2595-2693](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L2595-L2693)

### 2\. Loading from Memory

Loads code from a memory buffer:

This method accepts:

- `tag`: Extension or identifier of the programming language
- `buffer`: String containing the source code
- `size`: Size of the buffer
- `handle`: Optional pointer to receive the handle of the loaded module

- [source/metacall/source/metacall.c474-489](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L474-L489)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js159-200](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L159-L200)
- [source/loaders/py_loader/source/py_loader_impl.c2695-2792](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L2695-L2792)

### 3\. Loading from Package

Loads code from a package (e.g., a zip file containing multiple scripts):

This method accepts:

- `tag`: Extension or identifier of the programming language
- `path`: Path to the package file
- `handle`: Optional pointer to receive the handle of the loaded module

- [source/metacall/source/metacall.c490-496](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L490-L496)
- [source/loader/source/loader_impl.c509-536](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L509-L536)

## Loading Process Details

- [source/loader/source/loader_impl.c420-452](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L420-L452)
- [source/loader/source/loader.c381-544](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c#L381-L544)

## Handles and Contexts

When loading code, MetaCall creates a "handle" that represents the loaded module. These handles can be used to reference and manage loaded code:

Handles serve several important purposes:

1.  **Scoping**: When a handle is provided to loading functions, the loaded code is scoped to that handle, preventing symbol collisions with other loaded code.
2.  **Resource Management**: Handles allow for proper resource cleanup when code is no longer needed.
3.  **Function Access**: Functions from loaded code can be called via the handle.

- [source/loader/source/loader_impl.c95-105](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L95-L105)
- [source/metacall/source/metacall.c516-555](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L516-L555)

## Execution Paths

Before loading code, you may need to set up execution paths to tell MetaCall where to look for dependencies:

This is particularly important for languages that rely on importing or requiring other modules.

- [source/metacall/source/metacall.c413-425](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L413-L425)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js70-109](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L70-L109)
- [source/loader/source/loader_impl.c262-290](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L262-L290)

## Language-Specific Loading Behavior

Different language loaders have specific behaviors and capabilities:

### Python Loader

The Python loader:

- Imports Python modules as if they were imported with `import`
- Supports Python packages with `__init__.py`
- Detects and registers functions, classes, and class methods
- Handles Python async functions

- [source/loaders/py_loader/source/py_loader_impl.c2595-2693](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L2595-L2693)
- [source/loaders/py_loader/source/py_loader_impl.c809-857](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L809-L857)

### Node.js Loader

The Node.js loader:

- Loads JavaScript files as if they were loaded with `require()`
- Supports CommonJS and ES modules
- Uses a bootstrap mechanism to handle Node.js specifics
- Provides special handling for async functions and promises

- [source/loaders/node_loader/source/node_loader_impl.cpp426-448](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L426-L448)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js136-157](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L136-L157)
- [source/loaders/node_loader/bootstrap/lib/bootstrap.js310-336](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/bootstrap/lib/bootstrap.js#L310-L336)

### TypeScript Loader

Built on top of the Node.js loader:

- Compiles TypeScript to JavaScript at load time
- Supports TypeScript type annotations
- Maintains source maps for better debugging

- [source/loaders/ts_loader/bootstrap/lib/bootstrap.ts84-117](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/lib/bootstrap.ts#L84-L117)
- [source/loaders/ts_loader/bootstrap/lib/bootstrap.ts146-212](https://github.com/metacall/core/blob/af9cad19/source/loaders/ts_loader/bootstrap/lib/bootstrap.ts#L146-L212)

## Error Handling

When loading code, various errors can occur:

1.  **File not found**: The specified file could not be found
2.  **Syntax errors**: The code contains syntax errors
3.  **Import/require errors**: Dependencies could not be resolved
4.  **Runtime errors**: Errors that occur during execution

Error handling follows this pattern:

- [source/metacall/source/metacall.c444-496](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L444-L496)
- [source/loaders/py_loader/source/py_loader_impl.c157-161](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/source/py_loader_impl.c#L157-L161)
- [source/loaders/node_loader/source/node_loader_impl.cpp946-1101](https://github.com/metacall/core/blob/af9cad19/source/loaders/node_loader/source/node_loader_impl.cpp#L946-L1101)

## API Summary

| Function                     | Description                    | Parameters                   |
| ---------------------------- | ------------------------------ | ---------------------------- |
| `metacall_load_from_file`    | Load code from file(s)         | tag, paths\[\], size, handle |
| `metacall_load_from_memory`  | Load code from a memory buffer | tag, buffer, size, handle    |
| `metacall_load_from_package` | Load code from a package       | tag, path, handle            |
| `metacall_execution_path`    | Set execution path             | tag, path                    |
| `metacall_handle_function`   | Get function from handle       | handle, name                 |
| `metacallhv`                 | Call function by handle        | handle, name, args\[\]       |

- [source/metacall/source/metacall.c444-496](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L444-L496)
- [source/metacall/source/metacall.c413-425](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L413-L425)
- [source/metacall/source/metacall.c516-555](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L516-L555)

## Best Practices

1.  **Use Handles for Module Isolation**: When loading code that might have naming conflicts with other loaded code, always use the handle parameter to create isolated modules.
2.  **Set Execution Paths Before Loading**: Always set execution paths before loading code to ensure dependencies can be properly resolved.
3.  **Check Return Codes**: Always check the return codes from loading functions to ensure the code was loaded successfully.
4.  **Clear When Done**: When finished with a loaded module, clear it to free resources.
5.  **Language-Specific Considerations**: Be aware of language-specific behaviors when loading code from different languages.

- [source/loader/source/loader_impl.c126-148](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L126-L148)
- [source/loader/source/loader_impl.c262-290](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L262-L290)
- [source/loader/source/loader_impl.c420-452](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L420-L452)

## Example Loading Process

Here's a complete example of how code is loaded and executed:

- [source/metacall/source/metacall.c413-425](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L413-L425)
- [source/metacall/source/metacall.c444-473](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L444-L473)
- [source/metacall/source/metacall.c516-555](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L516-L555)
- [source/loader/source/loader_impl.c420-452](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c#L420-L452)

This comprehensive overview should help you understand how code loading works in MetaCall, enabling you to effectively use this core functionality of the MetaCall system.
