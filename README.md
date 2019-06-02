# boost-ts
TypeScript Library to boost functional programming

## Partial Function Call

With maximzing the advanced type of TypeScript, this library offers a partial function call with flexible argument binding. Of course, it's __type safe__.

```TypeScript
import { partial, _1, _2 } from "boost-ts"

function sub (a:number, b:number):number {
    return a - b
}

// bind 2nd argument
const sub10 = partial(sub, _1, 10)        # type :: (a:number)=>number
console.log(sub10(100))                   # output is 90

// swap 1st and 2nd argument
const reverse_sub = partial(sub, _2, _1)  # type :: (a:number, b:number)=>number
console.log(reverse_sub(10, 100))         # output is 90
```


------
- Some code of this library is based on [this stackoverflow article](https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type).
- The API of partial function is inspired by [Boost C++ library](https://www.boost.org/)
