---
title: Sanitizers
---

# Sanitizers

Sanitizers are powerful diagnostic tools integrated into the MetaCall build system to detect runtime errors that might otherwise be difficult to find. This page documents the sanitizer options available in MetaCall, how they are configured, and how they are used in the continuous integration (CI) pipeline for quality assurance.
## Overview of Sanitizers

Sanitizers are compiler-based dynamic analysis tools that can detect various types of bugs during program execution. MetaCall supports three main types of sanitizers:

1.  **Address Sanitizer (ASan)** - Detects memory errors such as buffer overflows, use-after-free, double-free, and memory leaks
2.  **Thread Sanitizer (TSan)** - Detects data races and other threading issues
3.  **Memory Sanitizer (MSan)** - Detects uses of uninitialized memory

Each sanitizer is designed to catch different categories of bugs, and they can significantly improve the reliability of the MetaCall codebase by identifying issues that might otherwise go undetected.

## Sanitizer Integration in Build System

The sanitizers are integrated into MetaCall's CMake build system as build options. These options can be enabled during configuration.

The sanitizer options are defined in the main CMakeLists.txt file and can be passed to the configuration scripts.

## Enabling Sanitizers

Sanitizers can be enabled using the `metacall-configure.sh` script with appropriate flags. Only one sanitizer should be enabled at a time since they may conflict with each other.

### Command Line Options

To enable a sanitizer, use one of the following options when configuring the build:

Alternatively, you can use the dedicated script `metacall-sanitizer.sh` which streamlines the process of building and testing with sanitizers:

## Sanitizers and Memcheck

It's important to note that sanitizers and memcheck (Valgrind) are not compatible with each other. If you attempt to use both, the build system will disable memcheck tests and issue a warning.

## Platform Support for Sanitizers

Sanitizer support varies by platform:
| Sanitizer | Linux | macOS | Windows |
| --- | --- | --- | --- |
| Address Sanitizer | ✓ | ✓ | ✓ |
| Thread Sanitizer | ✓ | ✓ | ❌ |
| Memory Sanitizer | ✓ | ❌ | ❌ |
Windows support for Thread Sanitizer and Memory Sanitizer is currently limited or non-existent because these sanitizers are not fully supported by the MSVC compiler.

## Sanitizers in CI Workflows

MetaCall uses sanitizers in continuous integration (CI) workflows to detect issues automatically. The CI system runs tests with different sanitizers enabled on various platforms.

The GitHub Actions workflows are configured to run tests with different sanitizers on different platforms. If a sanitizer detects an issue, the corresponding CI job will fail, alerting developers to the problem.

## Reading Sanitizer Output

When a sanitizer detects an issue, it produces an error report that helps identify the problem. Here's how to interpret the sanitizer output:

1.  **Error Type**: The sanitizer will indicate what type of error it found (e.g., heap-use-after-free, stack-buffer-overflow)
2.  **Location**: The report includes the source file, function, and line number where the error occurred
3.  **Stack Trace**: A stack trace showing the call path that led to the error
4.  **Memory Addresses**: For memory-related errors, information about the relevant memory addresses

When investigating a sanitizer error, start by looking at the error type and the location information, then examine the code at that location and the associated stack trace.

## Best Practices for Using Sanitizers

To get the most out of sanitizers in MetaCall development:

1.  **Run with debug builds**: Sanitizers work best with debug builds that include detailed symbol information
2.  **Use one sanitizer at a time**: Each sanitizer has its own focus and may conflict with others
3.  **Incorporate sanitizers into your development workflow**: Run tests with sanitizers locally before pushing changes
4.  **Address all sanitizer warnings**: Even seemingly minor issues can indicate deeper problems
5.  **Document known false positives**: Some sanitizer warnings may be false positives due to third-party code or intentional design decisions

## Environment Variables for Sanitizers

When running with sanitizers enabled, several environment variables can control their behavior:
| Environment Variable | Description |
| --- | --- |
| `ASAN_OPTIONS` | Controls Address Sanitizer behavior |
| `TSAN_OPTIONS` | Controls Thread Sanitizer behavior |
| `MSAN_OPTIONS` | Controls Memory Sanitizer behavior |
| `SANITIZER_SKIP_SUMMARY` | When set to 1, suppresses sanitizer summary output (used in CI) |
For example, to enable leak detection in Address Sanitizer:

## Conclusion

Sanitizers are valuable tools in the MetaCall development process, helping to catch memory and threading bugs that might otherwise be difficult to detect. By enabling sanitizers during development and testing, contributors can help maintain the stability and reliability of the MetaCall codebase.

For more information about testing in MetaCall, see the [Testing Framework](./testing-framework.md) page and [Running Tests](./running-tests.md) for specific instructions on executing the test suite.
