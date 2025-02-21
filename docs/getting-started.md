---
sidebar_position: 1
---

# Getting Started with Metacall

**Metacall** is a **polyglot** tool that allows calling *functions*, *methods*, *procedures* between different programming languages.

With **Metacall** you can call *Python* functions from *NodeJS*, run *C#* methods from *Golang* and much more.  

### Example Usage

Invoking a *Python* function inside a *JavaScript* file.

`index.js`
```js
  const {sum} = require('./main.py');
  console.log("Hello from Node.js");
  sum(3, 4);
```

`main.py`
```py
  def sum(a,b):
    print("Hello from Python")
    print(f"Sum of {a} and {b} is {a+b}")
```

`Output :`

import ExampleUsage from '@site/static/img/example-usage.png';

<img src={ExampleUsage}/>

### Use Cases of Metacall

The main use case of Metacall is to combine multiple programming languages, allowing the weaknesses of one language to be offset by the strengths of another.


| Use Case                          | Language Combination | Strengths                                              |
|:---------------------------------:|:--------------------:|:------------------------------------------------------:|
| Real-Time Data Processing + ML    | Go + Python         | Go: Speed and concurrency; Python: ML and data analysis. |
| High-Performance Web Server       | Node.js + Rust      | Node.js: Scalability; Rust: Performance and memory safety. |
| Enterprise Application Development | Ruby + C#          | Ruby: Rapid prototyping; C#: Enterprise features and strong typing. |


### Components of Metacall

- **Metacall CLI**: This is a `CLI` runtime tool that lets you execute and manage code across multiple languages directly from the command line. To install Metacall CLI visit: <a href="/docs/category/installating-metacall-cli/">`CLI Installation Docs`</a>

- **Metacall Library**: The MetaCall Library acts as a module for each programming language, which can be installed using package managers like `npm` for JavaScript, `pip` for Python, and others. It enables seamless integration of files and functions across different languages, making it easy to connect and communicate between them. To install Metacall Library for your projects visit: <a href="/docs/category/using-metacall">`Using Metacall Library`</a>

### Languages supported by Metacall

Metacall supports `Node.js (JavaScript), Python, and Ruby` out of the box. This means you can start using these languages immediately without any additional setup. However, if you want to integrate other programming languages (like C#, R, or others), you’ll need to install their respective compilers or interpreters. To build Metacall for additional languages please visit: <a href="/docs/category/using-metacall">`Using Metacall`</a>

| Language     | Tag  | Runtime                                | Version                         |
|:-----------:|:----:|:--------------------------------------:|:-------------------------------:|
| Python      | py   | Python C API                          | 3.2 \<= version \<= 3.9             |
| NodeJS      | node | N API                                 | 10.22.0 \<= version \<= 17.x.x      |
| Ruby        | rb   | Ruby C API                            | 2.1 \<= version \<= 2.7             |
| TypeScript  | ts   | TypeScript Language Service API       | 4.2.3                           |
| JavaScript  | js   | V8                                    | 5.1.117                         |
| C#          | cs   | NetCore                               | 1.0.0 \<= version \<= 7.0.4         |
| Cobol       | cob  | GNU/Cobol                             | version \>= 1.1.0                 |
| RPC         | rpc  | cURL                                  | version \>= 7.64.0                |
| Java        | java | JVM                                   | version \>= 11                    |
| WebAssembly | wasm | Wasmtime                              | 0.27 \<= version \<= 8.0.1          |
| C           | c    | libclang - Tiny C Compiler - libffi   | 1.2 \<= version \<= 3.2             |
| Rust        | rs   | rustc - libffi                        | nightly-2021-12-04              |

import MetacallMeme from '@site/static/img/metacall-meme.png'

Now that you know what Metacall is, learn how it works behind the scenes. 🚀

<img src={MetacallMeme} />