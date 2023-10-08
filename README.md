# Enum

Simple Enum JS class.

---

# Table of Contents

- [Enum](#enum)
- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Load](#load)
- [~ Quick start ~](#-quick-start-)
- [Enum() Constructor](#enum-constructor)
- [Methods](#methods)
  - [.forKeys()](#forkeys)
  - [.forValues()](#forvalues)
  - [.forEach()](#foreach)
  - [.keys()](#keys)
  - [.values()](#values)
  - [.hasKey()](#haskey)
  - [.hasValue()](#hasvalue)
  - [.next()](#next)
  - [.raw()](#raw)
- [Properties](#properties)
  - [.i](#i)
  - [.key](#key)
  - [.value](#value)
- [Static methods](#static-methods)
  - [Enum.new()](#enumnew)
  - [Enum.raw()](#enumraw)
  - [Enum.fromRaw()](#enumfromraw)
  - [Enum.next()](#enumnext)
- [Static properties](#static-properties)
  - [Enum.i](#enumi)
  - [Enum.index](#enumindex)
  - [Enum.default](#enumdefault)
- [Development](#development)
- [PR and bugs](#pr-and-bugs)
- [What next?](#what-next)

---

# Install

    npm i @voidvolker/enum

# Load

ES module:

```javascript
import Enum from '@voidvolker/enum'
```

```javascript
import { Enum } from '@voidvolker/enum'
```

Require:

```javascript
const Enum = require('@voidvolker/enum')
```

```javascript
const { Enum } = require('@voidvolker/enum')
```

# ~ Quick start ~

```javascript
import Enum from '@voidvolker/enum'

const roles = new Enum({ none: 0, admin: 1 }, [
    'moderator',
    'manager',
    'client',
    'user'
])
console.log(roles.key.admin) // -> 1
console.log(roles.key.moderator) // -> 2
console.log(roles.key.manager) // -> 3
console.log(roles.key.client) // -> 4
console.log(roles.key.user) // -> 5
```

# Enum() Constructor

Create new `Enum` instance. In case when pairs is used - counter will be changed to last value from pairs object.

```javascript
new Enum(names)
new Enum(pairs)
new Enum(pairs, names)
new Enum(names, options)
new Enum(pairs, options)
new Enum(pairs, names, options)
```

First argument: `pairs` or `names`, second - `names` or options, third - always `options`

Arguments:

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `pairs` | `Object -> name: value<Number>` | Object with pairs in format `name: value` |
| `names` | `Array<String>` | A list of names in string format |
| `options` | `Object` | Additional options |

Options:

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `i` | `Number` | Inital counter value |
| `next` | `Function` | Counter increment callback. Default: `this.i++` |

# Methods

## .forKeys()

Execute callback once for each key.

```javascript
.forKeys(cb)
.forKeys(cb, thisArg)
```

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `cb`\* | `Function`, `cb(key)` | Callback to execute, _required_ |
| `thisArg` | `*` | A value to use as `this` when executing callback. Default - current enum instance. |
|  |  |  |
| **`return`** | `Enum` | Returns current enum instance |

Callback options:

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `key`  | `String` | Key |

## .forValues()

Execute callback once for each value.

```javascript
.forValues(cb)
.forValues(cb, thisArg)
```

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `cb`\* | `Function`, `cb(value)` | Callback to execute |
| `thisArg` | `*` | A value to use as `this` when executing callback. Default - current enum instance. |
|  |  |  |
| **`return`** | `Enum` | Returns current enum instance |

Callback options:

<!-- prettier-ignore -->
| Option  | Type | Description |
| --- | --- | --- |
| `value` | `Number` | Value |

## .forEach()

Execute callback once for each key.

```javascript
.forKeys(cb)
.forKeys(cb, thisArg)
```

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `cb`\* | `Function`, `cb(key, value)` | Callback to execute |
| `thisArg` | `*` | A value to use as `this` when executing callback. Default - current enum instance. |
|  |  |  |
| **`return`** | `Enum` | Returns current enum instance |

Callback options:

<!-- prettier-ignore -->
| Option | Type | Description |
| --- | --- | --- |
| `key` | `String` | Key |
| `value` | `Number` | Value |

## .keys()

Return array with all keys of current enum.

## .values()

Return array with all values of current enum.

## .hasKey()

Check if key in current enum with `Object.prototype.hasOwnProperty` method.

```javascript
.hasKey(key)
```

## .hasValue()

Check if value in current enum with `Object.prototype.hasOwnProperty` method.

```javascript
.hasValue(value)
```

## .next()

Callback to change counter value for current enum.

## .raw()

Create raw enum object with pairs `key: value` and `value: key` from current enum instance. Object created with `null` prototype for safe key/value conversion. Usefull in case when you don't need any other features of `Enum` class and you just need a simple index of keys/values. To store counter in object - `Symbol` is used stored in `Enum.index` property.

```javascript
let enm = new Enum(['foo', 'bar'])
let rawEnm = enm.raw()
let enmCnt = enm.i
let rawCounter = rawEnm[Enum.index]
```

# Properties

Enum instance properties was created in constructor.

## .i

Counter value.

-   Type: `Number`
-   Default: `0`

## .key

`key -> value` map to get value for selected key.

-   Type: `Object`

```javascript
const enm = new Enum(['foo', 'bar'])
console.log(enm.key.foo) // -> 0
console.log(enm.key.bar) // -> 1
```

## .value

`value -> key` map to get key for selected value.

-   Type: `Object`

```javascript
const enm = new Enum(['foo', 'bar'])
console.log(enm.value[0]) // -> 'foo'
console.log(enm.value[1]) // -> 'bar'
```

---

# Static methods

## Enum.new()

Create enum using global counter from constructor. Arguments same as for `Enum()` constructor. `i` defined in counter will be used. If not - global counter from `Enum.i` will be used.

## Enum.raw()

Alias to `new Enum(...).raw()` and have same argumenst as `Enum()` constructor.

```javascript
Enum.raw(pairs, list, options)
```

## Enum.fromRaw()

Create `Enum` instance from raw object. Values and names filtered by value type: string - name, number - value.

```javascript
Enum.fromRaw(rawEnm)
```

## Enum.next()

Method to change counter value for current enum.

# Static properties

## Enum.i

Global index counter. Initial value: `0`

## Enum.index

`Symbol` for saving counter in raw object.

## Enum.default

Object with default options. Options:

-   `i`: 0

Default options override behavior: user options -> current constructor default -> Enum.default

---

# Development

Install development dependencies:

    npm -D i @voidvolker/enum

Run coffee compiler:

    npm run w

Run tests or tests watcher:

    npm test
    npm run wt

Run live dev.js file with debugger:

    npm run dev

Build:

    npm run build

Build results are saved to `dist` folder. Babel and rollup is used.

# PR and bugs

If you find a bug or want to add some awesome feature - feel free to send PR. Be sure the code is simple and effective and don't forget to add tests.

# What next?

Have fun!
