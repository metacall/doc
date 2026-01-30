---
title: Writing Tests
---

# Writing Tests

This document provides a comprehensive guide for writing and running tests for the MetaCall project. It covers the testing infrastructure, how to create new tests, and best practices for testing different language loaders and cross-language functionality.
For information about running existing tests, see [Running Tests](./running-tests.md). For details on using sanitizers to catch memory and threading issues, see [Sanitizers](./sanitizers.md).

## Testing Infrastructure

MetaCall uses Google Test (GTest) as its testing framework. Tests are organized by component and functionality, with each test residing in its own subdirectory under `source/tests/`.

### GTest Configuration

MetaCall configures Google Test in the main test CMakeLists.txt file. If GTest is not found on the system, it is automatically downloaded and built:

### Memory Check and Sanitizer Options

MetaCall supports running tests with memory checkers and sanitizers to detect various issues:

## Creating a New Test

To create a new test for MetaCall, follow these steps:

### 1\. Create Directory Structure

Create a new directory under `source/tests/` with the following structure:

```
source/tests/my_new_test/
├── CMakeLists.txt        # Test build configuration
└── source/               # Test source files
    └── my_new_test.cpp   # Test implementation
```

### 2\. Configure CMakeLists.txt

Create a CMakeLists.txt file for your test:

### 3\. Implement the Test

Create a C++ file implementing your test using Google Test:

### 4\. Add to Main CMakeLists.txt

Add your test to the main test configuration in `source/tests/CMakeLists.txt`:

## Writing Tests for Language Loaders

MetaCall supports multiple language loaders, each requiring specific testing approaches.

### Python Loader Tests

Testing the Python loader involves loading Python code and calling Python functions:

### Node.js Loader Tests

Node.js tests often need to handle asynchronous code and promises:

### Cross-Language Integration Tests

MetaCall's primary feature is cross-language communication. Here's how to test it:

## Test Best Practices

When writing tests for MetaCall, follow these best practices:

1.  **Resource Management**: Always initialize MetaCall at the beginning of tests and destroy it at the end to prevent memory leaks.
2.  **Memory Cleanup**: Explicitly destroy all MetaCall values created during tests.
3.  **Cross-Platform Compatibility**: Ensure tests work on all supported platforms (Windows, macOS, Linux).
4.  **Test Isolation**: Each test should be independent and not depend on state from previous tests.
5.  **Error Handling**: Test both successful cases and error conditions.
6.  **Asynchronous Testing**: When testing asynchronous functions, use proper callback mechanisms to ensure test completion.
7.  **CI Integration**: Be aware that tests run on CI with different sanitizers. Avoid assumptions about timing or system-specific behavior.

## Testing with Different Sanitizers

MetaCall supports running tests with different sanitizers to catch memory and threading issues.

### Address Sanitizer

Address Sanitizer detects memory errors like use-after-free, buffer overflows, and memory leaks:

### Thread Sanitizer

Thread Sanitizer detects data races and threading issues:

### Memory Sanitizer

Memory Sanitizer detects uses of uninitialized memory (Clang only):

## CI/CD Integration

MetaCall automatically runs tests on multiple platforms through GitHub Actions workflows:

### Platform-Specific Test Workflows

Each platform has its own workflow configuration:

1.  **Linux Workflow**: Runs tests in different Docker containers with various sanitizers
2.  **macOS Workflow**: Runs tests on multiple macOS versions
3.  **Windows Workflow**: Runs tests with MSVC compiler

## Troubleshooting Test Failures

When a test fails, consider these troubleshooting steps:

1.  **Run With Verbose Output**: Use `ctest --output-on-failure` to see detailed error messages.
2.  **Run Single Test**: Run just the failing test with `ctest -R test_name`.
3.  **Run With Sanitizers**: Use appropriate sanitizers to identify memory or threading issues.
4.  **Check Log Output**: Examine test logs for error messages or warnings.
5.  **Debug Build**: Rebuild in debug mode (`cmake -DCMAKE_BUILD_TYPE=Debug ..`) for better error information.
6.  **Platform Differences**: Test failures may be platform-specific - check if the test fails on all platforms or just one.

Sources: [tools/metacall-build.sh76-78](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.sh#L76-L78) [tools/metacall-build.ps175-85](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.ps1#L75-L85)
