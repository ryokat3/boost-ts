/**
 *  Tuple
 */ 
declare const None: unique symbol
type None = typeof None
declare const Mask: unique symbol
type Mask = typeof Mask

export type Length<T extends any[]> = T['length']

export type Push<A, T extends Array<any>> = {
    true: T
    false: ((a: A, ...b: T) => void) extends ((...a: infer I) => void) ? I : []
}[ A extends None ? "true" : "false" ]

export type Pop<T extends any[]> = Length<T> extends 0 ? [] : (((...b: T) => void) extends (a:any, ...b: infer I) => void ? I : [])

export type Peek<T extends any[]> = Length<T> extends 0 ? None : T[0]

export type Reverse<Items extends any[], Result extends Array<any> = []> = {
    done: Result
    // @ts-ignore
    continue: Reverse<Pop<Items>, Push<Peek<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Filter<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Filter<T, Pop<Items>, Push<Peek<Items> extends T ? None : Peek<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Select<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Select<T, Pop<Items>, Push<Peek<Items> extends T ? Peek<Items> : None, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

type FilterMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: FilterMask<T, Pop<Items>, Push<Peek<Items> extends T ? Mask : Peek<Items>, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

type SelectMask<T, Items extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: SelectMask<T, Pop<Items>, Push<Peek<Items> extends T ? Peek<Items> : Mask, Result>>
}[ Length<Items> extends 0  ? "done" : "continue"]

export type Zip<Items1 extends any[], Items2 extends any[], Result extends Array<any> = []> = {
    done: Reverse<Result>
    continue: Zip<Pop<Items1>, Pop<Items2>, Push<[Peek<Items1>, Peek<Items2>], Result>>
}[ Length<Items1> extends 0 ? "done" : Length<Items2> extends 0 ? "done" : "continue" ]

export type Unzip<Zipped extends any[][], Items1 extends Array<any> = [], Items2 extends Array<any> = []> = {
    done: [Reverse<Items1>, Reverse<Items2>]
    continue: Unzip<Pop<Zipped>, Push<Zipped[0][0], Items1>, Push<Zipped[0][1], Items2>>
}[ Length<Zipped> extends 0 ? "done" : "continue" ]

export type Top<T, Items extends any[], TopItem = None, Result extends Array<any> = []> = {
    // @ts-ignore        
    done: Push<TopItem, Reverse<Result>>
    // @ts-ignore
    continue: TopItem extends T ? Top<T, Pop<Items>, TopItem, Push<Peek<Items>, Result>> : Peek<Items> extends T ? Top<T, Pop<Items>, Peek<Items>, Result> : Top<T, Pop<Items>, TopItem, Push<Peek<Items>, Result>>        
}[ Length<Items> extends 0 ? "done" : "continue" ]



/**
 * Number
 */
type NumberToTuple<N extends number, Result extends Array<any> = []> = {
    done: Result
    continue: NumberToTuple<N, Push<1, Result>>
} [ Length<Result> extends N  ? "done" : "continue"]

// @ts-ignore
type Decrease<N extends number> = Length<Pop<NumberToTuple<N>>>

type CompLength<Items1 extends any[], Items2 extends any[]> = {
    less: -1
    equal: 0
    great: 1
    continue:  CompLength<Pop<Items1>, Pop<Items2>>
}[ Length<Items1> extends Length<Items2> ? "equal" : Length<Items1> extends 0 ? "less" : Length<Items2> extends 0 ? "great" : "continue" ]

// @ts-ignore
type Comp<Num1 extends number, Num2 extends number> = CompLength<NumberToTuple<Num1>, NumberToTuple<Num2>>


/**
 * partial
 */

// Place Hodlers 
export const _1 = Symbol("_1")
export const _2 = Symbol("_2")
export const _3 = Symbol("_3")
export const _4 = Symbol("_4")

export type _1 = typeof _1
export type _2 = typeof _2
export type _3 = typeof _3
export type _4 = typeof _4

type PH_TYPE = _1 | _2 | _3 | _4
const PH_LIST = [ _1, _2, _3, _4 ]


// @ts-ignore
type SortZipByPH<Items extends any[]> = Top<[_1, unknown], Top<[_2, unknown], Top<[_3, unknown], Top<[_4, unknown], Items>>>>
// @ts-ignore
type PartialArgs<FuncArgs extends any[], Args extends any[]> = Unzip<SortZipByPH<Select<[PH_TYPE, unknown], Zip<SelectMask<PH_TYPE, Args>, FuncArgs>>>>[1]


// @ts-ignore
export function partial<A1, R, X1 extends A1|PH_TYPE >(func:(a1:A1)=>R, x1:X1):(...args:PartialArgs<[A1],[X1]>)=>R
// @ts-ignore
export function partial<A1, A2, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE>(func:(a1:A1, a2:A2)=>R, x1:X1, x2:X2):(...args:PartialArgs<[A1,A2],[X1,X2]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3)=>R, x1:X1, x2:X2, x3:X3):(...args:PartialArgs<[A1,A2,A3],[X1,X2,X3]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, A4, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4)=>R, x1:X1, x2:X2, x3:X3, x4:X4):(...args:PartialArgs<[A1,A2,A3,A4],[X1,X2,X3,X4]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, A4, A5, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5):(...args:PartialArgs<[A1,A2,A3,A4,A5],[X1,X2,X3,X4,X5]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, A4, A5, A6, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6],[X1,X2,X3,X4,X5,X6]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, A4, A5, A6, A7, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE, X7 extends A7|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6, x7:X7):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6,A7],[X1,X2,X3,X4,X5,X6,X7]>)=>R
// @ts-ignore
export function partial<A1, A2, A3, A4, A5, A6, A7, A8, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE, X7 extends A7|PH_TYPE, X8 extends A8|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7, a8:A8)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6, x7:X7, x8:X8):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6,A7,A8],[X1,X2,X3,X4,X5,X6,X7,X8]>)=>R


/**
 * partial implementation
 */
export function partial<R>(func:(...args:any[])=>R, ...argsOrig:any[]):(...args:any[])=>R {
    return function (...partialArgs:any[]) {
       return func.call(func, ...partialArgs.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), argsOrig))
    }
}
