import { MapNonNullable, Cast } from "./tuplelib"

export type ArgumentsType<Func extends (...args:any[])=>any> = Func extends (...args: infer Args)=>ReturnType<Func> ? Cast<Args, any[]> : never

export type NonNullableFunction<Func extends (...args:any[])=>any> = (...args:MapNonNullable<ArgumentsType<Func>> extends infer X2 ? Cast<X2,any[]> : never)=>ReturnType<Func>

export function despread<Func extends (...args:any[])=>any>(func:Func):(tupledArgs:ArgumentsType<Func>)=>ReturnType<Func> {
    return function(tupledArgs:ArgumentsType<Func>):ReturnType<Func> {
        return func(...tupledArgs)
    }
}


export function pipe<Func extends (...args:any[])=>any,R>(func1:Func, func2:(a:ReturnType<Func>)=>R):(...args:ArgumentsType<Func>)=>R {
    return function (...args:ArgumentsType<Func>):R {
        return func2(func1(...args))
    }
}
