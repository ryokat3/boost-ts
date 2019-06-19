import { Top, Zip, Unzip2nd, Select, SelectMask, MapUnion, Cast, ToUnion } from "./tuplelib"

/**
 * partial
 */

// Place Hodlers 
export const _1 = Symbol("_1")
export const _2 = Symbol("_2")
export const _3 = Symbol("_3")
export const _4 = Symbol("_4")
export const _5 = Symbol("_5")
export const _6 = Symbol("_6")
export const _7 = Symbol("_7")
export const _8 = Symbol("_8")

export type _1 = typeof _1
export type _2 = typeof _2
export type _3 = typeof _3
export type _4 = typeof _4
export type _5 = typeof _5
export type _6 = typeof _6
export type _7 = typeof _7
export type _8 = typeof _8

type PH_LIST = [ _1, _2, _3, _4, _5, _6, _7, _8 ]
const PH_LIST = [ _1, _2, _3, _4, _5, _6, _7, _8 ]


type PH_UNION = ToUnion<PH_LIST>
type XPH_UNION = ToUnion<XPH_LIST>

type SortZipByPH<Items extends [any,any][], PhList extends any[]> = Top<[PhList[0], unknown],Top<[PhList[1], unknown],Top<[PhList[2], unknown], Top<[PhList[3], unknown], Items> extends infer X4 ? Cast<X4,[any,any][]> : never> extends infer X3 ? Cast<X3,[any,any][]> : never> extends infer X2 ? Cast<X2,[any,any][]> : never>

type SelectMaskArgs<Args extends any[], PhUnion> = SelectMask<PhUnion, Args> extends infer X1 ? Cast<X1,any[]> : never


type ZipFuncArgs<FuncArgs extends any[], Args extends any[], PhUnion> =
    Zip<
        SelectMaskArgs<
            Args,
            PhUnion
        >,
        FuncArgs
    > extends infer X2 ? Cast<X2,[any,any][]> : never


type SelectedZipFuncPH<FuncArgs extends any[], Args extends any[], PhUnion> =
    Select<
        [PhUnion, unknown],
        ZipFuncArgs<
            FuncArgs, Args, PhUnion
        >
    > extends infer X3 ? Cast<X3,[any,any][]> : never


type SortedZipFuncPH<FuncArgs extends any[], Args extends any[], PhList extends any[]> =
    SortZipByPH<
        SelectedZipFuncPH<
            FuncArgs,
            Args,
            ToUnion<PhList>
        > extends infer X4 ? Cast<X4,[any,any][]> : never,
        PhList
    >  

type PartialFreeArgsType<FuncArgs extends any[], Args extends any[], PhList extends any[]> =
    Unzip2nd<
        SortedZipFuncPH<
            FuncArgs,Args,PhList
        > extends infer X5 ? Cast<X5,[any,any][]>: never
    > extends infer X6 ? Cast<X6, any[]> : never


type PartialBindingArgsType<Func extends (...args:any[])=>any, PhUnion> =
    MapUnion<
        PhUnion,
        Parameters<Func> extends infer X1 ? Cast<X1, any[]> : never
    > extends infer X2 ? Cast<X2, any[]> : never

export type PartialBindingType<Func extends (...args:any[])=>any> = PartialBindingArgsType<Func, PH_UNION> extends infer X1 ? Cast<X1,any[]> : never


export type FreeArgs<Func extends (...args:any[])=>any, Args extends any[]> =
    PartialFreeArgsType<        
        Parameters<Func> extends infer X1 ? Cast<X1, any[]> : never,
        Args,
        PH_LIST
    > extends infer X2 ? Cast<X2, any[]> : never

export function getNumberOfPlaceHolder(args:any[]):number {
    return args.reduce((acc:number, curr:any)=>(PH_LIST.indexOf(curr) >= 0) ? acc + 1 : acc, 0)
}

export type PHArg<Func extends (...args:any[])=>any, N extends number> = Parameters<Func>[N] | PH_UNION

/**
 * Partial function call
 * 
 * 
 * @param func         function
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function partial<Func extends (...args:any[])=>any>
    (func:Func):(...args:FreeArgs<Func,[]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>>
    (func:Func, a1:A1):(...args:FreeArgs<Func,[A1]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>>
    (func:Func, a1:A1, a2:A2):(...args:FreeArgs<Func,[A1,A2]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>>
    (func:Func, a1:A1, a2:A2, a3:A3):(...args:FreeArgs<Func,[A1,A2,A3]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4):(...args:FreeArgs<Func,[A1,A2,A3,A4]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5):(...args:FreeArgs<Func,[A1,A2,A3,A4,A5]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6):(...args:FreeArgs<Func,[A1,A2,A3,A4,A5,A6]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7):(...args:FreeArgs<Func,[A1,A2,A3,A4,A5,A6,A7]>)=>ReturnType<Func>
export function partial<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>, A8 extends PHArg<Func,7> >
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7, a8:A8):(...args:FreeArgs<Func,[A1,A2,A3,A4,A5,A6,A7,A8]>)=>ReturnType<Func>


export function partial <Func extends (...args:any[])=>any>(func:Func, ...bindingArgs:any[]):(...unboundArgs:any[])=>ReturnType<Func>    
export function partial<Func extends (...args:any[])=>any>(func:Func, ...bindingArgs:any[]):(...unboundArgs:any[])=>ReturnType<Func> {
    return function (...unboundArgs:any[]):ReturnType<Func> {
        const args:any[] = unboundArgs    
        return func.call(func, ...args.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), bindingArgs))
    }    
}


export const _X1 = Symbol("_X1")
export const _X2 = Symbol("_X2")
export const _X3 = Symbol("_X3")
export const _X4 = Symbol("_X4")

type _X1 = typeof _X1
type _X2 = typeof _X2
type _X3 = typeof _X3
type _X4 = typeof _X4

type XPH_LIST = [ _X1, _X2, _X3, _X4 ]
const XPH_LIST = [ _X1, _X2, _X3, _X4 ]

export function partialX<Func extends (...args:any[])=>any, ArgsType extends PartialBindingArgsType<Func, PH_UNION|XPH_UNION>>(func:Func, ...bindingArgs:ArgsType):(...unboundArgs:PartialFreeArgsType<Parameters<Func>, ArgsType, XPH_LIST>)=>(...unboundArgs:PartialFreeArgsType<Parameters<Func>, ArgsType, PH_LIST>)=>ReturnType<Func> {    
    return function<UnboundArgs extends PartialFreeArgsType<Parameters<Func>, ArgsType, XPH_LIST>> (...outerArgs:UnboundArgs):(...unboundArgs:PartialFreeArgsType<Parameters<Func>, ArgsType, PH_LIST>)=>ReturnType<Func> {    
        return function<UnboundArgs extends PartialFreeArgsType<Parameters<Func>, ArgsType, PH_LIST>> (...innerArgs:UnboundArgs):ReturnType<Func> {        
            const args1:any[] = outerArgs
            const args2:any[] = innerArgs
            
            return func.call(func, ...args2.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), 
                args1.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === XPH_LIST[idx] ? arg : x)), bindingArgs)))
        }
    }
}
