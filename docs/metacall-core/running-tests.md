---
title: Running Tests
---

# Running Tests

This page provides comprehensive guidance on executing tests within the MetaCall Core project. It covers running tests locally across different platforms, using sanitizers, and navigating test output. For information about writing new tests, see [Writing Tests](./writing-tests.md).
## Test Architecture

MetaCall Core includes a comprehensive testing framework to ensure reliability of cross-language function calls. The testing system is built on Google Test (GTest) and is integrated with CMake's CTest infrastructure.

## Prerequisites

Before running tests, ensure you have:

1.  Built MetaCall with the tests enabled
2.  Set up the required dependencies for the loaders you want to test
3.  Configured the necessary environment variables

### Dependencies

The test suite requires Google Test (GTest) which is automatically installed when building tests if not found on your system.

## Building with Tests Enabled

Tests are enabled via the `OPTION_BUILD_TESTS` CMake option, which is ON by default. You can disable tests by setting this option to OFF.

### Using Build Scripts

The easiest way to build MetaCall with tests is using the provided build scripts:

On Linux/macOS:

On Windows:

### Manual CMake Configuration

Alternatively, you can manually configure CMake:

## Running Tests

### Running All Tests

After building, you can run all tests using CTest:

On Windows:

Alternatively, use the build script which automatically runs the tests:

### Running Specific Tests

To run specific tests, you can use the `--tests-regex` option with CTest:

Common test categories include:
| Test Category | Description | Example |
| --- | --- | --- |
| Core tests | Tests for core functionality | `ctest -R metacall_test` |
| Loader tests | Tests for specific language loaders | `ctest -R metacall_python_test` |
| Port tests | Tests for language ports | `ctest -R metacall_node_port_test` |
| Integration tests | Tests for cross-language functionality | `ctest -R metacall_integration_test` |

### Test Environment Variables

Tests require specific environment variables to locate loader plugins, scripts, configuration files, etc. These are automatically set by the build system, but if you're running tests manually, you'll need to set them:
| Environment Variable | Description | Default Value |
| --- | --- | --- |
| `LOADER_LIBRARY_PATH` | Directory where loader plugins are located | `build` |
| `LOADER_SCRIPT_PATH` | Directory where scripts to be loaded are located | `build/scripts` |
| `CONFIGURATION_PATH` | Global configuration file path | `build/configurations/global.json` |
| `SERIAL_LIBRARY_PATH` | Directory where serial plugins are located | `build` |
| `DETOUR_LIBRARY_PATH` | Directory where detour plugins are located | `build` |
| `PORT_LIBRARY_PATH` | Directory where port plugins are located | `build` |

## Advanced Testing

### Memory Checks with Valgrind

MetaCall supports running tests with memory checking using Valgrind. This helps detect memory leaks and other memory-related issues.

To enable memory checks:

Note: Memory checks are not compatible with sanitizers.

### Sanitizers

MetaCall supports various sanitizers to detect runtime issues:

1.  **Address Sanitizer (ASan)** - Detects memory errors like buffer overflows and use-after-free
2.  **Thread Sanitizer (TSan)** - Detects data races and threading issues
3.  **Memory Sanitizer (MSan)** - Detects uninitialized memory reads

To build and run tests with sanitizers:

### CI/CD Test Workflows

MetaCall uses GitHub Actions to run tests on different platforms (Linux, macOS, Windows) and configurations. These workflows are defined in `.github/workflows/`.

## Docker-Based Testing

MetaCall provides Docker-based testing to ensure a consistent testing environment regardless of the host system.

The Docker-based testing uses the following services:

1.  `deps` - Installs all dependencies
2.  `dev` - Builds the project and runs tests
3.  `runtime` - Creates a runtime image for deployment testing

## Interpreting Test Results

Test output includes pass/fail status for each test. If a test fails, detailed error information is displayed:

```
[  RUN     ] TestSuite.TestName
[    INFO ] Additional information...
[  FAILED  ] TestSuite.TestName (X ms)
```

For memory checks and sanitizers, additional error information is provided, such as memory leak details or race condition information.

### Common Test Failures

| Error Type         | Description                                    | Possible Cause                            |
| ------------------ | ---------------------------------------------- | ----------------------------------------- |
| Segmentation fault | The program accessed an invalid memory address | Null pointer dereference, buffer overflow |
| Memory leak        | Memory was allocated but not freed             | Forgot to clean up resources              |
| Timeout            | The test took too long to complete             | Infinite loop, deadlock                   |
| Assertion failed   | A test assertion did not pass                  | Incorrect behavior, regression            |
| Race condition     | Concurrent access to shared data               | Missing synchronization                   |

### Platform-Specific Considerations

#### Linux

- Most comprehensive test coverage
- Supports all sanitizers (ASan, TSan, MSan)
- Supports memory check with Valgrind

#### macOS

- Some tests might be disabled due to platform limitations
- Supports ASan and TSan sanitizers
- Fork safety might be disabled for some tests

#### Windows

- More limited sanitizer support (only ASan)
- Different path handling might cause issues in some tests
- Uses MSVC compiler which might have different behavior

## Troubleshooting

If you encounter issues running tests, try the following:

1.  Ensure all dependencies are properly installed with `metacall-environment.sh`
2.  Check that environment variables are correctly set
3.  Rebuild the project with clean build directory
4.  For loader-specific tests, verify that the language runtime is properly installed
5.  For platform-specific issues, check the CI/CD workflows for the correct configuration

## Testing Checklist

Before submitting changes:

1.  ✅ Run unit tests locally
2.  ✅ Run tests with address sanitizer
3.  ✅ For threading-related changes, run thread sanitizer
4.  ✅ For platform-specific code, test on relevant platforms
5.  ✅ For performance-critical code, run benchmarks

Sources: [tools/metacall-build.sh71-79](https://github.com/metacall/core/blob/af9cad19/tools/metacall-build.sh#L71-L79) [tools/metacall-sanitizer.sh1-57](https://github.com/metacall/core/blob/af9cad19/tools/metacall-sanitizer.sh#L1-L57)
