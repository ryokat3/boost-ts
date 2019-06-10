/**
 *  Tuple
 */ 
declare const None: unique symbol
type None = typeof None
declare const Pad: unique symbol
type Pad = typeof Pad

export type Cast<T,P> = T extends P ? T : never

export type Length<T extends any[]> = T['length']

// Copy & Paste
// Items['length'] extends 0 ? 0 : Items['length'] extends 1 ? 1 : Items['length'] extends 2 ? 2 : Items['length'] extends 3 ? 3 : Items['length'] extends 4 ? 4 : Items['length'] extends 5 ? 5 : Items['length'] extends 6 ? 6 : Items['length'] extends 7 ? 7 : Items['length'] extends 8 ? 8 : never

export type Push<A, T extends Array<any>> = {
    nop: T
    push: ((a: A, ...b: T) => void) extends ((...a: infer I) => void) ? I : []
}[ A extends None ? "nop" : "push" ]

export type Pop<T extends any[]> = Length<T> extends 0 ? [] : (((...b: T) => void) extends (a:any, ...b: infer I) => void ? I : [])

export type Head<T extends any[]> = Length<T> extends 0 ? None : T[0]

export type Element<T extends any[], I extends number> = Length<T> extends 0 ? None : T[I]

// Old version which could cause typescript error
export type _Reverse<Items extends any[], Result extends Array<any> = []> = {
    done: Result    
    continue: _Reverse<Pop<Items> extends infer X1 ? Cast<X1,any[]> : never, Push<Head<Items>, Result> extends infer X2 ? Cast<X2,any[]> : never>
}[ Length<Items> extends 0  ? "done" : "continue"]

// Recursive free version
export type Reverse<Items extends any[]> = {
    0: []
    1: Items
    2: Items extends [ infer A, infer B] ? [B, A] : never
    3: Items extends [ infer A, infer B, infer C] ? [C, B, A] : never
    4: Items extends [ infer A, infer B, infer C, infer D] ? [D, C, B, A] : never
    5: Items extends [ infer A, infer B, infer C, infer D, infer E] ? [E, D, C, B, A] : never
    6: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F] ? [F, E, D, C, B, A] : never
    7: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? [G, F, E, D, C, B, A] : never
    8: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H] ? [H, G, F, E, D, C, B, A] : never
}[ Items['length'] extends 0 ? 0 : Items['length'] extends 1 ? 1 : Items['length'] extends 2 ? 2 : Items['length'] extends 3 ? 3 : Items['length'] extends 4 ? 4 : Items['length'] extends 5 ? 5 : Items['length'] extends 6 ? 6 : Items['length'] extends 7 ? 7 : Items['length'] extends 8 ? 8 : never ]


export type Filter<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Filter<T, Pop<Items>, Push<Head<Items> extends T ? None : Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Select<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Select<T, Pop<Items>, Push<Head<Items> extends T ? Head<Items> : None, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type FilterMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: FilterMask<T, Pop<Items>, Push<Head<Items> extends T ? Pad : Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type SelectMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: SelectMask<T, Pop<Items>, Push<Head<Items> extends T ? Head<Items> : Pad, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Zip<Items1 extends any[], Items2 extends any[], Result extends Array<[any,any]> = []> = {
    done: Reverse<Result>
    continue: Zip<Pop<Items1>, Pop<Items2>, Push<[Head<Items1>, Head<Items2>], Result> extends infer X1 ? Cast<X1,[any,any][]> : never>
}[ Length<Items1> extends 0 ? "done" : Length<Items2> extends 0 ? "done" : "continue" ]

export type Unzip<Zipped extends [any,any][], Items1 extends Array<any> = [], Items2 extends Array<any> = []> = {
    done: [Reverse<Items1>, Reverse<Items2>]
    continue: Unzip<Pop<Zipped> extends infer X1 ? Cast<X1,[any,any][]> : never, Push<Zipped[0][0], Items1>, Push<Zipped[0][1], Items2>>
}[ Length<Zipped> extends 0 ? "done" : "continue" ]

export type Unzip2nd<Zipped extends [any,any][], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Unzip2nd<Pop<Zipped> extends infer X1 ? Cast<X1,[any,any][]> : never, Push<Zipped[0][1], Result> extends infer X2 ? Cast<X2,any[]> : never>
}[ Length<Zipped> extends 0 ? "done" : "continue" ]

export type Top<T, Items extends any[], TopItem = None, Result extends Array<any> = []> = {
    // NOTE:
    //
    // Don't use :: Push<TopItem, Reverse<Result>>
    // It causes
    // The type instatiation is excessively deep and possibly infinite. ts(2589)
    //
    done: Push<TopItem, Reverse<Result> extends infer X1 ? Cast<X1, any[]> : never>    
    continue: TopItem extends T ? Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result> extends infer X2 ? Cast<X2,any[]> : never> : Head<Items> extends T ? Top<T, Pop<Items>, Head<Items>, Result> : Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result> extends infer X4 ? Cast<X4,any[]> : never>        
}[ Length<Items> extends 0 ? "done" : "continue" ]

export type MapUnion<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>    
    continue: MapUnion<T, Pop<Items>, Push<Head<Items>|T, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type MapNonNullable<Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: MapNonNullable<Pop<Items>, Push<NonNullable<Head<Items>>, Result> extends infer X1 ? Cast<X1,any[]> : never>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type ToUnion<Items extends any[], Result = never> = {
    done: Result
    continue: ToUnion<Pop<Items> extends infer X1 ? Cast<X1,any[]> : never, Result | Head<Items>>
}[ Length<Items> extends 0  ? "done" : "continue"]