---
title: Command Line Interface
sidebar_position: 7
description: Overview of MetaCall CLI architecture, modes, REPL commands, plugin system, and usage.
---

# Command Line Interface

The MetaCall Command Line Interface (CLI) provides a versatile environment for executing code in multiple programming languages, offering both direct script execution and an interactive REPL (Read-Eval-Print Loop) mode. This document explains the architecture and usage of the MetaCall CLI tool.

## Architecture Overview

The MetaCall CLI is built on top of the MetaCall Core library, providing a user-friendly interface to its polyglot functionality. The CLI architecture consists of several key components organized as plugins, allowing for modular extension of functionality.

## Command Line Modes

The MetaCall CLI operates in two primary modes:

1.  **Command Mode**: Processes arguments passed when launching the CLI, executing scripts or specified operations
2.  **REPL Mode**: Provides an interactive environment for executing code across different languages

### Command Mode

When launched with arguments, the CLI parses them and performs the requested operations. The command mode supports loading and executing scripts in various languages, as well as command-line options.

The command mode automatically detects file extensions and loads the appropriate language runtime to execute the scripts.

### REPL Mode

When launched without arguments, the CLI enters REPL mode, providing an interactive shell for executing code across languages and MetaCall commands.

The REPL environment allows users to perform operations such as loading scripts, calling functions, evaluating code snippets, and inspecting loaded modules across different programming languages.

## Command Parsing and Execution

The CLI uses different parsing approaches depending on the mode:

1.  **Command Mode Parser**: Utilizes Node.js's `util.parseArgs()` to process command-line arguments, separating options from positional arguments.
2.  **REPL Mode Parser**: Uses a custom parser that tokenizes input based on registered command patterns, using regular expressions to match and extract parameters.

### Command Registration and Extension

The CLI supports multiple commands through a registration mechanism. Commands are registered with:

- A name
- Optional short form (for command-line options)
- Type information
- Handler functions

## Language Support and Script Loading

The CLI supports loading and executing scripts in various programming languages. It maps file extensions to the appropriate loaders:
| Extension | Language/Loader |
| --- | --- |
| `.py` | Python |
| `.js`, `.node` | Node.js |
| `.rb` | Ruby |
| `.cs`, `.dll`, `.vb` | C# |
| `.ts`, `.jsx`, `.tsx` | TypeScript |
| `.wasm`, `.wat` | WebAssembly |
| `.rs` | Rust |
| `.c`, `.h` | C |
| `.java`, `.jar` | Java |
| `.rpc` | RPC |
The CLI uses this mapping to automatically select the appropriate loader when executing scripts.

## Plugin System

The MetaCall CLI uses a plugin architecture to provide extensibility. The plugin system consists of:

1.  **Internal Plugins**: Core functionality for the CLI
2.  **REPL Plugins**: Plugins that provide REPL mode functionality
3.  **Command Plugins**: Plugins that implement command-line options

Plugins are loaded dynamically using the MetaCall plugin system, allowing for modular extension of CLI functionality.

## REPL Commands

The REPL mode provides several built-in commands for interacting with MetaCall:
| Command | Description | Example |
| --- | --- | --- |
| `load` | Load scripts from files | `load py script.py other_script.py` |
| `inspect` | Inspect loaded modules and functions | `inspect` |
| `eval` | Evaluate code in a specific language | `eval node console.log("hello world")` |
| `call` | Call a function with parameters | `call multiply(3, 4)` |
| `clear` | Clear a loaded script | `clear py script.py` |
| `help` | Display help information | `help` |
| `exit` | Exit the REPL | `exit` |
The REPL provides command completion for registered commands and displays results in a user-friendly format.

## Using the CLI

### Basic Usage

```
# Launch the REPL
metacall

# Execute a Python script
metacall script.py

# Execute multiple scripts
metacall script.py script.js script.rb

# Use command-line options
metacall --help
```

### Using the REPL

Once in REPL mode, you can:

1.  Load scripts:

    ```
    λ load py script.py
    ```

2.  Call functions from loaded scripts:

    ```
    λ call multiply(3, 4)
    ```

3.  Evaluate code in a specific language:

    ```
    λ eval node console.log("Hello from Node.js")
    ```

4.  Inspect loaded modules and functions:

    ```
    λ inspect
    ```

5.  Exit the REPL:

    ```
    λ exit
    ```

## Integration with MetaCall Core

The CLI integrates with MetaCall Core through the API, enabling it to:

1.  Load scripts in different languages
2.  Execute functions across language boundaries
3.  Convert values between different language representations
4.  Inspect loaded modules and functions

This integration allows the CLI to serve as a unified interface for polyglot programming, making it easy to work with code in multiple languages simultaneously.

The CLI's deep integration with MetaCall Core enables a seamless development experience across multiple programming languages.

## Extending the CLI

The CLI can be extended by creating new plugins that register additional commands or options. This can be done by:

1.  Creating a new plugin in the appropriate directory (`plugins/cli/repl` or `plugins/cli/cmd`)
2.  Implementing the plugin interface (for REPL or CMD)
3.  Registering commands or options

This allows for extending the CLI with custom functionality beyond what's provided out of the box.

## Conclusion

The MetaCall CLI provides a powerful interface to the MetaCall Core functionality, enabling users to work with multiple programming languages in both script execution and interactive REPL modes. Its plugin-based architecture allows for extensibility, making it a flexible tool for polyglot programming.
