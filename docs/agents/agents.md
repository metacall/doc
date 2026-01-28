# MetaCall Core - Comprehensive Documentation Summary

## Executive Summary

MetaCall Core is a **polyglot runtime** that enables **cross-language function calls** across multiple programming languages. It allows developers to seamlessly call functions written in Python from JavaScript, Ruby from Python, C# from Ruby, etc. - breaking down language barriers in software development.

**Core Capability**: Load code from multiple languages at runtime and call functions across language boundaries with automatic type conversion.

**Current Date Context**: Wednesday, January 28, 2026

---

## 1. PROJECT OVERVIEW & PURPOSE

### What is MetaCall Core?

MetaCall Core is the fundamental runtime library that provides:

- **Foreign Function Interface (FFI)** across multiple languages
- **Dynamic code loading** from files, memory, or packages
- **Type conversion system** for cross-language data exchange
- **Reflection API** for introspecting loaded functions
- Support for both **synchronous** and **asynchronous** function calls

### Key Architectural Components

1. **Loaders (Backends)** - Enable executing code in specific languages
2. **Ports (Frontends)** - Allow using MetaCall from specific languages
3. **Value System** - Common data representation across languages
4. **Reflection System** - Metadata about functions/types
5. **FFI Dispatch** - Executes cross-language calls

### What MetaCall Core Is NOT

This documentation covers **ONLY MetaCall Core**. It does NOT document:

- MetaCall FaaS (Function-as-a-Service platform)
- MetaCall Deploy (deployment infrastructure)
- MetaCall Protocol (RPC protocols)
- MetaCall Hub (package registry)
- Cloud integrations
- Application frameworks built on Core

---

## 2. SUPPORTED LANGUAGES

### Language Support Matrix

| Language    | Loader Tag  | Load File | Load Memory | Async   | Object/Class | Status           |
| ----------- | ----------- | --------- | ----------- | ------- | ------------ | ---------------- |
| Python      | `py`        | ✓         | ✓           | ✓       | ✓            | **Stable**       |
| Node.js     | `node`/`js` | ✓         | ✓           | ✓       | ✓            | **Stable**       |
| TypeScript  | `ts`        | ✓         | ✓           | ✓       | ✓            | **Stable**       |
| Ruby        | `rb`        | ✓         | ✓           | Limited | ✓            | **Stable**       |
| C#          | `cs`        | ✓         | ✓           | ✓       | ✓            | **Stable**       |
| C           | `c`         | ✓         | ✓           | ✗       | Limited      | **Stable**       |
| Java        | `java`      | ✓         | ✗           | Limited | ✓            | **Partial**      |
| Rust        | `rs`        | ✓         | ✓           | ✗       | Limited      | **Experimental** |
| WebAssembly | `wasm`      | ✓         | ✗           | ✗       | ✗            | **Experimental** |
| COBOL       | `cob`       | ✓         | ✗           | ✗       | ✗            | **Experimental** |

**File Extension Mapping**:

- `.py` → Python
- `.js`, `.node` → Node.js
- `.ts`, `.jsx`, `.tsx` → TypeScript
- `.rb` → Ruby
- `.cs`, `.dll`, `.vb` → C#
- `.c`, `.h` → C
- `.rs` → Rust
- `.java`, `.jar` → Java
- `.wasm`, `.wat` → WebAssembly
- `.cob`, `.cbl`, `.cpy` → COBOL

---

## 3. CORE API REFERENCE

### 3.1 Initialization & Shutdown

```c
// Basic initialization
int metacall_initialize();

// Extended initialization with configuration
int metacall_initialize_ex(void *options_value);

// Check if initialized
int metacall_is_initialized();

// Shutdown and cleanup
int metacall_destroy();
```

**Returns**: `0` on success, non-zero on failure

### 3.2 Loading Code

```c
// Load from files
int metacall_load_from_file(const char *tag, const char *paths[],
                            size_t size, void **handle);

// Load from memory buffer
int metacall_load_from_memory(const char *tag, const char *buffer,
                              size_t size, void **handle);

// Load from package
int metacall_load_from_package(const char *tag, const char *path,
                               void **handle);

// Set execution/search paths
int metacall_execution_path(const char *tag, const char *path);
```

**Tag Examples**: `"py"`, `"node"`, `"rb"`, `"cs"`, `"c"`, `"java"`

**Handle Parameter**:

- `NULL` → Load into global scope
- Pointer to `NULL` → Create new isolated handle
- Existing handle → Add to that handle

### 3.3 Calling Functions

