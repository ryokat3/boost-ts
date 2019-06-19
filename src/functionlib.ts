import { MapNonNullable, Cast } from "./tuplelib"

export type ReturnValueType<T> = T extends (...args:any[])=>infer R ? R extends Promise<infer V> ? V : R : never

export type NonNullableFunction<Func extends (...args:any[])=>any> = (...args:MapNonNullable<Parameters<Func>> extends infer X2 ? Cast<X2,any[]> : never)=>ReturnType<Func>

export function despread<Func extends (...args:any[])=>any>(func:Func):(tupledArgs:Parameters<Func>)=>ReturnType<Func> {    
    return function(tupledArgs:Parameters<Func>):ReturnType<Func> {    
        return func(...tupledArgs)
    }
}

export function pipe<Func extends (...args:any[])=>any,R>(func1:Func, func2:(a:ReturnType<Func>)=>R):(...args:Parameters<Func>)=>R {    
    return function (...args:Parameters<Func>):R {    
        return func2(func1(...args))
    }
}