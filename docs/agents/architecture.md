---
title: Architecture
description: High-level overview of MetaCall Core components and how cross-language function calls work.
sidebar_position: 2
---

# Architecture

## Overview

MetaCall Core is a modular runtime that enables **calling functions across different programming languages** through a single unified interface.

At a high level, MetaCall works by:

1. Loading code into language runtimes using **loaders**
2. Registering discovered functions/types into a **reflection system**
3. Converting data between languages using a shared **value system**
4. Dispatching calls through a **foreign function interface (FFI)**

If you want the list of supported languages, see **Supported Languages**.  
If you want to call functions programmatically, see **Core API**.

---

## Key Concepts

### MetaCall Core

The central runtime responsible for:

- initialization and configuration
- reflection (metadata about functions/types)
- value conversion between languages
- dispatching function calls across language boundaries

### Loader System

A **loader** is a language integration module that can:

- initialize a language runtime (e.g., Python, NodeJS, Ruby)
- load code from file/memory/package
- discover functions and types
- expose them to MetaCall Core

### Reflection System

The reflection system stores “what is available to call” after code is loaded.

It tracks:

- **contexts**: execution environments created when loading modules
- **scopes**: symbol containers inside a context
- **functions**: callable symbols (name + signature + implementation)
- **signatures**: parameter and return type definitions
- **types**: cross-language type descriptors

### Value System

MetaCall uses a unified value representation to move data between languages.

This system handles:

- creating values (integers, strings, arrays, objects, etc.)
- converting values between language runtimes
- memory management for values across boundaries

### Ports

Ports provide language-specific APIs so developers can use MetaCall naturally from a given language.

Ports typically handle:

- mapping native types ↔ MetaCall values
- exposing a “native-feeling” API
- integrating error handling and memory conventions of the host language

### CLI & Tools

MetaCall includes tooling to support:

- configuration and build options
- running MetaCall from a command-line interface
- development workflows (tests, packaging, runtime setup)

---

## How MetaCall Executes Cross-Language Calls (Runtime Flow)

A typical execution flow looks like this:

1. **Initialize MetaCall**
   - sets up global runtime state and configuration
2. **Initialize loader manager**
   - prepares the loader/plugin system
3. **Register loaders**
   - makes language runtimes available
4. **Load code**
   - selects the correct loader and loads source/module/package
5. **Discover symbols**
   - extracts functions/types into the reflection system
6. **Call functions**
   - performs argument conversion and dispatches the call through FFI
7. **Convert return value**
   - converts the result back to the caller’s language representation

---

## Loader Interface (What Every Loader Must Provide)

Each loader is expected to support a standard set of operations such as:

- `initialize`: start and configure the language runtime
- `execution_path`: configure search paths for modules/packages
- `load_from_file`: load code from file(s)
- `load_from_memory`: load code from a memory buffer
- `load_from_package`: load code from a language package/module format
- `discover`: locate functions/types and register them into reflection
- `clear`: unload modules and clear symbols (when supported)
- `destroy`: shut down runtime and free resources

This standardized interface is what makes MetaCall extensible:  
**adding a new language integration becomes “implement a loader.”**

---

## Foreign Function Interface (FFI)

The FFI layer is the “call engine” of MetaCall.

It handles:

- selecting the correct function implementation
- validating arguments
- converting types and values
- calling into the target runtime
- returning values back to the caller

MetaCall provides multiple call variants depending on how you reference the target function:

- `metacall`: call a function by name using variable arguments
- `metacallv`: call by name using an array of values
- `metacallhv`: call by handle + name using an array of values
- `metacallfv`: call a function directly using an array of values

---

## Cross-Language Data Flow (Type Conversion)

When passing data from one language to another, MetaCall follows this general process:

1. **Map source language type → MetaCall type**
2. **Convert source value → MetaCall value**
3. **Validate or convert to expected target type (if needed)**
4. **Convert MetaCall value → target language value**

This allows interoperability even when languages have different type systems.

---

## Build and Configuration Model (High Level)

MetaCall is designed to be configurable across:

- platforms (Linux, macOS, Windows)
- build modes (debug/release)
- enabled language runtimes (only build what you need)

A typical build setup includes:

- environment/dependency setup scripts
- build configuration (CMake options)
- compilation + tests
- optional container-based builds (Docker)

---

## Common Mistakes / Debugging Notes

### “My function is not found”

Usually means one of these:

- the correct loader was not initialized
- the code was not loaded successfully
- symbol discovery did not register the function into reflection

### “Type mismatch / wrong return type”

This typically happens when:

- arguments are passed in a format the target runtime does not accept
- implicit conversion is not supported for that loader/runtime

### “Loader works for one language but not another”

Check:

- runtime initialization order
- loader registration
- execution paths / module discovery paths

---

## Summary

MetaCall Core is built around four major building blocks:

- **Loaders** to integrate language runtimes
- **Reflection** to store callable symbols and types
- **Values** to safely exchange data across runtimes
- **FFI dispatch** to execute cross-language calls

This architecture is designed to be extensible:  
new languages can be added by implementing the loader interface while keeping a consistent runtime model.

---

## Related

- [Supported Languages](./supported-languages.md)
- [Core API](./core-api.md)