```c
// Call by name with variable arguments
void *metacall(const char *name, ...);

// Call by name with value array
void *metacallv(const char *name, void *args[]);

// Call by handle + name (avoid name collisions)
void *metacallhv(void *handle, const char *name, void *args[]);

// Call by function reference
void *metacallfv(void *func, void *args[]);

// Call with serialized arguments (JSON)
void *metacallfs(void *func, const char *buffer, size_t size);
```

**Returns**: MetaCall value (or `NULL` on error) - **must be destroyed by caller**

### 3.4 Value System

#### Value Type IDs

```c
enum metacall_value_id {
    METACALL_NULL = 0,
    METACALL_BOOL,
    METACALL_CHAR,
    METACALL_SHORT,
    METACALL_INT,
    METACALL_LONG,
    METACALL_FLOAT,
    METACALL_DOUBLE,
    METACALL_STRING,
    METACALL_BUFFER,
    METACALL_ARRAY,
    METACALL_MAP,
    METACALL_PTR,
    METACALL_FUTURE,
    METACALL_FUNCTION,
    METACALL_CLASS,
    METACALL_OBJECT,
    METACALL_EXCEPTION,
    METACALL_THROWABLE
};
```

#### Creating Values

```c
void *metacall_value_create_int(int i);
void *metacall_value_create_double(double d);
void *metacall_value_create_string(const char *str, size_t length);
void *metacall_value_create_array(const void *values[], size_t size);
void *metacall_value_create_map(const void *tuples[], size_t size);
// ... and more for each type
```

#### Extracting Values

```c
int metacall_value_to_int(void *v);
double metacall_value_to_double(void *v);
char *metacall_value_to_string(void *v);
void **metacall_value_to_array(void *v);
// ... and more for each type
```

#### Value Operations

```c
// Get type ID
enum metacall_value_id metacall_value_id(void *v);

// Destroy value (CRITICAL - prevents memory leaks)
void metacall_value_destroy(void *v);

// Copy value
void *metacall_value_copy(void *v);

// Cast between types
void *metacall_value_cast(void *v, enum metacall_value_id type);
```

### 3.5 Serialization

```c
// Serialize value to JSON
char *metacall_serialize(const char *name, void *v, size_t *size,
                         void *allocator);

// Deserialize JSON to value
void *metacall_deserialize(const char *name, const char *buffer,
                           size_t size, void *allocator);

// Get default serializer name (returns "rapid_json")
const char *metacall_serial();
```

---

## 4. TYPICAL USAGE PATTERNS

### 4.1 Basic Cross-Language Call

**Example: Call Python from C**

```c
// Initialize MetaCall
metacall_initialize();

// Load Python script
const char *scripts[] = { "script.py" };
metacall_load_from_file("py", scripts, 1, NULL);

// Call Python function
void *ret = metacall("my_python_function", 42, "hello");

// Extract result
int result = metacall_value_to_int(ret);
printf("Result: %d\n", result);

// Cleanup
metacall_value_destroy(ret);
metacall_destroy();
```

**Python script (script.py)**:

```python
def my_python_function(num, text):
    return num + len(text)
```

### 4.2 Using Handles for Isolation

```c
void *handle = NULL;

// Load into isolated handle
metacall_load_from_file("py", scripts, 1, &handle);

// Call using handle (avoids name collisions)
void *args[] = { metacall_value_create_int(5) };
void *ret = metacallhv(handle, "function_name", args);

// Cleanup
metacall_value_destroy(args[0]);
metacall_value_destroy(ret);
```

### 4.3 Working with Arrays and Maps

```c
// Create array
void *values[] = {
    metacall_value_create_int(1),
    metacall_value_create_int(2),
    metacall_value_create_int(3)
};
void *array = metacall_value_create_array(values, 3);

// Create map (array of [key, value] tuples)
void *tuple1[] = {
    metacall_value_create_string("name", 4),
    metacall_value_create_string("John", 4)
};
void *tuple2[] = {
    metacall_value_create_string("age", 3),
    metacall_value_create_int(30)
};
void *tuples[] = {
    metacall_value_create_array(tuple1, 2),
    metacall_value_create_array(tuple2, 2)
};
void *map = metacall_value_create_map(tuples, 2);

// Cleanup - destroy all values
metacall_value_destroy(array);
metacall_value_destroy(map);
// ... destroy individual elements
```

---

## 5. BUILD SYSTEM & CONFIGURATION

### 5.1 Prerequisites

**Base Requirements**:

