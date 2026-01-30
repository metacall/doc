---
title: Architecture
---

# Architecture

This page provides a comprehensive overview of the MetaCall Core architecture, explaining the structure and interactions between key components that enable cross-language function calls. For information about specific language support, see [Supported Languages](./supported-languages.md), and for details about using the core API, see [Core API](./core-api.md).
## System Overview

MetaCall is designed as a modular system that enables seamless function calls between different programming languages. The architecture follows a plugin-based approach, with core components handling reflection, type conversion, and function dispatching.

The architecture consists of four main components:

1.  **MetaCall Core**: The central system that manages language interoperability through reflection, value conversion, serialization, and function hooking (detours).
2.  **Loader System**: Responsible for loading and executing code from different programming languages. Each loader specializes in a specific language runtime and bridges MetaCall core with the language's native environment.
3.  **Ports**: Provide language-specific interfaces to MetaCall, allowing developers to use MetaCall capabilities naturally from their preferred language.
4.  **CLI & Tools**: Command-line interfaces and build tools for compiling, configuring, and using the MetaCall system.

## Initialization and Runtime Flow

The MetaCall initialization process establishes the runtime environment and prepares the system for cross-language function calls.

The initialization sequence includes:

1.  **Core Initialization**: Sets up the MetaCall environment, including detours, serialization, and configuration.
2.  **Loader Manager Initialization**: Prepares the plugin system for language loaders.
3.  **Loader Registration**: Each language loader is registered with the system.
4.  **Runtime Integration**: When code is loaded, the appropriate language runtime is initialized if not already active.
5.  **Function Registration**: Functions from loaded code are registered in the reflection system for cross-language access.

## Core Components

### Reflection System

The reflection system provides introspection capabilities, allowing MetaCall to understand function signatures, types, and calling conventions across different languages.

The reflection system maintains information about:

- **Contexts**: Represent execution environments, typically one per loaded module.
- **Scopes**: Contain functions, objects, and other symbols within a context.
- **Functions**: Represent callable code with signatures and implementations.
- **Signatures**: Define the parameter types and return type of functions.
- **Types**: Describe data types across language boundaries.

### Value System

The value system provides a common representation for data across different languages, enabling type conversion and function parameter passing.

The value system provides:

- **Common Type Representation**: A unified type system that maps between language-specific types.
- **Value Creation Functions**: Functions like `metacall_value_create_*` to create values of different types.
- **Value Conversion**: Functions to convert between different types when needed.
- **Memory Management**: Consistent allocation and deallocation of values.

### Loader System

The loader system manages language-specific loaders, which are responsible for integrating different language runtimes with MetaCall.

The loader system includes:

- **Loader Manager**: Coordinates all loaders and manages their lifecycle.
- **Plugin System**: Enables dynamic loading of language loaders as plugins.
- **Common Interface**: A standardized interface that all loaders implement.
- **Language-Specific Loaders**: Specialized implementations for each supported language.

Each loader implements the following interface methods:

- `initialize`: Sets up the language runtime.
- `execution_path`: Configures the paths where code is loaded from.
- `load_from_file`: Loads code from files.
- `load_from_memory`: Loads code from memory buffers.
- `load_from_package`: Loads code from packages.
- `clear`: Unloads modules.
- `discover`: Introspects loaded modules to find functions and types.
- `destroy`: Cleans up resources.

## Foreign Function Interface

The foreign function interface (FFI) is the core mechanism that allows calls between different languages. It handles function discovery, parameter passing, type conversion, and return value handling.

The FFI provides several methods for calling functions:

- `metacall`: Call a function by name with variable arguments.
- `metacallv`: Call a function by name with an array of values.
- `metacallhv`: Call a function by handle and name with an array of values.
- `metacallfv`: Call a function directly with an array of values.

These functions handle type conversion between languages, ensuring that data is correctly interpreted across language boundaries.

## Port System

The port system provides language-specific interfaces to MetaCall, allowing developers to use MetaCall capabilities from their preferred language with a natural API.

Ports provide:

- **Native API**: A language-specific API that feels natural to users of that language.
- **Type Mapping**: Automatic conversion between the language's native types and MetaCall types.
- **Error Handling**: Appropriate error handling mechanisms for each language.
- **Memory Management**: Integration with the language's garbage collection or memory management system.

## Build System

MetaCall uses a flexible build system that supports multiple platforms and configurations, allowing developers to customize which languages and features are included.

The build system includes:

- **Environment Setup**: Scripts that install dependencies and prepare the development environment.
- **Build Configuration**: Scripts and CMake files that configure the build with options for which languages and features to include.
- **Build Process**: Scripts that compile the source code, run tests, and create Docker images.
- **Continuous Integration**: GitHub Actions workflows that automate testing, sanitizer checks, and code coverage analysis.

## Runtime Initialization Sequence

When initializing MetaCall, a specific sequence of operations occurs to prepare the system for cross-language function calls.

The initialization sequence includes:

1.  **Environment Variables**: Setting up necessary environment variables like `METACALL_VERSION`.
2.  **Detours System**: Initializing the function hooking mechanism.
3.  **Link System**: Setting up the linking between different components.
4.  **Fork Safety**: Preparing fork safety mechanisms if enabled.
5.  **Configuration**: Loading and processing configuration files.
6.  **Loader System**: Initializing the loader manager and registering loaders.
7.  **Plugins**: Loading core plugins for additional functionality.

## Cross-Language Data Flow

When data flows between languages through MetaCall, it undergoes several transformations to ensure type compatibility.

The data flow involves:

1.  **Source Language Type Mapping**: The source language's native type is mapped to a MetaCall type.
2.  **Value Conversion**: The source language's native value is converted to a MetaCall value.
3.  **Type Checking/Conversion**: If needed, the MetaCall value may be converted to match the expected type.
4.  **Target Language Conversion**: The MetaCall value is converted to the target language's native value.

This process ensures that data can be correctly passed between languages with appropriate type conversion, even when the languages have different type systems.

## Summary

The MetaCall architecture provides a robust foundation for cross-language function calls, with modular components that handle different aspects of language interoperability. The core systems for reflection, value handling, and loading work together to enable seamless integration between different programming languages, while the build system and tools provide flexibility for developers to customize their MetaCall installation.

The key strength of the architecture lies in its extensibility: new language loaders can be added as plugins, and the common interfaces ensure consistent behavior across different languages. This makes MetaCall a powerful tool for polyglot programming, allowing developers to leverage the strengths of different languages within a single application.
