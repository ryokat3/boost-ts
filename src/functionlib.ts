import { MapNonNullable, Cast } from "./tuplelib"

export type ArgumentsType<Func extends (...args:any[])=>any> = Func extends (...args: infer Args)=>ReturnType<Func> ? Args : never
export type NonNullableFunction<Func extends (...args:any[])=>any> = (...args:MapNonNullable<ArgumentsType<Func>> extends infer X2 ? Cast<X2,any[]> : never)=>ReturnType<Func>