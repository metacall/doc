---
title: Command Line Interface
---

# Command Line Interface

## Relevant source files

- [cmake/FindV8.cmake](https://github.com/metacall/core/blob/af9cad19/cmake/FindV8.cmake)
- [source/cli/metacallcli/include/metacallcli/application.hpp](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/include/metacallcli/application.hpp)
- [source/cli/metacallcli/source/application.cpp](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp)
- [source/cli/metacallcli/test/time.py](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/test/time.py)
- [source/cli/plugins/cli_cmd_plugin/include/cli_cmd_plugin/cli_cmd_plugin.hpp](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/include/cli_cmd_plugin/cli_cmd_plugin.hpp)
- [source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js)
- [source/cli/plugins/cli_cmd_plugin/source/test.js](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/test.js)
- [source/cli/plugins/cli_core_plugin/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_core_plugin/CMakeLists.txt)
- [source/cli/plugins/cli_repl_plugin/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/CMakeLists.txt)
- [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js)
- [source/cli/plugins/cli_repl_plugin/source/parser.js](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/parser.js)
- [source/cli/plugins/cli_repl_plugin/source/test.js](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/test.js)
- [source/cli/plugins/cli_sandbox_plugin/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_sandbox_plugin/CMakeLists.txt)
- [source/cli/plugins/cli_sandbox_plugin/include/cli_sandbox_plugin/cli_sandbox_plugin.h](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_sandbox_plugin/include/cli_sandbox_plugin/cli_sandbox_plugin.h)
- [source/cli/plugins/cli_sandbox_plugin/source/cli_sandbox_plugin.cpp](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_sandbox_plugin/source/cli_sandbox_plugin.cpp)
- [source/loader/include/loader/loader.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader.h)
- [source/loader/include/loader/loader_impl.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl.h)
- [source/loader/include/loader/loader_impl_interface.h](https://github.com/metacall/core/blob/af9cad19/source/loader/include/loader/loader_impl_interface.h)
- [source/loader/source/loader.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c)
- [source/loader/source/loader_impl.c](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader_impl.c)
- [source/metacall/include/metacall/metacall.h](https://github.com/metacall/core/blob/af9cad19/source/metacall/include/metacall/metacall.h)
- [source/metacall/source/metacall.c](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c)
- [source/tests/metacall_test/source/metacall_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_test/source/metacall_test.cpp)

The MetaCall Command Line Interface (CLI) provides a versatile environment for executing code in multiple programming languages, offering both direct script execution and an interactive REPL (Read-Eval-Print Loop) mode. This document explains the architecture and usage of the MetaCall CLI tool.

## Architecture Overview

The MetaCall CLI is built on top of the MetaCall Core library, providing a user-friendly interface to its polyglot functionality. The CLI architecture consists of several key components organized as plugins, allowing for modular extension of functionality.

- [source/cli/metacallcli/source/application.cpp41-298](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L41-L298)
- [source/cli/metacallcli/include/metacallcli/application.hpp32-136](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/include/metacallcli/application.hpp#L32-L136)

## Command Line Modes

The MetaCall CLI operates in two primary modes:

1.  **Command Mode**: Processes arguments passed when launching the CLI, executing scripts or specified operations
2.  **REPL Mode**: Provides an interactive environment for executing code across different languages

### Command Mode

When launched with arguments, the CLI parses them and performs the requested operations. The command mode supports loading and executing scripts in various languages, as well as command-line options.

The command mode automatically detects file extensions and loads the appropriate language runtime to execute the scripts.

- [source/cli/metacallcli/source/application.cpp96-257](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L96-L257)
- [source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js57-107](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js#L57-L107)

### REPL Mode

When launched without arguments, the CLI enters REPL mode, providing an interactive shell for executing code across languages and MetaCall commands.

The REPL environment allows users to perform operations such as loading scripts, calling functions, evaluating code snippets, and inspecting loaded modules across different programming languages.

- [source/cli/metacallcli/source/application.cpp41-94](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L41-L94)
- [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js31-149](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js#L31-L149)
- [source/cli/plugins/cli_repl_plugin/source/parser.js1-108](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/parser.js#L1-L108)

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

- [source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js57-107](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js#L57-L107)
- [source/cli/plugins/cli_repl_plugin/source/parser.js1-82](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/parser.js#L1-L82)

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

- [source/cli/metacallcli/source/application.cpp305-373](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L305-L373)

## Plugin System

The MetaCall CLI uses a plugin architecture to provide extensibility. The plugin system consists of:

1.  **Internal Plugins**: Core functionality for the CLI
2.  **REPL Plugins**: Plugins that provide REPL mode functionality
3.  **Command Plugins**: Plugins that implement command-line options

Plugins are loaded dynamically using the MetaCall plugin system, allowing for modular extension of CLI functionality.

- [source/cli/metacallcli/source/application.cpp375-422](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L375-L422)
- [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js31-67](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js#L31-L67)
- [source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js7-54](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js#L7-L54)

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

- [source/cli/plugins/cli_repl_plugin/source/test.js1-63](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/test.js#L1-L63)

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

- [source/cli/metacallcli/source/application.cpp258-298](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L258-L298)
- [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js31-149](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js#L31-L149)

## Integration with MetaCall Core

The CLI integrates with MetaCall Core through the API, enabling it to:

1.  Load scripts in different languages
2.  Execute functions across language boundaries
3.  Convert values between different language representations
4.  Inspect loaded modules and functions

This integration allows the CLI to serve as a unified interface for polyglot programming, making it easy to work with code in multiple languages simultaneously.

The CLI's deep integration with MetaCall Core enables a seamless development experience across multiple programming languages.

- [source/metacall/source/metacall.c259-298](https://github.com/metacall/core/blob/af9cad19/source/metacall/source/metacall.c#L259-L298)
- [source/loader/source/loader.c329-349](https://github.com/metacall/core/blob/af9cad19/source/loader/source/loader.c#L329-L349)

## Extending the CLI

The CLI can be extended by creating new plugins that register additional commands or options. This can be done by:

1.  Creating a new plugin in the appropriate directory (`plugins/cli/repl` or `plugins/cli/cmd`)
2.  Implementing the plugin interface (for REPL or CMD)
3.  Registering commands or options

This allows for extending the CLI with custom functionality beyond what's provided out of the box.

- [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js152-199](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js#L152-L199)
- [source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js57-76](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_cmd_plugin/source/cli_cmd_plugin.js#L57-L76)

## Conclusion

The MetaCall CLI provides a powerful interface to the MetaCall Core functionality, enabling users to work with multiple programming languages in both script execution and interactive REPL modes. Its plugin-based architecture allows for extensibility, making it a flexible tool for polyglot programming.
