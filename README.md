# boost-ts

TypeScript Library to boost functional programming

This library includes useful generic type functions working for TypeScript types (not value), e.g. push/pop/zip for type tuples, and useful general type-safe functions that returns complicated types.

<p align="center">
  <a href="https://github.com/ryokat3/boost-ts">
    <img src="https://github.com/ryokat3/boost-ts/actions/workflows/test.yml/badge.svg?branch=master" alt="test status" height="20">
  </a>
</p>

- Function Library

  - **partial** : type-safe partial parameter binding similar to C++ boost library
  - **mkobjmap** : type-safe map function for key-value object
  - **mergeobj** : type-safe recursive merge function for key-value object
  - **bundle** : type-safe partial parameter binding for multiple functions

- Type Library
  - type tuple
  - type map

## Function Library

### partial

This library offers a partial function call with flexible argument binding. Of course, it's __type safe__.

```ts
import { partial, _1, _2 } from "boost-ts"

function sub (a:number, b:number):number {
    return a - b
}

// bind 2nd argument
const sub10 = partial(sub, _1, 10)        // type :: (a:number)=>number
console.log(sub10(100))                   // output is 90

// swap 1st and 2nd argument
const reverse_sub = partial(sub, _2, _1)  // type :: (a:number, b:number)=>number
console.log(reverse_sub(10, 100))         // output is 90
```

### mkobjmap

Type-safe map for object.

By using `Object.entries()` and `reduce()`, we can implement a `map`-like fnction for Typescript objects.

```ts
////////////////////////////////////////////////////////////////
/// Unexpected Case
////////////////////////////////////////////////////////////////

type Box<T> = { value: T }

function boxify<T>(t: T):Box<T> {
    return { value: t }
}

const data = {
    name: "John",
    age: 26
}

const unexpected = Object.entries(data).reduce((acc, [key, value])=>{
    return {
        ...acc,
        [key]: boxify(value)
    }
}, {})

// unexpected.name is ERROR!!
//
// Even with more typing, type will be like ...
// {
//     name: Box<number> | Box<string>
//     age: Box<number> | Box<string>
// }
```

We want the type `{ name: Box<string>, age: Box<number> }` in this case.

```ts
import { mkmapobj } from "boost-ts"

////////////////////////////////////////////////////////////////
// Expected Case
////////////////////////////////////////////////////////////////

type BoxMapType<T> = { [P in keyof T]: [T[P], Box<T[P]>] }

// To reuse 'mapobj', we can list all possible types as tuple
type BoxKeyType = [string, number, boolean, string[], number[]]

// Make 'map' type with Mapped Tuple Type, and apply
const mapobj = mkmapobj<BoxMapType<BoxKeyType>>()

// The dataBox type is `{ name: Box<string>, age: Box<number> }`
const dataBox = mapobj(data, boxify)

chai.assert.equal(dataBox.name.value, data.name)
chai.assert.equal(dataBox.age.value, data.age)
```

### bundle

Supposed we have an interface for set of file operations,

```ts
// What we have

interface FileOper {
    dirname: (config:Config) => string,
    read: (config:Config, name:string) => string
    write: (config:Config, name:string, content:string) => number
}
```

and `Config` is a singleton, then we expect such interface with curried functions.

```ts
// What we expect

interface CurriedFileOper {
    dirname: () => string,
    read: (name:string) => string
    write: (name:string, content:string) => number
}
```

In such cases, `bundle` is convenient.

```ts
import { bundle } from "boost-ts"

// 'bundle' curries bunch of functions
const curriedFileOper:CurriedFileOper = bundle(config, fileOper)
```

### mergeobj

Type-safe merge of key-value objects

```ts
const recordA = {
    personal: {
        name: "John",
        age: "26"
    }
}

const recordB = {
    personal: {
        age: 26,
        nationality: "American"
    }
}

const merged = mergeobj(recordA, recordB)
/*
  The type of 'merged' is

  {
      personal: {
          name: string,
          age: number,
          nationality: string
      }
  }

*/

```

## Type Library

This library for Typescript types offers tuple type operation, like Push, Pop, Find, Select, Zip etc.

