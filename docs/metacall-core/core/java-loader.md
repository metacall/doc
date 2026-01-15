---
title: Java Loader
---

# Java Loader

## Relevant source files

- [CONTRIBUTORS](https://github.com/metacall/core/blob/af9cad19/CONTRIBUTORS)
- [deploy/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/deploy/CMakeLists.txt)
- [source/loaders/c_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/c_loader/CMakeLists.txt)
- [source/loaders/cs_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/cs_loader/CMakeLists.txt)
- [source/loaders/file_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/file_loader/CMakeLists.txt)
- [source/loaders/java_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/java_loader/CMakeLists.txt)
- [source/loaders/java_loader/bootstrap/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/java_loader/bootstrap/CMakeLists.txt)
- [source/loaders/java_loader/bootstrap/lib/bootstrap.java](https://github.com/metacall/core/blob/af9cad19/source/loaders/java_loader/bootstrap/lib/bootstrap.java)
- [source/loaders/java_loader/source/java_loader_impl.cpp](https://github.com/metacall/core/blob/af9cad19/source/loaders/java_loader/source/java_loader_impl.cpp)
- [source/loaders/js_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/js_loader/CMakeLists.txt)
- [source/loaders/jsm_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/jsm_loader/CMakeLists.txt)
- [source/loaders/mock_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/mock_loader/CMakeLists.txt)
- [source/loaders/py_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/py_loader/CMakeLists.txt)
- [source/loaders/rb_loader/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/rb_loader/CMakeLists.txt)
- [source/scripts/java/cmake/JavaJarProject.cmake.in](https://github.com/metacall/core/blob/af9cad19/source/scripts/java/cmake/JavaJarProject.cmake.in)
- [source/scripts/java/jartest/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/java/jartest/CMakeLists.txt)
- [source/scripts/java/jartest/source/JarTest.jar](https://github.com/metacall/core/blob/af9cad19/source/scripts/java/jartest/source/JarTest.jar)
- [source/scripts/java/test/source/Test.java](https://github.com/metacall/core/blob/af9cad19/source/scripts/java/test/source/Test.java)
- [source/scripts/python/wasm/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/wasm/CMakeLists.txt)
- [source/serials/metacall_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/metacall_serial/CMakeLists.txt)
- [source/serials/rapid_json_serial/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/serials/rapid_json_serial/CMakeLists.txt)
- [source/tests/metacall_java_test/source/metacall_java_test.cpp](https://github.com/metacall/core/blob/af9cad19/source/tests/metacall_java_test/source/metacall_java_test.cpp)

The Java Loader is a component of the MetaCall Core that enables execution of Java code and interoperability between Java and other programming languages supported by MetaCall. This page documents the architecture, implementation, and functionality of the Java Loader.

## Overview

The Java Loader provides the capability to load and execute Java code from files, memory, or Java Archive (JAR) packages. It bridges the gap between Java's runtime environment and MetaCall's foreign function interface (FFI) system by translating types, managing method calls, handling objects, and facilitating data exchange.

## Architecture

The Java Loader architecture consists of three main components:

1.  **Java Loader Implementation**: A C++ module that implements the loader interface required by MetaCall and manages interaction with the JVM.
2.  **JNI Interface**: The native interface that allows C++ code to interact with the Java Virtual Machine.
3.  **Bootstrap Java Class**: A utility class that helps with class loading, compilation, and reflection.

## Core Components

### Java Native Interface (JNI)

The Java Loader uses JNI to bridge between the C++ code in MetaCall and the Java Virtual Machine. It creates and maintains a JVM instance, handles Java method calls, field access, and object creation.

### Bootstrap Class

The bootstrap class is a Java utility class that provides functionality for:

1.  Class loading and discovery
2.  Java file compilation
3.  Classpath management
4.  Reflection utilities for method and field inspection
5.  Type signature generation

### Type Conversion System

One of the key responsibilities of the Java Loader is converting between Java types and MetaCall value types. The loader implements bidirectional conversion for:

Java Type

MetaCall Type

boolean

BOOL

char

CHAR

short

SHORT

int

INT

long

LONG

float

FLOAT

double

DOUBLE

String

STRING

array

ARRAY

Object

OBJECT

Class

CLASS

## Loader Lifecycle

### Initialization

The Java Loader initializes by creating a Java Virtual Machine instance and setting up the JNI environment. It also loads the bootstrap class which helps with class and method resolution.

### Loading Java Code

The Java Loader can load Java code from:

1.  **Files**: Java source files (.java) that get compiled at runtime
2.  **Memory**: Java code supplied as a string, compiled at runtime
3.  **Packages**: Pre-compiled JAR files or .class files

## Class and Method Discovery

After loading Java code, the loader discovers classes, methods, and fields using Java reflection. This information is registered with MetaCall's reflection system to make Java functions callable from other languages.

## Function Calling

When a Java method is called through MetaCall, the following process occurs:

1.  Arguments are converted from MetaCall values to JNI values
2.  The method is located using JNI function lookups
3.  The method is invoked via JNI
4.  The return value is converted back to a MetaCall value

## Object Creation and Handling

The Java Loader supports creating Java objects (class instances) and manipulating them:

1.  Constructing objects with arguments
2.  Getting and setting field values
3.  Calling instance methods
4.  Managing object lifecycle

## Array Handling

The Java Loader has special handling for Java arrays, supporting both getting and setting array elements, as well as passing arrays as method arguments and returning arrays from methods.

Java Array Type

Handling Method

boolean\[\]

jbooleanArray with GetBooleanArrayElements/SetBooleanArrayRegion

char\[\]

jcharArray with GetCharArrayElements/SetCharArrayRegion

short\[\]

jshortArray with GetShortArrayElements/SetShortArrayRegion

int\[\]

jintArray with GetIntArrayElements/SetIntArrayRegion

long\[\]

jlongArray with GetLongArrayElements/SetLongArrayRegion

float\[\]

jfloatArray with GetFloatArrayElements/SetFloatArrayRegion

double\[\]

jdoubleArray with GetDoubleArrayElements/SetDoubleArrayRegion

String\[\]

jobjectArray with GetObjectArrayElement/SetObjectArrayElement

## Type Signature Management

The Java Loader needs to handle JNI type signatures for method calls and field access. It includes utilities for:

1.  Creating JNI signatures for methods and constructors
2.  Converting between Java type names and JNI type signatures
3.  Handling array type signatures
4.  Supporting primitive and object type signatures

## Example Usage

The tests in the codebase demonstrate how to use the Java Loader:

1.  **Loading Java code**:

2.  **Creating a Java object**:

3.  **Getting and setting static fields**:

4.  **Calling static methods**:

5.  **Working with instance methods and fields**:

## Limitations and Considerations

1.  **Exception Handling**: Java exceptions are currently not fully propagated back to MetaCall.
2.  **Asynchronous Methods**: Await functionality is not supported in the Java Loader (`java_object_interface_method_await` is empty).
3.  **Advanced Java Features**: Some Java features like generics have limited support.
4.  **Performance**: Dynamic compilation and reflection have performance implications.
5.  **Memory Management**: Care must be taken to properly manage memory when working with Java objects.

## Integration with MetaCall Core

The Java Loader integrates with MetaCall Core through the loader interface, which includes functions for:

- Initialization and destruction
- Loading code from various sources
- Discovering functions and types
- Creating and manipulating objects
- Type conversion

## References

- For more information about the general loader system, see [Loader System](./loader-system.md)
- For information about other language loaders, see:
  - [Python Loader](./python-loader.md)
  - [Node.js Loader](./node-js-loader.md)
  - [Ruby Loader](./ruby-loader.md)
  - [Rust Loader](./rust-loader.md)
