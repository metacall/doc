---
title: Calling Functions
description: Call loaded functions using MetaCall Core APIs (by name, by handle, by reference) with automatic type conversion.
sidebar_position: 5
---

# Calling Functions

## Overview

This page describes how to call functions across language boundaries using MetaCall Core.

Before calling any function, you must load code into MetaCall.  
See: [Loading Code](./loading-code.md)

MetaCall supports multiple calling styles:

- Call by **function name**
- Call by **module handle + function name**
- Call by **function reference**
- Call using **serialized** requests (for integrations)

---

## Key Concepts

### Function Resolution

MetaCall must locate a function (by name, handle+name, or reference) before it can execute it.

### MetaCall Values

Arguments and return values are represented internally using MetaCall's value system.

### Type Conversion

MetaCall converts arguments into the target runtime types and converts return values back to the caller.

---

## Core Call APIs

### Call by Name

Use this when the function name is unique across loaded modules.

| Function      | Description                                             |
| ------------- | ------------------------------------------------------- |
| `metacall`    | Call by function name with variadic arguments           |
| `metacallv`   | Call by function name using an array of MetaCall values |
| `metacallv_s` | Same as `metacallv` but with explicit array size        |
| `metacallt`   | Call by function name with explicit argument types      |
| `metacallt_s` | Same as `metacallt` but with explicit array size        |

**Behavior**

- Searches for a function by name in the loaded runtime contexts
- Converts arguments to the expected types
- Executes the function
- Returns a MetaCall value (or `NULL` on failure)

---

### Call by Handle

Use this when multiple loaded modules define the same function name.

| Function     | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `metacallhv` | Call using a module handle + function name + array arguments |

**Behavior**

- Uses the handle to select the target module/context
- Avoids name collisions across modules
- Returns a MetaCall value (or `NULL` on failure)

---

### Call by Function Reference

Use this when you already have a resolved function reference.

| Function     | Description                                           |
| ------------ | ----------------------------------------------------- |
| `metacallfv` | Call a function reference using an array of arguments |

**Behavior**

- Skips name lookup
- Executes the referenced function directly
- Returns a MetaCall value (or `NULL` on failure)

---

## Serialized Function Calls

MetaCall can support calling functions using serialized formats for integrations.

This is useful when:

- calls come from external systems
- calls must be transported over a protocol (RPC-style)
- calls must be logged and replayed

---

## Type Conversion Rules (High Level)

When calling a function, MetaCall performs:

1. **Argument mapping**: caller types → MetaCall types
2. **Conversion**: MetaCall types → target runtime types
3. **Execution**: function runs in target runtime
4. **Return mapping**: target runtime type → MetaCall type → caller representation

If conversion fails, the call may fail and return `NULL`.

---

## Error Handling

### Core API (C)

In the C API, failures are typically represented by:

- return value = `NULL`

Common failure causes:

1. function does not exist
2. wrong argument count
3. incompatible argument types
4. exception thrown inside the target runtime

### Ports (Language-Specific)

Ports may report errors using:

- exceptions
- error objects
- language-native error conventions

---

## Best Practices

1. **Always load code before calling**
2. **Prefer handle-based calls** when name collisions are possible
3. **Inspect function metadata** if you are unsure about argument types
4. **Destroy MetaCall values** when required to avoid leaks
5. **Be careful with complex types** (objects/arrays) across language boundaries

---

## Related

- [Loading Code](./loading-code.md)
- [Core API](./core-api.md)
- [Architecture](./architecture.md)