I hope we can avoid to add "as any" for the complicated type of Typescript functions with this library.
As design policy, recursive type definition is avoided as much as possible because it sometimes causes a compile error when initiating types.

### Push

Add a type to the head of type tuple.

```ts
import { Push } from "boost-ts/typelib"

type Target = Push<Date, [string, number]>
// type Target = [Date, string, number]
```

[Playground Link](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgBQK4GcAWcC+cBmUEIcARAEYQTowC0M6A9DAJ5gCmANsOaQFB9WHOABUAhlADm7eAF4UGTAB4AImJjsANHADaNKMAB2k7YdQhy7KAF0AfH0aM4Q9qInS5utRu36jJuDMLK2sgA)


### Pop

Remove a type from the head of type tuple.

```ts
import { Pop } from "boost-ts/typelib"

type Target = Pop<[Date, string, number]>
// type Target = [string, number]
```
[Playground Link](https://www.typescriptlang.org/play?ssl=4&ssc=34&pln=1&pc=1#code/JYWwDg9gTgLgBAbzgBQmOBfOAzKERwBEARhBAM4wC0M5A9DAJ5gCmANsMYQFDdOtwAKgEMoAcxbwAvCjQAeANoARYTBYAaOJSjAAdmM26AriGIsoAXQB83OnTj8WQ0ROlwF2vQbjHT5i0A)

### Head

Get the head of type tuple.

```ts
import { Head } from "boost-ts/typelib"

type Target = Head<[Date, string, number]>
// type Target = Date
```

[Playground Link](https://www.typescriptlang.org/play?ssl=4&ssc=22&pln=1&pc=1#code/JYWwDg9gTgLgBAbzgCQKYEMAmcC+cBmUEIcARAEYQQDOMAtDNQPQwCeYqANsOaQFB82HOABV0UAOap4AXhQZMAHgDaAEXQxUAGji0owAHYSdBgK4hyqKAF0AfHyZM4Q1KPFTZcdZqA)

### Reverse

Reverse the order of type tuple.

```ts
// Target = [number, string, boolean]
type Target = Reverse<[boolean, string, number]>
```

### Filter

Filter a type from type tuple (incl. recursive call)

```ts
// Target = [boolean, number]
type Target = Filter<string, [boolean, string, number]>
```

### Select

Select a type from type tuple (incl. recursive call)

```ts
// Target = [string, number]
type Target = Select<string|number, [boolean, string, number]>
```

### Zip

Zip two type tuples.

```ts
// Target = [ [1, boolean], [2, string, [3, number] ]
type Target = Zip<[1, 2, 3], [boolean, string, number]>
```

### SelectObject

Select properties from object type.

```ts
type Source = {
    str1: string,
    num1: number,
    bool1: boolean,
    str2: string,
    num2: number
    bool2: boolean
}

// Target = {
//    str1: string,
//    str2: string
// }

type Target = SelectObject<Source, string>
```

### FilterObject

Filter properties from object type.

```ts
type Source = {
    str1: string,
    num1: number,
    bool1: boolean,
    str2: string,
    num2: number
    bool2: boolean
}

// Target = {
//    num1: number,
//    num2: number,
//    bool1: boolean,
//    bool2: boolean
// }

type Target = FilterObject<Source, string>
```

### Decrease

Decrease a number type.

```ts
// Target = 3
type Target = Decrease<4>
```

### Comp

Compare two number types.

```ts
// Target1 = -1
type Target1 = Comp<1, 2>
// Target2 = 0
type Target2 = Comp<2, 2>
// Target3 = 1
type Target3 = Comp<2, 1>
```

------

- Some code of this library is based on [this stackoverflow article](https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type).
- The API of partial function is inspired by [Boost C++ library](https://www.boost.org/)
- Thanks to the blog [Suppress Error of type level programming of TypeScript](https://kgtkr.net/blog/2019/04/15/typescript-typelevelprogramming-error-suppression/en).
  This library will be nothing without workarounds suggested by this blog. [Japanese version](https://kgtkr.net/blog/2019/04/15/typescript-typelevelprogramming-error-suppression) is also published.
- [typepark](https://www.npmjs.com/package/typepark) is an excellent library that provides the large collection of typescript types manipulation.
- The code of `Equals` implementation is copied from [this comment](https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650)