- CMake (≥ 3.15)
- Git
- C11/C++11 compiler (GCC ≥ 4.9, Clang ≥ 3.4, or MSVC ≥ 2015)

**Language Runtime Requirements** (for respective loaders):

- Python (≥ 3.2, ≤ 3.9)
- Node.js (≥ 10.22, ≤ 17.x)
- Ruby (≥ 2.1, ≤ 2.7)
- .NET Core SDK (1.x, 2.x, 5.x, or 7.x)
- Java JDK (≥ 11)
- Rust (nightly-2021-12-04)

### 5.2 Build Configuration

**Environment Setup**:

```bash
./tools/metacall-environment.sh base python nodejs ruby
```

**Configuration Options**:

```bash
./tools/metacall-configure.sh release python nodejs tests
```

**Available Options**:

- Build types: `debug`, `release`, `relwithdebinfo`
- Loaders: `python`, `nodejs`, `ruby`, `typescript`, `netcore`, `java`, `c`, `rust`, `cobol`
- Components: `tests`, `examples`, `scripts`, `benchmarks`, `ports`, `install`
- Advanced: `sandbox`, `coverage`, `address-sanitizer`, `thread-sanitizer`, `memory-sanitizer`

**Build & Test**:

```bash
./tools/metacall-build.sh
ctest --output-on-failure
```

### 5.3 Docker Builds

MetaCall provides Docker configurations for reproducible builds:

```bash
# Build all images
./docker-compose.sh build

# Run tests
./docker-compose.sh test

# Push to registry
./docker-compose.sh push
```

**Docker Images**:

1. **deps** - Base with all build dependencies
2. **dev** - Full build with source code
3. **runtime** - Minimal production image
4. **cli** - Command-line interface image

---

## 6. COMMAND-LINE INTERFACE (CLI)

### 6.1 Basic Usage

```bash
# Launch REPL mode
metacall

# Execute scripts
metacall script.py script.js

# With options
metacall --sandboxing --disable_filesystem script.py
```

### 6.2 REPL Commands

| Command   | Syntax                    | Description           |
| --------- | ------------------------- | --------------------- |
| `load`    | `load <tag> <files...>`   | Load scripts          |
| `eval`    | `eval <tag> <code>`       | Evaluate code string  |
| `call`    | `call <function>(<args>)` | Call a function       |
| `inspect` | `inspect`                 | Show loaded functions |
| `clear`   | `clear <tag> <file>`      | Unload a script       |
| `help`    | `help`                    | Display help          |
| `exit`    | `exit`                    | Exit REPL             |

**REPL Example Session**:

```
$ metacall
λ load py hello.py
λ load node math.js
λ call hello.greet("World")
Hello, World!
λ eval py print("Python code")
Python code
λ inspect
hello.greet
math.add
math.multiply
λ exit
```

---

## 7. LOADER SYSTEM (Language Integration)

### 7.1 Loader Architecture

Each loader implements a standard interface:

```c
typedef struct loader_impl_interface_type {
    void *(*initialize)(loader_impl impl, configuration config);
    int (*execution_path)(loader_impl impl, const loader_path path);
    loader_handle (*load_from_file)(loader_impl impl, const loader_path paths[], size_t size);
    loader_handle (*load_from_memory)(loader_impl impl, const loader_name name, const char *buffer, size_t size);
    loader_handle (*load_from_package)(loader_impl impl, const loader_path path);
    int (*clear)(loader_impl impl, loader_handle handle);
    int (*discover)(loader_impl impl, loader_handle handle, context ctx);
    int (*destroy)(loader_impl impl);
} loader_impl_interface;
```

### 7.2 Loader-Specific Details

#### Python Loader (`py_loader`)

- Uses Python C API directly
- Supports Python 2 & 3
- Handles async/await via asyncio
- Thread-safe with GIL management
- Full object/class support

#### Node.js Loader (`node_loader`)

- Uses N-API for stability
- Runs in separate thread with event loop
- Bootstrap mechanism (bootstrap.js)
- Promise/async support
- Uses espree parser for function discovery

#### TypeScript Loader (`ts_loader`)

- Built on Node.js loader
- Transpiles TypeScript to JavaScript
- Uses TypeScript compiler API
- Preserves type information

#### Ruby Loader (`rb_loader`)

- Direct Ruby C API integration
- Object/class support
- Uses `rb_protect` for exception safety
- Limited async support

#### C Loader (`c_loader`)

- JIT compilation with TCC (Tiny C Compiler)
- Dynamic library loading
- Limited struct support

### 7.3 Type Conversion (Example: Python)

