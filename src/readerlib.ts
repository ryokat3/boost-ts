import { partial, getNumberOfPlaceHolder, PHArg, UnboundArgs, _1, _2, _3, _4 } from "./partial"
import { ArgumentsType } from "./functionlib"
import { Length, Cast } from "./tuplelib"
import { Comp } from "./numberlib"

export type GetArgsTupledType<Func extends (...args:any[])=>any> = {
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


export type TupledArgsType<Args extends any[]> = {
    nop: Args[0]
    tupled: Args
} [ Comp<Length<Args>, 2> extends -1 ? "nop" : "tupled"]


type DespreadFuncType<Args extends any[], R> = {
    0: ()=>R
    1: (arg:Args[0])=>R
    2: (args:Args)=>R
} [ Length<Args> extends 0 ? 0 : Length<Args> extends 1 ? 1 : 2 ]



type ReaderableFuncType<Func extends (...args:any[])=>any, Args extends any[]> = DespreadFuncType<UnboundArgs<Func, Args>, ReturnType<Func>>

export type ReaderEnvType<Func extends (...args:any[])=>any, Args extends any[]> = TupledArgsType<UnboundArgs<Func, Args> extends infer T1 ? Cast<T1,any[]> : never>

export type OverallEnv<Items extends any[]> = {
    0: []
    1: Items extends [ infer A ] ? [ A ] : never
    2: Items extends [ infer A, infer B ] ? [ A, B ] | [A] : never
    3: Items extends [ infer A, infer B, infer C ] ? [ A, B, C]  | [ A, B ] | [A] : never
    4: Items extends [ infer A, infer B, infer C, infer D ] ? [ A, B, C, D ] | [ A, B, C ] | [ A, B ] | [A] : never
    5: Items extends [ infer A, infer B, infer C, infer D, infer E ] ? [ A, B, C, D, E ] | [ A, B, C, D ] | [ A, B, C ] | [ A, B ] | [A] : never
    6: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F ] ? [ A, B, C, D, E, F ] | [ A, B, C, D, E ] | [ A, B, C, D ] | [ A, B, C ] | [ A, B ] | [A] : never
    7: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G ] ? [ A, B, C, D, E, F, G ]  | [ A, B, C, D, E, F ] | [ A, B, C, D, E ] | [ A, B, C, D ] | [ A, B, C ] | [ A, B ] | [A] : never
    8: Items extends [ infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H ] ? [ A, B, C, D, E, F, G, H  ] | [ A, B, C, D, E, F, G ]  | [ A, B, C, D, E, F ] | [ A, B, C, D, E ] | [ A, B, C, D ] | [ A, B, C ] | [ A, B ] | [A] : never
}[ Items['length'] extends 0|1|2|3|4|5|6|7|8  ? Items['length'] : never ]

/**
 * 
 * Partial function call convenient for Reader monad, create (e:E)=>A
 * 
 * If signle arguments is unbound, then it is used as-is for E
 * If multiple arguments are unbound, then they are packed in a tuple [E1, E2] for E
 * 
 * @param func         function chained as Reader monad
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function readerable<Func extends (...args:any[])=>any>
    (func:Func):ReaderableFuncType<Func,[]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>>
    (func:Func, a1:A1):ReaderableFuncType<Func,[A1]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>>
    (func:Func, a1:A1, a2:A2):ReaderableFuncType<Func,[A1,A2]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>>
    (func:Func, a1:A1, a2:A2, a3:A3):ReaderableFuncType<Func,[A1,A2,A3]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4):ReaderableFuncType<Func,[A1,A2,A3,A4]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5):ReaderableFuncType<Func,[A1,A2,A3,A4,A5]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6):ReaderableFuncType<Func,[A1,A2,A3,A4,A5,A6]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7):ReaderableFuncType<Func,[A1,A2,A3,A4,A5,A6,A7]>
export function readerable<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>, A8 extends PHArg<Func,7>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7, a8:A8):ReaderableFuncType<Func,[A1,A2,A3,A4,A5,A6,A7,A8]>

export function readerable<Func extends (...args:any[])=>any>(func:Func, ...args:any[]):(a:any)=>ReturnType<Func>
export function readerable<Func extends (...args:any[])=>any>(func:Func, ...args:any[]):(a:any)=>ReturnType<Func> {    
    return getArgsTupled(partial(func, ...args), getNumberOfPlaceHolder(args) >= 2)
}
