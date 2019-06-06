import { Length, Top, Zip, Unzip2nd, Select, SelectMask, MapUnion, Cast, ToUnion } from "./tuplelib"
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

type PH_LIST = [ _1, _2, _3, _4 ]
const PH_LIST = [ _1, _2, _3, _4 ]


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


type PH_UNION = ToUnion<PH_LIST>
type XPH_UNION = ToUnion<XPH_LIST>

type SortZipByPH<Items extends any[][], PhList extends any[]> = Top<[PhList[0], unknown], Top<[PhList[1], unknown], Top<[PhList[2], unknown], Top<[PhList[3], unknown], Items> extends infer X4 ? Cast<X4,any[][]> : never> extends infer X3 ? Cast<X3,any[][]> : never> extends infer X2 ? Cast<X2,any[][]> : never>

type SelectMaskArgs<Args extends any[], PhUnion> = SelectMask<PhUnion, Args> extends infer X1 ? Cast<X1,any[]> : never
type ZipFuncArgs<FuncArgs extends any[], Args extends any[], PhUnion> = Zip<SelectMaskArgs<Args, PhUnion>, FuncArgs> extends infer X2 ? Cast<X2,any[][]> : never
type SelectedZipFuncPH<FuncArgs extends any[], Args extends any[], PhUnion> = Select<[PhUnion, unknown], ZipFuncArgs<FuncArgs, Args, PhUnion>> extends infer X3 ? Cast<X3,any[][]> : never
type SortedZipFuncPH<FuncArgs extends any[], Args extends any[], PhList extends any[]> = SortZipByPH<SelectedZipFuncPH<FuncArgs, Args, ToUnion<PhList>> extends infer X4 ? Cast<X4,any[][]> : never, PhList>

export type PartialUnboundArgsType<FuncArgs extends any[], Args extends any[], PhList extends any[]> = Unzip2nd<SortedZipFuncPH<FuncArgs,Args, PhList> extends infer X5 ? Cast<X5,any[][]>: never> extends infer X6 ? Cast<X6, any[]> : never
export type PartialArgsType<Func extends (...args:any[])=>any, PhUnion> = MapUnion<PhUnion, ArgumentsType<Func> extends infer X1 ? Cast<X1, any[]> : never> extends infer X2 ? Cast<X2, any[]> : never

/**
 * Partial function call
 * 
 * 
 * @param func         function
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function partial<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func, PH_UNION>>(func:Func, ...bindingArgs:ArgsType):(...unboundArgs:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, PH_LIST>)=>ReturnType<Func> {
    return function<UnboundArgs extends PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, PH_LIST>> (...unboundArgs:UnboundArgs):ReturnType<Func> {
        const args:any[] = unboundArgs    
        return func.call(func, ...args.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), bindingArgs))
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

type ReaderifiedFuncType<Func extends (...args:any[])=>any, PhList extends any[], ArgsType extends PartialArgsType<Func, ToUnion<PhList>>> = GetArgsTupledType<(...unboundArgs:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, PhList>)=>ReturnType<Func>>

/**
 * Partial function call convenient for Reader monad, create (e:E)=>A
 * 
 * If signle arguments is unbound, then it is used as-is for E
 * If multiple arguments are unbound, then they are packed in a tuple [E1, E2] for E
 * 
 * @param func         function chained as Reader monad
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function readerify<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func, PH_UNION>>(func:Func, ...bindingArgs:ArgsType):ReaderifiedFuncType<Func, PH_LIST, ArgsType> {
    const boundFunc = partial(func, ...bindingArgs)
    return getArgsTupled(boundFunc, countPH(bindingArgs) >= 2)
}




type ReaderChainifiedFuncType<Func extends (...args1:any[])=>any, ArgsType extends PartialArgsType<Func, PH_UNION|XPH_UNION>> = (...args2:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, XPH_LIST>)=>GetArgsTupledType<(...args3:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, PH_LIST>)=>ReturnType<Func>>

function readerChainify<Func extends (...args:any[])=>any, ArgsType extends PartialArgsType<Func, PH_UNION|XPH_UNION>>(func:Func, ...bindingArgs:ArgsType):ReaderChainifiedFuncType<Func, ArgsType> {
    return function (...args2:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, XPH_LIST>):GetArgsTupledType<(...args3:PartialUnboundArgsType<ArgumentsType<Func>, ArgsType, PH_LIST>)=>ReturnType<Func>> {
        return function (tupledArgs:any):ReturnType<Func> {
            const args:any[] = args2
            const xargs = args.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === XPH_LIST[idx] ? arg : x)), bindingArgs)
            const args3:any[] = (countPH(bindingArgs) >= 2) ? tupledArgs : [ tupledArgs ]
            return func.call(func, ...args3.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), xargs))                        
        }        
    }
}
/*
const hehe = (a:number, b:string, c:boolean, d:string, e:number) =>  `${a} - ${b} - ${c} - ${d} - ${e}`
const hehe1 = readerChainify(hehe, _2, _X2, true, _1, _X1)
console.log(hehe1(5, "hello")(["not", 3]))
*/