| Python Type    | MetaCall Type        |
| -------------- | -------------------- |
| `bool`         | `TYPE_BOOL`          |
| `int`          | `TYPE_INT/TYPE_LONG` |
| `float`        | `TYPE_DOUBLE`        |
| `str`          | `TYPE_STRING`        |
| `bytes`        | `TYPE_BUFFER`        |
| `list`/`tuple` | `TYPE_ARRAY`         |
| `dict`         | `TYPE_MAP`           |
| `function`     | `TYPE_FUNCTION`      |
| `None`         | `TYPE_NULL`          |
| `class`        | `TYPE_CLASS`         |
| `object`       | `TYPE_OBJECT`        |
| `coroutine`    | `TYPE_FUTURE`        |

---

## 8. PORT SYSTEM (Using MetaCall from Languages)

### 8.1 Node.js Port

**Installation**:

```bash
npm install metacall
```

**Usage**:

```javascript
const { metacall, metacall_load_from_file } = require("metacall");

// Load Python code
metacall_load_from_file("py", ["script.py"]);

// Call Python function
const result = metacall("python_function", arg1, arg2);
```

**Extended Require** (load non-JS languages):

```javascript
// Load Python module
const pythonModule = require("py:my_module");

// Or by extension
const pythonScript = require("./script.py");

// Call function
pythonModule.some_function();
```

### 8.2 Python Port

**Usage**:

```python
from metacall import metacall_load_from_file, metacall

# Load JavaScript code
metacall_load_from_file('node', ['script.js'])

# Call JavaScript function
result = metacall('js_function', arg1, arg2)
```

### 8.3 Other Ports

- **Ruby Port** - SWIG-generated bindings
- **Rust Port** - FFI bindings with proc macros
- **Go Port** - CGO-based bindings
- **Java Port** - JNI interface (in development)

---

## 9. VALUE SYSTEM DEEP DIVE

### 9.1 Value Memory Layout

```
+------------------+-----------+
| Data (n bytes)   | type_id   |
| (actual value)   | (4 bytes) |
+------------------+-----------+
```

### 9.2 Type Conversion Rules

**Automatic Conversions**:

- Numeric widening: `int` → `long` → `float` → `double`
- Numeric narrowing: With potential data loss
- String ↔ Number: When syntactically valid
- Array ↔ Specific language array types
- Map ↔ Object/Dictionary types

**Type Casting**:

```c
void *int_value = metacall_value_create_int(42);
void *double_value = metacall_value_cast(int_value, METACALL_DOUBLE);
```

### 9.3 Memory Management Rules

**CRITICAL RULES**:

1. **Always destroy values** created with `metacall_value_create_*`
2. **Always destroy return values** from `metacall()` and variants
3. **Do NOT destroy** values borrowed from arrays/maps
4. **Values passed to functions** are automatically copied/converted
5. **Caller owns return values** and must destroy them

---

## 10. SERIALIZATION

### 10.1 Default Format (RapidJSON)

**Type Mappings**:
| MetaCall Type | JSON Representation |
|---------------|---------------------|
| Boolean | `true`/`false` |
| Number types | JSON number |
| String | JSON string |
| Buffer | Object: `{"data": [...], "length": N}` |
| Array | JSON array |
| Map | JSON object |
| Function | String: `"[Function]"` |
| Class | String: `"[Class]"` |
| Object | String: `"[Object]"` |
| Exception | Object with message/stacktrace |
| Null | `null` |

**Serialization Example**:

```c
void *value = metacall_value_create_int(42);
size_t size;
char *json = metacall_serialize("rapid_json", value, &size, NULL);
// json = "42"

void *deserialized = metacall_deserialize("rapid_json", json, size, NULL);
```

---

## 11. ERROR HANDLING

### 11.1 Return Codes

Most functions return:

- `0` = Success
- Non-zero = Failure

**Check Pattern**:

```c
if (metacall_initialize() != 0) {
    fprintf(stderr, "Failed to initialize MetaCall\n");
    return 1;
}
```

### 11.2 NULL Returns

Value-returning functions return `NULL` on error:

```c
void *ret = metacall("function_name", args...);
if (ret == NULL) {
    fprintf(stderr, "Function call failed\n");
    return;
}
```

### 11.3 Exception Values

```c
// Check if value is an exception
if (metacall_value_id(ret) == METACALL_EXCEPTION) {
    exception ex = metacall_value_to_exception(ret);
    fprintf(stderr, "Exception: %s\n", exception_message(ex));
}
```

---

## 12. TESTING FRAMEWORK

