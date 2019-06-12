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
//}[ Items['length'] extends 0 ? 0 : Items['length'] extends 1 ? 1 : Items['length'] extends 2 ? 2 : Items['length'] extends 3 ? 3 : Items['length'] extends 4 ? 4 : Items['length'] extends 5 ? 5 : Items['length'] extends 6 ? 6 : Items['length'] extends 7 ? 7 : Items['length'] extends 8 ? 8 : never ]
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8 ? Items['length'] : never ]


export type Filter<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Filter<T, Pop<Items>, Push<Head<Items> extends T ? None : Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Select<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Select<T, Pop<Items>, Push<Head<Items> extends T ? Head<Items> : None, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

// Recursive free version (NOT WORK)
export type _Select<T, Items extends any[], NO = never> = {
    0: []
    1: Items extends [ infer A ] ? [ A extends T ? A : NO ] : never
    2: Items extends [ infer A, infer B ] ? [ A extends T ? A : NO, B extends T ? B : NO ] : never
    3: Items extends [ infer A, infer B, infer C ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO ] :never
    4: Items extends [ infer A, infer B, infer C, infer D ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO, D extends T ? D : NO ] : never
    5: Items extends [ infer A, infer B, infer C, infer D, infer E ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO, D extends T ? D : NO, E extends T ? E : NO ] : never 
    6: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO, D extends T ? D : NO, E extends T ? E : NO, F extends T ? F : NO ] : never
    7: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO, D extends T ? D : NO, E extends T ? E : NO, F extends T ? F : NO, G extends T ? G : NO ] : never
    8: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H ] ? [ A extends T ? A : NO, B extends T ? B : NO, C extends T ? C : NO, D extends T ? D : NO, E extends T ? E : NO, F extends T ? F : NO, G extends T ? G : NO, H extends T ? H : NO ] : never
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8  ? Items['length'] : never ]


export type FilterMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: FilterMask<T, Pop<Items>, Push<Head<Items> extends T ? Pad : Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

// Old version which could cause typescript error
export type _SelectMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: _SelectMask<T, Pop<Items>, Push<Head<Items> extends T ? Head<Items> : Pad, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

// Recursive free version
export type SelectMask<T, Items extends any[]> = {
    0: []
    1: Items extends [ infer A ] ? [ A extends T ? A : Pad ] : never
    2: Items extends [ infer A, infer B ] ? [ A extends T ? A : Pad, B extends T ? B : Pad ] : never
    3: Items extends [ infer A, infer B, infer C ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad ] :never
    4: Items extends [ infer A, infer B, infer C, infer D ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad, D extends T ? D : Pad ] : never
    5: Items extends [ infer A, infer B, infer C, infer D, infer E ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad, D extends T ? D : Pad, E extends T ? E : Pad ] : never 
    6: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad, D extends T ? D : Pad, E extends T ? E : Pad, F extends T ? F : Pad ] : never
    7: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad, D extends T ? D : Pad, E extends T ? E : Pad, F extends T ? F : Pad, G extends T ? G : Pad ] : never
    8: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H ] ? [ A extends T ? A : Pad, B extends T ? B : Pad, C extends T ? C : Pad, D extends T ? D : Pad, E extends T ? E : Pad, F extends T ? F : Pad, G extends T ? G : Pad, H extends T ? H : Pad ] : never
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8  ? Items['length'] : never ]

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

type Top2<T, Items extends any[]> = Items extends [infer A, infer B]
    ? B extends T ? [B, A]
    : Items
    : never
type Top3<T, Items extends any[]> = Items extends [infer A, infer B, infer C]
    ? C extends T ? [C, A, B] 
    : B extends T ? [B, A, C]
    : Items
    : never
type Top4<T, Items extends any[]> = Items extends [infer A, infer B, infer C, infer D]
    ? D extends T ? [D, A, B, C]
    : C extends T ? [C, A, B, D]
    : B extends T ? [B, A, C, D]
    : Items
    : never
type Top5<T, Items extends any[]> = Items extends [infer A, infer B, infer C, infer D, infer E]
    ? E extends T ? [E, A, B, C, D]
    : D extends T ? [D, A, B, C, E]
    : C extends T ? [C, A, B, D, E]
    : B extends T ? [B, A, C, D, E]
    : Items
    : never
type Top6<T, Items extends any[]> = Items extends [infer A, infer B, infer C, infer D, infer E, infer F]
    ? F extends T ? [F, A, B, C, D, E]
    : E extends T ? [E, A, B, C, D, F]
    : D extends T ? [D, A, B, C, E, F]
    : C extends T ? [C, A, B, D, E, F]
    : B extends T ? [B, A, C, D, E, F]
    : Items
    : never
type Top7<T, Items extends any[]> = Items extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G]
    ? G extends T ? [G, A, B, C, D, E, F]
    : F extends T ? [F, A, B, C, D, E, G]
    : E extends T ? [E, A, B, C, D, F, G]
    : D extends T ? [D, A, B, C, E, F, G]
    : C extends T ? [C, A, B, D, E, F, G]
    : B extends T ? [B, A, C, D, E, F, G]
    : Items
    : never
type Top8<T, Items extends any[]> = Items extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? H extends T ? [H, A, B, C, D, E, F, G]
    : G extends T ? [G, A, B, C, D, E, F, H]
    : F extends T ? [F, A, B, C, D, E, G, H]
    : E extends T ? [E, A, B, C, D, F, G, H]
    : D extends T ? [D, A, B, C, E, F, G, H]
    : C extends T ? [C, A, B, D, E, F, G, H]
    : B extends T ? [B, A, C, D, E, F, G, H]
    : Items
    : never

export type Top<T, Items extends any[]> = {
    0: Items
    1: Items
    2: Top2<T,Items>    
    3: Top3<T,Items>
    4: Top4<T,Items>
    5: Top5<T,Items>
    6: Top6<T,Items>
    7: Top7<T,Items>
    8: Top8<T,Items>
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8 ? Items['length'] : never ]    


export type _Top<T, Items extends any[], TopItem = None, Result extends Array<any> = []> = {
    // NOTE:
    //
    // Don't use :: Push<TopItem, Reverse<Result>>
    // It causes
    // The type instatiation is excessively deep and possibly infinite. ts(2589)
    //
    done: Push<TopItem, Reverse<Result> extends infer X1 ? Cast<X1, any[]> : never>    
    continue: TopItem extends T ? _Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result> extends infer X2 ? Cast<X2,any[]> : never> : Head<Items> extends T ? _Top<T, Pop<Items>, Head<Items>, Result> : _Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result> extends infer X4 ? Cast<X4,any[]> : never>        
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