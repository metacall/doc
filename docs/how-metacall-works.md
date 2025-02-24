---
sidebar_position: 2
---

# How MetaCall works

`Metacall` is a runtime that allows you to seamlessly connect and interoperate between multiple programming languages. It acts as a bridge, enabling you to call functions from one language in another without worrying about compatibility issues.

<br/>
import Arch from '@site/static/img/arch.png';

<img src={Arch} style={{ 
    boxShadow: "5px 5px 10px #888", 
    border: "2px solid black",
    width: "40vw", 
    maxWidth: "100%", 
    display: "block", 
    margin: "auto"
}} />
<br/>

### 1. Ports

`Ports` are the entry points where your code is accepted into the Metacall system. Each port corresponds to a specific programming language.

Ports act as adapters, ensuring that the code from different languages can be understood and processed by Metacall.

If you run an `index.js` file, the Node port will accept it and forward it to the Metacall C API.

### 2. Metacall C API

The `Metacall C API` is the core component that connects the ports to the loaders. It acts as a dispatcher, routing functions to the appropriate language runtime.

The C API is written in C for performance and compatibility reasons, as C can easily interface with almost any programming language.

If your `index.js` file contains a call to a Python function, the Metacall C API will detect this and send the Python function to the Python loader, while sending the JavaScript functions to the Node loader.

### 3. Metacall Object Protocol

import MOP from '@site/static/img/meta-object-protocol.png';

<img src={MOP} style={{ 
    boxShadow: "5px 5px 10px #888", 
    border: "2px solid black",
    width: "25vw", 
    maxWidth: "100%", 
    display: "block", 
    margin: "auto"
}}/>

<br/>
The `MOP` is responsible for handling data type conversions between different languages. Each language has its own data types (e.g., integers, strings, objects), and the MOP ensures these types can be converted seamlessly.

The MOP avoids type mismatches and ensures smooth communication between languages.

If a Python function returns a dictionary, the MOP will convert it into a JavaScript object so it can be used in your index.js file.

### 4. Loaders

import Loader from '@site/static/img/loader.png';

<img 
  src={Loader} 
  style={{ 
    boxShadow: "5px 5px 10px #888", 
    border: "2px solid black",
    width: "15vw", 
    maxWidth: "100%", 
    display: "block", 
    margin: "auto"
  }} 
/>
<br/>

Loaders are responsible for loading the appropriate runtime for a specific language and executing the function.

Loaders are language-specific and ensure that the correct runtime environment is initialized for execution.

When the Python loader receives a Python function, it loads the Python runtime, executes the function, and sends the output back to the Metacall C API.

### 5. Serials

Serials handle the serialization and deserialization of data. Serialization is the process of converting data into a format that can be easily transferred between languages, while deserialization is the reverse process.

Serials ensure that data remains consistent and intact when moving between different language runtimes.

If a Python function returns a complex data structure, the serials will convert it into a format (like JSON) that can be understood by JavaScript.