### 12.1 Test Structure

**Framework**: Google Test (GTest)

**Test Organization**:

```
source/tests/
├── my_test/
│   ├── CMakeLists.txt
│   └── source/
│       └── my_test.cpp
```

**Basic Test Template**:

```cpp
#include <gtest/gtest.h>
#include <metacall/metacall.h>

class MyTest : public testing::Test {
protected:
    void SetUp() override {
        ASSERT_EQ(0, metacall_initialize());
    }

    void TearDown() override {
        ASSERT_EQ(0, metacall_destroy());
    }
};

TEST_F(MyTest, TestSomething) {
    // Test code here
    ASSERT_NE(nullptr, metacall("function_name"));
}
```

### 12.2 Running Tests

```bash
# All tests
ctest

# Verbose output
ctest --output-on-failure

# Specific test
ctest -R my_test

# With sanitizers
./tools/metacall-sanitizer.sh address
```

### 12.3 Sanitizers

**Available Sanitizers**:

- **Address Sanitizer** (ASan) - Memory errors
- **Thread Sanitizer** (TSan) - Data races
- **Memory Sanitizer** (MSan) - Uninitialized memory

**Enable in Build**:

```bash
./tools/metacall-configure.sh release address-sanitizer tests
./tools/metacall-build.sh
ctest
```

---

## 13. IMPORTANT ENVIRONMENT VARIABLES

| Variable              | Description              | Default                       |
| --------------------- | ------------------------ | ----------------------------- |
| `LOADER_LIBRARY_PATH` | Loader plugin directory  | Current directory             |
| `LOADER_SCRIPT_PATH`  | Script search directory  | Current directory             |
| `CONFIGURATION_PATH`  | Global config file       | `configurations/global.json`  |
| `SERIAL_LIBRARY_PATH` | Serial plugin directory  | Current directory             |
| `DETOUR_LIBRARY_PATH` | Detour plugin directory  | Current directory             |
| `PORT_LIBRARY_PATH`   | Port library directory   | Current directory             |
| `NODE_PATH`           | Node.js module directory | `/usr/local/lib/node_modules` |

**Runtime Configuration**:

```bash
export LOADER_LIBRARY_PATH=/path/to/loaders
export CONFIGURATION_PATH=/path/to/config.json
metacall script.py
```

---

## 14. KEY CONCEPTS FOR LLMs

### 14.1 Loader vs Port (Critical Distinction)

**Loaders (Backends)**:

- Enable MetaCall to **execute** code in language X
- Example: Python Loader allows MetaCall to run `.py` files
- Location: `source/loaders/`

**Ports (Frontends)**:

- Enable **developers using language X** to **use** MetaCall
- Example: Node.js Port allows Node apps to call Python
- Location: `source/ports/`

### 14.2 Handle Behavior

When loading code, handle parameter behavior:

- `handle = NULL` → Load into **global scope** (all functions accessible anywhere)
- `handle = &NULL` → Create **new isolated handle** (functions only via this handle)
- `handle = existing` → Add to **existing handle**

### 14.3 Value Ownership Rules

1. **Creator owns** - If you create a value, you destroy it
2. **Caller owns returns** - If function returns a value, caller must destroy
3. **Borrowed references** - Array/map elements are borrowed, don't destroy individually
4. **Automatic copies** - Function arguments are automatically copied

### 14.4 CLI vs API

**CLI** (`command-line-interface.md`):

- Tool built **on top of** Core API
- Commands don't map 1:1 to API functions
- Not the same as Core API

**API** (`core-api.md`):

- C functions for programmatic use
- Foundation that CLI is built upon

### 14.5 Thread Safety

**Python Loader**:

- Thread-safe with GIL management
- Can be called from multiple threads

**Node.js Loader**:

- Runs in separate thread
- Thread-safe function queue
- NOT fork-safe (Linux fork issues)

**Ruby Loader**:

- Uses `rb_protect` for safety
- Thread considerations for Ruby GIL

### 14.6 Async/Await Support

**Supported Languages**:

- Python (asyncio)
- Node.js (Promises/async-await)
- TypeScript (Promises/async-await)
- C# (Task)
- Ruby (limited)

**Not Supported**:

- C (no async model)
- Rust (currently)
- WebAssembly

---

## 15. COMMON PATTERNS & IDIOMS

### 15.1 Safe Function Call Pattern

