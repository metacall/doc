---
title: CLI Commands
description: This page documents the MetaCall Command Line Interface (CLI) commands and their usage.
sidebar_position: 6
---

# CLI Commands

This page documents the MetaCall Command Line Interface (CLI) commands and their usage. The CLI provides a way to interact with MetaCall's polyglot runtime through command-line arguments and a Read-Eval-Print Loop (REPL) interface. For information about the REPL mode specifically, see [REPL Mode](./repl-mode.md).

## Overview

The MetaCall CLI enables users to:

- Load and execute code from multiple programming languages
- Call functions across language boundaries
- Configure runtime behavior through command-line options
- Interact with the system through an interactive REPL

## Command Execution Flow

Below is a diagram showing how commands flow through the MetaCall CLI system:

## CLI Architecture

The CLI consists of several interconnected components that process commands:

## Command Line Arguments

When launching MetaCall with command-line arguments, you can use the following options:
| Option | Short Form | Type | Description |
| --- | --- | --- | --- |
| `--help` | `-h` | Boolean | Display help information |
| `--empty` | Boolean | Empty flag with no parameters | `--option=VALUE` |
| `-o VALUE` | String | Option that takes a string value | `--multiple=VALUE` |
| `-m VALUE` | String | Option that can be specified multiple times | `--sandboxing` |
| Boolean | Enable sandbox mode for security isolation | `--disable_filesystem` | Boolean |
| Disable filesystem access in sandbox mode | `--disable_io` | Boolean | Disable I/O operations in sandbox mode |
| `--disable_time` | Boolean | Disable time-related functions in sandbox mode | Examples: |

## Script Execution

MetaCall CLI can execute scripts in various programming languages by mapping file extensions to the appropriate loader. To execute scripts, simply pass them as arguments:

The CLI uses the file extension to determine which loader to use. Here's the mapping of file extensions to loaders:
| File Extension | Loader Tag | Description |
| --- | --- | --- |
| `.py` | `py` | Python Loader |
| `.js`, `.node` | `node` | Node.js Loader |
| `.rb` | `rb` | Ruby Loader |
| `.cs`, `.dll`, `.vb` | `cs` | C# Loader |
| `.cob`, `.cbl`, `.cpy` | `cob` | Cobol Loader |
| `.ts`, `.jsx`, `.tsx` | `ts` | TypeScript Loader |
| `.wasm`, `.wat` | `wasm` | WebAssembly Loader |
| `.rs` | `rs` | Rust Loader |
| `.c`, `.h` | `c` | C Loader |
| `.java`, `.jar` | `java` | Java Loader |
| `.rpc` | `rpc` | RPC Loader |
| `.mock` | `mock` | Mock Loader (for testing) |

## REPL Commands

When launched without arguments, MetaCall CLI enters REPL mode with the following commands available:
| Command | Syntax | Description |
| --- | --- | --- |
| `load` | `load <tag> <files...>` | Load scripts using the specified loader tag |
| `eval` | `eval <tag> <code>` | Evaluate code string with specified runtime |
| `call` | `call <function>(<args>)` | Call a loaded function with arguments |
| `inspect` | `inspect` | Display information about loaded functions |
| `clear` | `clear <tag> <file>` | Unload a specific file |
| `help` | `help` | Display help information |
| `copyright` | `copyright` | Display copyright information |
| `debug` | `debug <args>` | Debug commands with various arguments |
| `exit` | `exit` | Exit the REPL |
Examples:

```
λ load py script.py
λ load node module.js
λ call add(5, 10)
λ eval node console.log('Hello from Node.js!')
λ inspect
λ exit
```

## Command Processing Sequence

The following sequence diagram illustrates how a command flows through the MetaCall CLI system:

## Plugin System

The CLI uses a plugin architecture for extensibility, with plugins organized into three categories:

1.  **Internal Plugins**: Core CLI functionality
    - Located in `plugins/cli/internal/`
    - Loaded at CLI startup

2.  **REPL Plugins**: Extensions for the REPL mode
    - Located in `plugins/cli/repl/`
    - Loaded when entering REPL mode

3.  **CMD Plugins**: Command-line argument handlers
    - Located in `plugins/cli/cmd/`
    - Loaded when processing command-line arguments

The CLI dynamically discovers and loads plugins from these directories during initialization.

## Sandboxing

The CLI provides sandboxing capabilities for enhanced security when executing untrusted code. When enabled with the `--sandboxing` flag, you can restrict access to:

- Filesystem operations (`--disable_filesystem`)
- Input/output operations (`--disable_io`)
- Time-related functions (`--disable_time`)

Example:

## Error Handling

The CLI provides error handling for exceptions that occur during command execution. When an exception is thrown, it displays:

1.  The exception message
2.  A stacktrace if available

This applies to both command-line execution and REPL mode.

Sources: [source/cli/metacallcli/source/application.cpp556-567](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L556-L567)
