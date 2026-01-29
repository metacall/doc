---
title: Testing Framework
---

# Testing Framework

## Relevant source files

- [.env](https://github.com/metacall/core/blob/af9cad19/.env)
- [.github/workflows/benchmark.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/benchmark.yml)
- [.github/workflows/clang-format.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/clang-format.yml)
- [.github/workflows/docker-hub.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/docker-hub.yml)
- [.github/workflows/linux-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/linux-test.yml)
- [.github/workflows/macos-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/macos-test.yml)
- [.github/workflows/release.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/release.yml)
- [.github/workflows/windows-test.yml](https://github.com/metacall/core/blob/af9cad19/.github/workflows/windows-test.yml)
- [CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/CMakeLists.txt)
- [README.md](https://github.com/metacall/core/blob/af9cad19/README.md)
- [deploy/images/overview.png](https://github.com/metacall/core/blob/af9cad19/deploy/images/overview.png)
- [docker-compose.platform.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.platform.yml)
- [docker-compose.yml](https://github.com/metacall/core/blob/af9cad19/docker-compose.yml)
- [docs/README.md](https://github.com/metacall/core/blob/af9cad19/docs/README.md)
- [source/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/CMakeLists.txt)
- [source/loaders/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/loaders/CMakeLists.txt)
- [source/scripts/python/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/scripts/python/CMakeLists.txt)
- [source/tests/CMakeLists.txt](https://github.com/metacall/core/blob/af9cad19/source/tests/CMakeLists.txt)
- [tools/metacall-benchmarks-merge.py](https://github.com/metacall/core/blob/af9cad19/tools/metacall-benchmarks-merge.py)
- [tools/metacall-build.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.ps1)
- [tools/metacall-build.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.sh)
- [tools/metacall-configure.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.ps1)
- [tools/metacall-configure.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-configure.sh)
- [tools/metacall-environment.ps1](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.ps1)
- [tools/metacall-environment.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-environment.sh)
- [tools/metacall-runtime.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-runtime.sh)
- [tools/metacall-sanitizer.sh](https://github.com/metacall/core/blob/af9cad19/tools/metacall-sanitizer.sh)

The MetaCall testing framework provides a comprehensive suite of tools and methodologies for ensuring code quality, correctness, and reliability across the codebase. This page describes the architecture, components, and usage of the testing infrastructure within the MetaCall project. For information about benchmarking, see page 8.3 on Sanitizers.

## 1\. Testing Architecture Overview

The MetaCall testing system uses Google Test (GTest) as its primary unit testing framework and CTest for test execution and management. The testing infrastructure is tightly integrated with the build system and continuous integration pipelines to ensure code quality across multiple platforms and configurations.

## 2\. Testing Components

### 2.1 Google Test Integration

MetaCall uses Google Test (GTest) version 1.11.0 as its primary testing framework. If GTest is not found on the system, it will be automatically installed through CMake.

The test infrastructure creates an interface library for GTest that all test targets can link against:

```
add_library(GTest INTERFACE)
target_include_directories(GTest SYSTEM INTERFACE ${GTEST_INCLUDE_DIRS})
target_link_libraries(GTest INTERFACE ${GTEST_LIBRARIES})
```

### 2.2 Memory Check Configuration

The testing framework supports running tests with memory checkers like Valgrind. This is controlled by the `OPTION_TEST_MEMORYCHECK` option. Memory checks are disabled when using sanitizers as they are not compatible.

### 2.3 Test Environment Variables

Tests require specific environment variables to locate loaders, configurations, and other components:
| Environment Variable | Purpose |
| --- | --- |
| `LOADER_LIBRARY_PATH` | Directory where loader plugins are located |
| `LOADER_SCRIPT_PATH` | Directory where scripts to be loaded are located |
| `CONFIGURATION_PATH` | Path to the MetaCall global configuration |
| `SERIAL_LIBRARY_PATH` | Directory where serial plugins are located |
| `DETOUR_LIBRARY_PATH` | Directory where detour plugins are located |
| `PORT_LIBRARY_PATH` | Directory where port plugins are located |

## 3\. Test Categories

The MetaCall test suite is organized into several categories, each targeting different aspects of the system:

### 3.1 Core Component Tests

These tests verify the functionality of the core libraries and subsystems:

- **Preprocessor and environment tests**: Test MetaCall's preprocessor directives and environment handling
- **Abstract Data Type (ADT) tests**: Verify data structures like sets, tries, vectors, and maps
- **Reflection system tests**: Test the type system, value casting, functions, objects, and scopes
- **Dynamic linking tests**: Verify the dynamic library loading functionality
- **Detour tests**: Test function interception capabilities
- **Serialization tests**: Verify data serialization/deserialization

### 3.2 MetaCall API Tests

Tests focusing on the MetaCall API functionality:

- **Loading/unloading**: Test loading code from files and memory
- **Function calls**: Verify cross-language function calls
- **Configuration**: Test configuration loading and validation
- **Error handling**: Verify proper error detection and reporting
- **Memory management**: Test allocation and deallocation of resources

### 3.3 Language-Specific Tests

Tests targeting specific language loaders and their integrations:

- **Python tests**: Test Python loader functionality, object models, garbage collection
- **Node.js tests**: Test Node.js event loop, async functions, callbacks
- **Ruby tests**: Test Ruby object models and integration
- **C# tests**: Test .NET Core integration
- **TypeScript tests**: Test TypeScript compilation and execution
- **Other languages**: Tests for C, Rust, WebAssembly, Java, etc.

### 3.4 Cross-Platform Tests

MetaCall is tested across multiple platforms to ensure compatibility:

- **Linux**: Tests on various distributions (Debian, Ubuntu, Alpine)
- **macOS**: Tests on multiple macOS versions
- **Windows**: Tests on Windows using MSVC

Each platform has dedicated GitHub workflows that run the tests in appropriate environments.

## 4\. Test Execution

### 4.1 Running Tests Locally

To build and run the tests locally, you can use the provided build scripts:

1.  Set up the environment with required dependencies:
2.  Configure the build with tests enabled:
3.  Build and run the tests:

### 4.2 Test Execution Flow

## 5\. Sanitizers

MetaCall includes support for various sanitizers to detect memory and threading issues:

### 5.1 Available Sanitizers

- **Address Sanitizer**: Detects memory errors such as buffer overflows, use-after-free, etc.
- **Thread Sanitizer**: Detects data races and other threading issues
- **Memory Sanitizer**: Detects uninitialized memory reads

These sanitizers are enabled during configuration and are used extensively in CI/CD pipelines.

### 5.2 Running Tests with Sanitizers

To run tests with sanitizers, use the provided sanitizer script:

Alternatively, configure and build with sanitizer options:

## 6\. CI/CD Integration

MetaCall's testing framework is tightly integrated with the CI/CD pipeline through GitHub Actions.

### 6.1 Test Matrix

Tests are run in a matrix configuration across:

- **Operating Systems**: Linux, macOS, Windows
- **Build Types**: Debug, Release
- **Sanitizers**: Address, Thread, Memory (on supported platforms)
- **Base Images**: Various Linux distributions for Docker-based tests

### 6.2 Docker-based Testing

For Linux environments, tests run in Docker containers to ensure consistent execution environments:

1.  Build the Docker images with dependencies
2.  Run the tests inside the containers
3.  Generate reports for success/failure

### 6.3 Test Result Handling

Test results trigger several workflows:

- **Failed tests** cause the workflow to fail
- **Successful tests** on `master` branch may trigger distributable builds
- **Benchmarks** collect performance metrics for analysis

## 7\. Writing New Tests

### 7.1 Test Structure

New tests should follow the established pattern:

1.  Create a new directory under `source/tests/` for your test
2.  Create a CMakeLists.txt file in your test directory
3.  Define a test executable and link it with GTest
4.  Set up test environment variables
5.  Add the test to `source/tests/CMakeLists.txt`

### 7.2 Test Naming Convention

Test executable names should follow the pattern:

- **Unit tests**: `component_test` (e.g., `log_test`)
- **Integration tests**: `metacall_component_test` (e.g., `metacall_python_test`)
- **Specialized tests**: `metacall_component_subcomponent_test` (e.g., `metacall_python_object_class_test`)

### 7.3 Common Test Environment

Tests share common environment variables for locating MetaCall components:

## 8\. Conclusion

The MetaCall testing framework is a comprehensive system for ensuring code quality and reliability across multiple languages, platforms, and configurations. It integrates unit tests, integration tests, and various sanitizers into a cohesive testing infrastructure that is executed through both local development and CI/CD pipelines.

By leveraging Google Test, CTest, and Docker, MetaCall achieves a robust testing environment that can detect issues across the wide range of languages and platforms it supports.