```c
// Initialize
if (metacall_initialize() != 0) {
    return 1;
}

// Load code
const char *scripts[] = {"script.py"};
if (metacall_load_from_file("py", scripts, 1, NULL) != 0) {
    metacall_destroy();
    return 1;
}

// Call function
void *ret = metacall("function_name", arg1, arg2);
if (ret == NULL) {
    metacall_destroy();
    return 1;
}

// Check for exception
if (metacall_value_id(ret) == METACALL_EXCEPTION) {
    fprintf(stderr, "Exception occurred\n");
    metacall_value_destroy(ret);
    metacall_destroy();
    return 1;
}

// Extract result
int result = metacall_value_to_int(ret);

// Cleanup
metacall_value_destroy(ret);
metacall_destroy();
```

### 15.2 Multi-Language Integration

```c
// Load multiple languages
metacall_load_from_file("py", (const char*[]){"math_utils.py"}, 1, NULL);
metacall_load_from_file("node", (const char*[]){"helpers.js"}, 1, NULL);
metacall_load_from_file("rb", (const char*[]){"formatter.rb"}, 1, NULL);

// Call across languages
void *py_result = metacall("py_calculate", 10, 20);
void *js_result = metacall("js_process", py_result);
void *rb_result = metacall("rb_format", js_result);

// Cleanup
metacall_value_destroy(py_result);
metacall_value_destroy(js_result);
metacall_value_destroy(rb_result);
```

### 15.3 Working with Complex Data

```c
// Create complex structure
void *data = metacall_value_create_map(...);

// Pass to multiple languages
void *py_processed = metacall("python_processor", data);
void *js_transformed = metacall("javascript_transformer", py_processed);

// Each language can access the data structure
// MetaCall handles type conversion automatically
```

---

## 16. TROUBLESHOOTING GUIDE

### 16.1 Common Issues

**"Function not found"**:

- Loader not initialized → Check `metacall_load_from_file` return
- Code not loaded → Check file paths
- Function not discovered → Check function is exported/public

**"Type mismatch"**:

- Arguments wrong type → Check loader type requirements
- Implicit conversion failed → Use explicit `metacall_value_create_*`

**Memory leaks**:

- Not destroying values → Always call `metacall_value_destroy`
- Not calling `metacall_destroy` → Register with `atexit()` or ensure cleanup

**Loader initialization failed**:

- Missing dependencies → Install language runtime
- Wrong version → Check version requirements
- Path issues → Set `LOADER_LIBRARY_PATH`

### 16.2 Debug Tips

```bash
# Verbose mode
METACALL_LOG_LEVEL=debug metacall script.py

# Check loaded functions
metacall --eval "metacall_inspect()"

# Run with sanitizers
./tools/metacall-sanitizer.sh address
ctest -R my_test
```

---

## 17. BUILD SYSTEM DETAILS

### 17.1 CMake Options

| Option                  | Description      | Default |
| ----------------------- | ---------------- | ------- |
| `OPTION_BUILD_TESTS`    | Build test suite | ON      |
| `OPTION_BUILD_EXAMPLES` | Build examples   | ON      |
| `OPTION_BUILD_CLI`      | Build CLI tool   | ON      |
| `OPTION_BUILD_LOADERS`  | Build loaders    | ON      |
| `OPTION_BUILD_PORTS`    | Build ports      | OFF     |
| `OPTION_THREAD_SAFE`    | Thread safety    | OFF     |
| `OPTION_FORK_SAFE`      | Fork safety      | ON      |

**Loader-Specific Options**:

- `OPTION_BUILD_LOADERS_PY` - Python loader
- `OPTION_BUILD_LOADERS_NODE` - Node.js loader
- `OPTION_BUILD_LOADERS_RB` - Ruby loader
- `OPTION_BUILD_LOADERS_CS` - C# loader
- etc.

### 17.2 Configuration Flags

**Platform Detection**:

```cmake
if(UNIX AND NOT APPLE)
    # Linux-specific
elseif(APPLE)
    # macOS-specific
elseif(WIN32)
    # Windows-specific
endif()
```

**Loader Configuration Output**:

```json
{
  "loader_library_path": "/path/to/loaders",
  "loader_script_path": "/path/to/scripts",
  "configuration_path": "/path/to/config.json"
}
```

---

## 18. PRODUCTION DEPLOYMENT

### 18.1 Docker Deployment

**Minimal Runtime Image**:

```dockerfile
FROM metacall/core:runtime

COPY my_app.py /app/
WORKDIR /app

CMD ["metacall", "my_app.py"]
```

**CLI Image**:

```bash
docker run -it metacall/core:cli script.py
```

### 18.2 System Integration

**Systemd Service**:

