import { Length, Top, Zip, Unzip2nd, Select, SelectMask, MapUnion, Cast } from "./tuplelib"
import { ArgumentsType } from "./functionlib"
import { Comp } from "./numberlib"

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


export type PartialUnboundArgsType<FuncArgs extends any[], Args extends any[]> = Unzip2nd<SortedZipFuncPH<FuncArgs,Args> extends infer X5 ? Cast<X5,any[][]>: never> extends infer X6 ? Cast<X6, any[]> : never
export type PartialArgsType<Func extends (...args:any[])=>any> = MapUnion<PH_TYPE, ArgumentsType<Func> extends infer X1 ? Cast<X1, any[]> : never> extends infer X2 ? Cast<X2, any[]> : never

/**
 * Partial function call
 * 
 * 
 * @param func         function
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function partial<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func>>(func:Func, ...bindingArgs:ArgsType):(...unboundArgs:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType>)=>ReturnType<Func> {
    return function (...unboundArgs:any[]) {    
        return func.call(func, ...unboundArgs.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), bindingArgs)) as ReturnType<Func>
     }    
}



type GetArgsTupledType<Func extends (...args:any[])=>any> = {
    nop: Func
    tupled: (arg:ArgumentsType<Func>)=>ReturnType<Func>
} [ Comp<Length<ArgumentsType<Func>>, 2> extends -1 ? "nop" : "tupled"]

function getArgsTupled<Func extends (...args:any[])=>any>(func:Func, tupled:boolean):GetArgsTupledType<Func> {
    return ((args:any)=> {
        if (tupled) {
            return func.call(func, ...args)
        }
        else {
            return func.call(func, args)
        }
    }) as GetArgsTupledType<Func>
}

function countPH(args:any[]):number {
    return args.reduce((acc:number, curr:any)=>(PH_LIST.indexOf(curr) >= 0) ? acc + 1 : acc, 0)
}

type ReaderifiedFuncType<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func>> = GetArgsTupledType<(...unboundArgs:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType>)=>ReturnType<Func>>

/**
 * Partial function call convenient for Reader monad, create (e:E)=>A
 * 
 * If signle arguments is unbound, then it is used as-is for E
 * If multiple arguments are unbound, then they are packed in a tuple [E1, E2] for E
 * 
 * @param func         function chained as Reader monad
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function readerify<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func>>(func:Func, ...bindingArgs:ArgsType):ReaderifiedFuncType<Func, ArgsType> {
    const boundFunc = partial(func, ...bindingArgs)
    return getArgsTupled(boundFunc, countPH(bindingArgs) >= 2)
}