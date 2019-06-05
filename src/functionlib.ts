import { MapNonNullable, Cast } from "./tuplelib"

export type ArgumentsType<Func extends (...args:any[])=>any> = Func extends (...args: infer Args)=>ReturnType<Func> ? Args : never

// @ts-ignore
export type NonNullableFunction<Func extends (...args:any[])=>any> = (...args:MapNonNullable<ArgumentsType<Func> extends infer X1 ? Cast<X1,any[]> : never>)=>ReturnType<Func>