```ini
[Unit]
Description=MetaCall Service

[Service]
Type=simple
Environment="LOADER_LIBRARY_PATH=/usr/local/lib"
ExecStart=/usr/local/bin/metacall /app/main.py

[Install]
WantedBy=multi-user.target
```

### 18.3 Performance Considerations

**Optimization Tips**:

1. **Minimize cross-language calls** - Each call has overhead
2. **Batch operations** - Call once with array vs. multiple calls
3. **Reuse handles** - Don't reload code unnecessarily
4. **Avoid serialization** - Direct values faster than JSON
5. **Profile hot paths** - Identify bottlenecks with benchmarks

---

## 19. ADVANCED FEATURES

### 19.1 Detours System

Function hooking and interception:

- Intercepts function calls
- Redirects to alternative implementations
- Uses FuncHook library
- **Fork safety support** with `METACALL_FLAGS_FORK_SAFE`

### 19.2 Reflection API

Introspect loaded code:

```c
// Get function handle
void *func = metacall_function("function_name");

// Get signature
signature sig = function_signature(func);

// Get parameter count
size_t param_count = signature_count(sig);

// Get parameter types
for (size_t i = 0; i < param_count; i++) {
    type param_type = signature_get_type(sig, i);
    const char *type_name = type_name(param_type);
}
```

### 19.3 Class/Object Instantiation

```c
// Get class
void *klass = metacall_class("ClassName");

// Create instance
void *args[] = { metacall_value_create_int(42) };
void *obj = metacall_class_new(klass, args, 1);

// Call method
void *result = metacall_class_call(obj, "method_name", args, 1);

// Cleanup
metacall_value_destroy(obj);
```

---

## 20. DOCUMENTATION STRUCTURE NOTES

### 20.1 File Organization

```
docs/agents/
├── AGENTS.md                    # Navigation guide (read first!)
├── overview.md                  # High-level introduction
├── architecture.md              # System architecture
├── core-api.md                  # Complete API reference
├── loaders.md                   # Loader system overview
├── [language]-loader.md         # Language-specific loaders
├── ports.md                     # Port system overview
├── [language]-port.md           # Language-specific ports
├── build-*.md                   # Build system docs
├── cli-*.md                     # CLI documentation
├── value-*.md                   # Value system docs
├── serialization-*.md           # Serialization docs
├── testing-*.md                 # Testing docs
└── ...
```

### 20.2 Stability Levels

**Stable** (Production-Ready):

- Core API
- Python Loader
- Node.js Loader
- Node.js Port
- Build System
- CLI

**Partial** (Functional but Incomplete):

- Ruby Loader
- Java Loader
- Python/Ruby Ports

**Experimental** (Subject to Change):

- Custom Loaders
- Go/Rust Ports
- COBOL Loader

### 20.3 Version Context

- Documentation snapshot from development cycle
- Some features may be in progress
- Check `AGENTS.md` for current stability status
- Build options/flags may change between versions

---

## 21. CRITICAL REMINDERS FOR LLMs

1. **NEVER assume undocumented features exist** - If not in docs, say it's not documented
2. **Always cite specific files** when answering questions
3. **Distinguish Core from ecosystem** - This is ONLY MetaCall Core documentation
4. **Check stability levels** before recommending features
5. **Memory management is critical** - Always emphasize proper value destruction
6. **Loaders ≠ Ports** - Clarify which is being asked about
7. **Handle parameters matter** - NULL vs. pointer semantics are important
8. **Type conversion is automatic** but has limitations
9. **Thread safety varies by loader** - Check specific loader documentation
10. **CLI ≠ API** - They are different interfaces to MetaCall

---

## 22. TERMINAL COMMANDS CHEAT SHEET

### Installation & Setup

```bash
# Quick install
bash <(curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh)

# Environment setup
./tools/metacall-environment.sh base python nodejs ruby

# Configure build
./tools/metacall-configure.sh release python nodejs tests

# Build
./tools/metacall-build.sh

# Run tests
ctest --output-on-failure
```

### Running MetaCall

```bash
# REPL mode
metacall

# Execute scripts
metacall script.py script.js

# With options
metacall --sandboxing script.py

# Docker
docker run -it metacall/core:cli script.py
```

### Development

```bash
# With sanitizers
./tools/metacall-sanitizer.sh address
ctest -R test_name

# Debug build
./tools/metacall-configure.sh debug python nodejs
./tools/metacall-build.sh

# Clean build
rm -rf build/
./tools/metacall-configure.sh release python nodejs
./tools/metacall-build.sh
```

