import { Decrease } from "./numberlib"
/**
 *  Tuple
 */ 
declare const None: unique symbol
type None = typeof None
declare const Pad: unique symbol
type Pad = typeof Pad

export type Cast<T,P> = T extends P ? T : never

export type Length<T extends any[]> = T['length']

export type Push<A, T extends Array<any>> = {
    nop: T
    push: ((a: A, ...b: T) => void) extends ((...a: infer I) => void) ? I : []
}[ A extends None ? "nop" : "push" ]

export type Pop<T extends any[]> = Length<T> extends 0 ? [] : (((...b: T) => void) extends (a:any, ...b: infer I) => void ? I : [])

export type Head<T extends any[]> = Length<T> extends 0 ? None : T[0]


export type Reverse<Items extends any[], Result extends Array<any> = []> = {
    done: Result    
    continue: Reverse<Pop<Items>, Push<Head<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

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

export type Zip<Items1 extends any[], Items2 extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Zip<Pop<Items1>, Pop<Items2>, Push<[Head<Items1>, Head<Items2>], Result>>
}[ Length<Items1> extends 0 ? "done" : Length<Items2> extends 0 ? "done" : "continue" ]

export type Unzip<Zipped extends any[][], Items1 extends Array<any> = [], Items2 extends Array<any> = []> = {
    done: [Reverse<Items1>, Reverse<Items2>]
    continue: Unzip<Pop<Zipped>, Push<Zipped[0][0], Items1>, Push<Zipped[0][1], Items2>>
}[ Length<Zipped> extends 0 ? "done" : "continue" ]

export type Unzip2nd<Zipped extends any[][], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Unzip2nd<Pop<Zipped>, Push<Zipped[0][1], Result>>
}[ Length<Zipped> extends 0 ? "done" : "continue" ]

export type Top<T, Items extends any[], TopItem = None, Result extends Array<any> = []> = {
    // NOTE:
    //
    // Don't use :: Push<TopItem, Reverse<Result>>
    // It causes
    // The type instatiation is excessively deep and possibly infinite. ts(2589)
    //
    done: Push<TopItem, Reverse<Result> extends infer TEMP ? Cast<TEMP, any[]> : never>    
    continue: TopItem extends T ? Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result>> : Head<Items> extends T ? Top<T, Pop<Items>, Head<Items>, Result> : Top<T, Pop<Items>, TopItem, Push<Head<Items>, Result>>        
}[ Length<Items> extends 0 ? "done" : "continue" ]

export type MapUnion<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>    
    continue: MapUnion<T, Pop<Items>, Push<Head<Items>|T, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type MapNonNullable<Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: MapNonNullable<Pop<Items>, Push<NonNullable<Head<Items>>, Result> extends infer X1 ? Cast<X1,any[]> : never>
}[ Length<Items> extends 0  ? "done" : "continue"]