---
sidebar_position: 3
---

# Understanding Metacall CLI

This document will guide you through the basic commands of MetaCall CLI, explaining each one with simple examples to help you get started.

### 0. Running Metacall CLI

- Open your terminal.
- Type the following command and press Enter:

```
 metacall
```
import MacInstall from '@site/static/img/metacall-install-mac.png';

<img src={MacInstall} />

### 1. Load a Script

The `load` command is used to load a script from a file into MetaCall. You need to specify the runtime (the programming language) and the path to the script.

- Usage:
    ```
    load <runtime tag> <script0> <script1> ... <scriptN>
    ```
    `<runtime tag>` : The type of script (e.g., py for Python, node for NodeJS).

    `<script0> <script1> ... <scriptN>` : The path(s) to the script(s).

import LoadCmd from '@site/static/img/load-cmd.png';

- Example:

    <img src={LoadCmd} />

### 2. Inspect Loaded Scripts

The `inspect` command shows all the runtimes, modules, and functions that have been loaded into MetaCall. It also displays the function signatures.

- Usage:
    ```
     inspect
    ```
import InspectCmd from '@site/static/img/inspect-cmd.png';

- Example:

    <img src={InspectCmd} />

### 3. Evaluate a Code Snippet

The `eval` command allows you to execute a small piece of code directly in the specified runtime.

- Usage:
    ```
     eval <runtime tag> <script>
    ```
    `<runtime tag>` : The type of script (e.g., py for Python, node for NodeJS).

    `<script>` : The code snippet to execute.

  
import EvalCmd from '@site/static/img/eval-cmd.png';

- Example:

    <img src={EvalCmd} />


### 4. Call a Function

The `call` command is used to call a function that has been previously loaded into MetaCall. You can pass arguments to the function in JSON format.

- Usage:
    ```
     call <function name>(<arg0>, <arg1>, ... , <argN>)
    ```
    `<function name>` : The name of the function to call.

    `<arg0>, <arg1>, ... , <argN>` : Arguments to pass to the function.

  
import CallCmd from '@site/static/img/call-cmd.png';

- Example:

    <img src={CallCmd} />

### 5. Await an Async Function

The `await` command is similar to `call`, but it is used for asynchronous functions. It waits for the function to complete and returns the result.

- Usage:
    ```
     await <function name>(<arg0>, <arg1>, ... , <argN>)
    ```
    `<function name>` : The name of the function to call.

    `<arg0>, <arg1>, ... , <argN>` : Arguments to pass to the function.

  
import AwaitCmd from '@site/static/img/await-cmd.png';

- Example:

    <img src={AwaitCmd} />

### 6. Clear a Script

The `clear` command removes a previously loaded script from MetaCall. You need to specify the runtime and the script name.

- Usage:
    ```
     clear <runtime tag> <script0> <script1> ... <scriptN>
    ```
    `<runtime tag>` : The type of script (e.g., py for Python, node for NodeJS).

    `<script0> <script1> ... <scriptN>` : The path(s) to the script(s) to remove.

  
import ClearCmd from '@site/static/img/clear-cmd.png';

- Example:

    <img src={ClearCmd} />

`<runtime tag>` : The type of script (e.g., py for Python, node for NodeJS).

    `<script0> <script1> ... <scriptN>` : The path(s) to the script(s).

### 7. Exit the CLI

The `exit` command is used to close the MetaCall CLI.
  
import ExitCmd from '@site/static/img/exit-cmd.png';

- Example:

    <img src={ExitCmd} />

### 8. Show Help

The `help` command displays the list of available commands and their usage.

import HelpCmd from '@site/static/img/help-cmd.png';

- Example:

    <img src={HelpCmd} />

<br/>
By understanding these basic commands, you can load, execute, and manage scripts with ease. Happy scripting! 🚀