### Docker Workflows

```bash
# Build images
./docker-compose.sh build

# Run tests in Docker
./docker-compose.sh test

# Run specific sanitizer
./docker-compose.sh test asan
./docker-compose.sh test tsan
```

---

## 23. EXAMPLE CODE SNIPPETS

### Example 1: Python ↔ JavaScript Integration

**Python (math_utils.py)**:

```python
def calculate_area(width, height):
    return width * height

def calculate_perimeter(width, height):
    return 2 * (width + height)
```

**JavaScript (formatter.js)**:

```javascript
function formatResult(value) {
  return `Result: ${value} square units`;
}
```

**C Application**:

```c
#include <metacall/metacall.h>
#include <stdio.h>

int main() {
    metacall_initialize();

    // Load both languages
    const char *py_scripts[] = {"math_utils.py"};
    const char *js_scripts[] = {"formatter.js"};
    metacall_load_from_file("py", py_scripts, 1, NULL);
    metacall_load_from_file("node", js_scripts, 1, NULL);

    // Calculate in Python
    void *area = metacall("calculate_area", 10.0, 5.0);

    // Format in JavaScript
    void *formatted = metacall("formatResult", area);

    // Print result
    printf("%s\n", metacall_value_to_string(formatted));

    // Cleanup
    metacall_value_destroy(area);
    metacall_value_destroy(formatted);
    metacall_destroy();

    return 0;
}
```

### Example 2: Node.js Port Usage

```javascript
const { metacall, metacall_load_from_file } = require("metacall");

// Load Python module
metacall_load_from_file("py", ["ml_model.py"]);

// Call Python function
const predictions = metacall("predict", inputData);

// Process in JavaScript
predictions.forEach((pred) => {
  console.log(`Prediction: ${pred.label} (${pred.confidence})`);
});

// Or use extended require
const mlModel = require("py:ml_model");
const results = mlModel.predict(inputData);
```

### Example 3: Async/Await Integration

**JavaScript (async_ops.js)**:

```javascript
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

module.exports = { fetchData };
```

**Python using Node.js async**:

```python
from metacall import metacall_load_from_file, metacall_await

metacall_load_from_file('node', ['async_ops.js'])

def on_resolve(data, context):
    print(f"Data received: {data}")

def on_reject(error, context):
    print(f"Error: {error}")

# Call async JavaScript function
metacall_await('fetchData', on_resolve, on_reject, None,
               'https://api.example.com/data')
```

---

## 24. GLOSSARY

**Key Terms**:

- **Loader** - Backend plugin that executes code in a specific language
- **Port** - Frontend library that exposes MetaCall to a specific language
- **Handle** - Reference to loaded code module
- **Value** - MetaCall's common data representation
- **Type ID** - Enum identifying value types
- **Reflection** - Runtime introspection of functions/types
- **FFI** - Foreign Function Interface (cross-language calls)
- **GIL** - Global Interpreter Lock (Python/Ruby threading)
- **N-API** - Node.js stable C API
- **JNI** - Java Native Interface
- **Detour** - Function hooking/interception
- **Serial** - Serialization format plugin
- **Context** - Execution environment for loaded code
- **Scope** - Symbol namespace within a context
- **Signature** - Function parameter/return type definition
- **REPL** - Read-Eval-Print Loop (interactive shell)

---

## CONCLUSION

MetaCall Core enables **true polyglot programming** by providing a unified runtime for executing and calling functions across multiple programming languages. The system is:

- **Modular** - Extensible loader/port architecture
- **Type-Safe** - Automatic value conversion with checks
- **Production-Ready** - Stable core with mature Python/Node.js loaders
- **Well-Tested** - Comprehensive test suite with sanitizers
- **Documented** - Extensive documentation for each component

**Primary Use Cases**:

1. Integrate legacy code in different languages
2. Use best language for each task in one app
3. Gradual migration between languages
4. Microservices-style function calls without network overhead
5. Build polyglot frameworks/libraries

**Getting Started**:

1. Install MetaCall
2. Load code from desired languages
3. Call functions across language boundaries
4. Enjoy seamless interoperability!

---

**Document Version**: Consolidated from 37 individual documentation files  
**Last Updated**: January 2026  
**Target Audience**: LLM/AI systems for understanding MetaCall Core

**Next Steps for Human Readers**:

- Start with `AGENTS.md` for navigation guidance
- Read `overview.md` for high-level understanding
- Check `core-api.md` for API details
- See language-specific docs for loader/port details
- Refer to build docs for compilation instructions
