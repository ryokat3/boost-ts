import { Top, Zip, Unzip2nd, Select, SelectMask, MapUnion, Cast } from "./tuplelib"
import { ArgumentsType } from "./functionlib"

/**
 * partial
 */

// Place Hodlers 
export const _1 = Symbol("_1")
export const _2 = Symbol("_2")
export const _3 = Symbol("_3")
export const _4 = Symbol("_4")

type _1 = typeof _1
type _2 = typeof _2
type _3 = typeof _3
type _4 = typeof _4

type PH_TYPE = _1 | _2 | _3 | _4
const PH_LIST = [ _1, _2, _3, _4 ]


type SortZipByPH<Items extends any[][]> = Top<[_1, unknown], Top<[_2, unknown], Top<[_3, unknown], Top<[_4, unknown], Items> extends infer X4 ? Cast<X4,any[][]> : never> extends infer X3 ? Cast<X3,any[][]> : never> extends infer X2 ? Cast<X2,any[][]> : never>
type PHMaskArgs<Args extends any[]> = SelectMask<PH_TYPE, Args> extends infer X1 ? Cast<X1,any[]> : never
type ZipFuncPH<FuncArgs extends any[], Args extends any[]> = Zip<PHMaskArgs<Args>, FuncArgs> extends infer X2 ? Cast<X2,any[][]> : never
type SelectedZipFuncPH<FuncArgs extends any[], Args extends any[]> = Select<[PH_TYPE, unknown], ZipFuncPH<FuncArgs, Args>> extends infer X3 ? Cast<X3,any[][]> : never
type SortedZipFuncPH<FuncArgs extends any[], Args extends any[]> = SortZipByPH<SelectedZipFuncPH<FuncArgs, Args> extends infer X4 ? Cast<X4,any[][]> : never>
type PartialArgs<FuncArgs extends any[], Args extends any[]> = Unzip2nd<SortedZipFuncPH<FuncArgs,Args> extends infer X5 ? Cast<X5,any[][]>: never> extends infer X6 ? Cast<X6, any[]> : never


/*
export function partial<A1, R, X1 extends A1|PH_TYPE >(func:(a1:A1)=>R, x1:X1):(...args:PartialArgs<[A1],[X1]>)=>R
export function partial<A1, A2, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE>(func:(a1:A1, a2:A2)=>R, x1:X1, x2:X2):(...args:PartialArgs<[A1,A2],[X1,X2]>)=>R
export function partial<A1, A2, A3, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3)=>R, x1:X1, x2:X2, x3:X3):(...args:PartialArgs<[A1,A2,A3],[X1,X2,X3]>)=>R
export function partial<A1, A2, A3, A4, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4)=>R, x1:X1, x2:X2, x3:X3, x4:X4):(...args:PartialArgs<[A1,A2,A3,A4],[X1,X2,X3,X4]>)=>R
export function partial<A1, A2, A3, A4, A5, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5):(...args:PartialArgs<[A1,A2,A3,A4,A5],[X1,X2,X3,X4,X5]>)=>R
export function partial<A1, A2, A3, A4, A5, A6, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6],[X1,X2,X3,X4,X5,X6]>)=>R
export function partial<A1, A2, A3, A4, A5, A6, A7, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE, X7 extends A7|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6, x7:X7):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6,A7],[X1,X2,X3,X4,X5,X6,X7]>)=>R
export function partial<A1, A2, A3, A4, A5, A6, A7, A8, R, X1 extends A1|PH_TYPE , X2 extends A2|PH_TYPE, X3 extends A3|PH_TYPE, X4 extends A4|PH_TYPE, X5 extends A5|PH_TYPE, X6 extends A6|PH_TYPE, X7 extends A7|PH_TYPE, X8 extends A8|PH_TYPE>(func:(a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7, a8:A8)=>R, x1:X1, x2:X2, x3:X3, x4:X4, x5:X5, x6:X6, x7:X7, x8:X8):(...args:PartialArgs<[A1,A2,A3,A4,A5,A6,A7,A8],[X1,X2,X3,X4,X5,X6,X7,X8]>)=>R

export function partial<R>(func:(...args:any[])=>R, ...argsOrig:any[]):(...args:any[])=>R {
    return function (...partialArgs:any[]) {
       return func.call(func, ...partialArgs.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), argsOrig))
    }
}
*/


type ActualArgsType<Func extends (...args:any[])=>any> = MapUnion<PH_TYPE, ArgumentsType<Func> extends infer X1 ? Cast<X1, any[]> : never> extends infer X2 ? Cast<X2, any[]> : never

export function partial<Func extends (...args:any[])=>any, Args extends ActualArgsType<Func>>(func:Func, ...argsOrig:Args):(...partialArgs:PartialArgs<ArgumentsType<Func>, Args>)=>ReturnType<Func> {
    return function (...partialArgs:any[]) {    
        return func.call(func, ...partialArgs.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), argsOrig)) as ReturnType<Func>
     }    
}