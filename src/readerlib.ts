import { partial, PartialBindingType, PartialUnboundType, getNumberOfPlaceHolder , _1, _2, _3, _4 } from "./partial"
import { ArgumentsType } from "./functionlib"
import { Length } from "./tuplelib"
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

/**
 * Partial function call convenient for Reader monad, create (e:E)=>A
 * 
 * If signle arguments is unbound, then it is used as-is for E
 * If multiple arguments are unbound, then they are packed in a tuple [E1, E2] for E
 * 
 * @param func         function chained as Reader monad
 * @param bindingArgs  binding args except place holders like _1, _2, _3 ...
 */
export function readerable<Func extends (...args:any[])=>any, ArgsType extends PartialBindingType<Func>>(func:Func, ...bindingArgs:ArgsType):GetArgsTupledType<(...unboundArgs:PartialUnboundType<Func, ArgsType>)=>ReturnType<Func>> {
//export function readerify<Func extends (...args:any[])=>any, ArgsType extends PartialBindingType<Func>>(func:Func, ...bindingArgs:ArgsType) {    
    const boundFunc = partial(func, ...bindingArgs)
    return getArgsTupled(boundFunc, getNumberOfPlaceHolder(bindingArgs) >= 2)
}