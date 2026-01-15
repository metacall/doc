---
title: REPL Mode
---

# REPL Mode

## Relevant source files

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

The MetaCall REPL (Read-Eval-Print Loop) provides an interactive shell environment for executing cross-language function calls and managing code loading across different programming languages. This page documents the REPL mode implementation, its architecture, and usage patterns.

For information about CLI commands available in the REPL, see [CLI Commands](/metacall/core/7.1-cli-commands).

## Overview

The REPL mode serves as an interactive interface to the MetaCall runtime, allowing developers to:

1.  Load source files from different programming languages
2.  Evaluate code snippets in various languages
3.  Inspect loaded functions and objects
4.  Call functions across language boundaries
5.  Debug cross-language applications

The REPL is automatically started when MetaCall CLI is launched without arguments.

## Architecture

### REPL System Components

### REPL Execution Flow

## Initialization Process

The REPL mode is initialized when:

1.  The MetaCall CLI is launched without arguments
2.  The CLI is launched with options but no positional arguments (files to execute)

During initialization, the following steps are performed:

1.  Load CLI internal plugins from the `internal` directory
2.  Load REPL plugins from the `repl` directory
3.  Register the `exit` function for terminating the REPL
4.  Initialize REPL descriptors from plugin path
5.  Start the Node.js-based REPL interface

## Command Processing

### Command Format

Commands in the REPL follow a specific structure:

```
command [arg1] [arg2] ...
```

The first token is treated as the command name, and subsequent tokens are passed as arguments to the command handler.

### Command Registration and Parsing

Commands are registered in the REPL using a registration system that specifies:

1.  Command name
2.  Regular expressions for parsing arguments
3.  Expected argument types

### Command Execution Flow

When a command is executed:

1.  The command string is parsed into tokens
2.  The first token identifies the command
3.  If the command is registered, the handler is called with the remaining tokens
4.  The result is returned and displayed in the REPL

The `execute` method in the application class handles this process:

## Plugin System

The REPL mode uses a plugin system to extend its functionality. Plugins are loaded from:

```
${METACALL_PLUGIN_PATH}/cli/repl/${plugin_name}/${plugin_name}_repl.js
```

Each plugin can register new commands and provide implementations for those commands.

## REPL Implementation Details

The REPL is implemented using the Node.js built-in REPL module, customized with MetaCall-specific evaluator and completer functions:

Component

Description

Prompt

Uses the lambda symbol (λ) to indicate input readiness

Context

Provides an isolated VM context for evaluation

Evaluator

Custom function that processes commands through the MetaCall parser

Completer

Provides command completion based on registered commands

## REPL Promise Chain

The REPL implementation uses a promise chain mechanism to manage the asynchronous nature of command evaluation:

This allows the CLI main loop to wait for each command to complete before accepting new input.

## Error Handling

The REPL mode includes comprehensive error handling to:

1.  Capture parsing errors from malformed commands
2.  Handle exceptions from command execution
3.  Manage errors from cross-language function calls
4.  Provide meaningful error messages to users

When an error occurs:

- If during parsing: The error is wrapped and returned to the application
- If during execution: The exception is captured and displayed with its stack trace

## Exiting the REPL

The REPL mode can be terminated by:

1.  Using the `exit` command
2.  Pressing Ctrl+C (SIGINT) or Ctrl+D (EOF)

The exit function sets the `exit_condition` flag to true, which breaks the main REPL loop and performs cleanup operations.

## Available Commands

The REPL comes with a set of built-in commands loaded from the core plugin. These commands include:

Command

Purpose

`load <tag> <files...>`

Load source files with specified loader

`inspect`

List all loaded functions

`eval <tag> <code>`

Evaluate code snippet with specified loader

`call <function>(<args>)`

Call a function with arguments

`clear <tag> <file>`

Clear a loaded module

`help`

Display help information

`copyright`

Show copyright information

`exit`

Exit the REPL

Additional commands may be available through plugins.

## Example Usage

Here's a typical usage scenario of the REPL mode:

```
$ metacall

Welcome to Tijuana, tequila, sexo & marijuana.
λ load py hello.py
λ inspect
hello.greet
λ call hello.greet("world")
Hello, world!
λ eval node console.log("JavaScript code in REPL")
JavaScript code in REPL
λ exit
Exiting ...
```

Sources: [source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js72](https://github.com/metacall/core/blob/af9cad19/source/cli/plugins/cli_repl_plugin/source/cli_repl_plugin.js#L72-L72) [source/cli/metacallcli/source/application.cpp62-63](https://github.com/metacall/core/blob/af9cad19/source/cli/metacallcli/source/application.cpp#L62-L63)
