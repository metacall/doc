---
title: Detours System
---

# Detours System

## Relevant source files

- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [cmake/InstallRapidJSON.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/InstallRapidJSON.cmake)
- [source/detours/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/detours/CMakeLists.txt)
- [source/detours/funchook_detour/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/detours/funchook_detour/CMakeLists.txt)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/tests/detour_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/detour_test/CMakeLists.txt)
- [source/tests/detour_test/source/detour_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/detour_test/source/detour_test.cpp)
- [source/tests/detour_test/source/main.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/detour_test/source/main.cpp)
- [source/tests/metacall_fork_test/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_fork_test/CMakeLists.txt)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)

The Detours System is a core component of MetaCall that enables function hooking, interception, and redirection at runtime. It allows MetaCall to intercept function calls and redirect them to alternative implementations, which is essential for cross-language function calls and ensuring thread safety in forked processes. This system is critical for MetaCall's ability to seamlessly integrate code from different programming languages.

For information about the core Value System that handles data conversion between languages, see [Serialization and Value System](./serialization-and-value-system.md).

## Architecture

The Detours System is built as a modular component that integrates with the MetaCall Core. It provides a unified API for function interception while using a pluggable backend system that currently defaults to FuncHook.

## Main Components

### 1\. Detour API

The Detour API provides a consistent interface for function interception operations:

Function

Description

`detour_initialize()`

Initializes the detour system

`detour_create(name)`

Creates a detour instance with the specified implementation (e.g., "funchook")

`detour_install(detour, target, hook)`

Installs a hook function to intercept calls to a target function

`detour_trampoline(handle)`

Returns a pointer to the original target function

`detour_uninstall(detour, handle)`

Removes a previously installed hook

`detour_clear(detour)`

Clears a detour instance

`detour_destroy()`

Destroys the detour system

### 2\. FuncHook Implementation

The default detour implementation in MetaCall is FuncHook, an external library that provides cross-platform function hooking capabilities. FuncHook works by modifying the machine code of the target function at runtime to redirect execution to the hook function.

MetaCall integrates version 1.1.3 of the FuncHook library:

## Function Interception Process

The process of intercepting a function call using the Detours System involves the following steps:

## Integration with MetaCall Core

The Detours System is initialized during MetaCall's core initialization process and is used for two primary purposes:

### 1\. Cross-Language Function Calls

The Detours System is a critical component that enables function calls across different language runtimes. When you make a cross-language function call in MetaCall, the following happens:

1.  MetaCall intercepts the function call using the Detours System
2.  The call is redirected to the appropriate language runtime
3.  Type conversion is performed using the Value System
4.  The function is executed in the target language
5.  The result is converted back to the caller's expected format

### 2\. Fork Safety

When the `METACALL_FLAGS_FORK_SAFE` flag is enabled, the Detours System helps ensure thread safety in forked processes:

This feature is important for applications that use the `fork()` system call in multi-threaded environments, as it helps maintain the integrity of function hooks across process boundaries.

## Lifecycle Management

The Detours System is properly initialized and destroyed as part of MetaCall's lifecycle:

A special destructor function, `metacall_detour_destructor()`, is registered with `portability_atexit_register()` to ensure that the Detours System is properly cleaned up when the application exits.

## Example Usage

Here's an example of how to use the Detours System for function interception:

## Implementation and Extension

The Detours System in MetaCall is designed to be extensible. While FuncHook is the default implementation, the system architecture allows for additional hooking mechanisms to be added if needed.

The current implementation is defined in the CMake configuration:

FuncHook is a cross-platform library that works on:

- Windows (x86/x64)
- Linux (x86/x64)
- macOS (x86/x64/ARM64)

## Relationship with Other MetaCall Systems

The Detours System works closely with several other MetaCall components:

1.  **Loader System**: The detours mechanism helps the loader system invoke functions across language boundaries.
2.  **Value System**: After a function call is intercepted, the Value System handles the conversion of arguments and return values between different language type systems.
3.  **Fork Safety Module**: When enabled, the Detours System works with the fork safety module to ensure function hooks remain valid across process forks.
4.  **Linking System**: The metacall_link component utilizes detours to implement its functionality.

## Conclusion

The Detours System is a fundamental component of MetaCall's architecture that enables seamless interoperability between different programming languages. By providing a robust mechanism for function interception, it allows MetaCall to redirect calls across language boundaries while maintaining type safety and ensuring correct behavior in complex scenarios such as multi-threaded applications with forking.
