import * as tuplelib from "./tuplelib"
export { tuplelib }
import * as numberlib from "./numberlib"
export { numberlib }
import * as partial from "./partial"
export { partial }

type Length<T extends any[]> = T['length']

type Target1 = Length<[string, number, boolean]> // => 3

declare const None: unique symbol
type None = typeof None

// Pushする型が'None'の場合は何もしない

type Push<A, T extends Array<any>> = {
    nop: T
    push: ((a: A, ...b: T) => void) extends ((...a: infer I) => void) ? I : []
}[ A extends None ? "nop" : "push" ]

type Target2 = Push<boolean, [string, number]>  // => [boolean, string, number]

// import 'Length'

type Pop<T extends any[]> = Length<T> extends 0 ? [] : (((...b: T) => void) extends (a:any, ...b: infer I) => void ? I : [])

type Target3 = Pop<[boolean, string, number]>  // => [string, number]

// import 'None' and 'Length'
type Head<T extends any[]> = Length<T> extends 0 ? None : T[0]

type Target4 = Head<[boolean, string, number]>  // => boolean

// import 'Push', 'Pop', and 'Head'

type Reverse<Items extends any[], Result extends Array<any> = []> = {
    done: Result
    // @ts-ignore
    continue: Reverse<Pop<Items>, Push<Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

type Target5 = Reverse<[boolean, string, number]>  // => [number, string, boolean]