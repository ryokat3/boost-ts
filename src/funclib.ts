import { Find, Pop, Top, Zip, Unzip, Select, SelectMask, Cast, ToUnion } from "./typelib"

////////////////////////////////////////////////////////////////////////
/// Partial
////////////////////////////////////////////////////////////////////////

// Suppress TS error
//
// TS2589: Type instantiation is excessively deep and possibly infinite
//
// "extends infer XXX ? Cast<XXX, any[]> : never" supports TS to guess type
//

/**
 * partial
 */

// Place Hodlers (=PH)
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

type SortZipByPH<Items extends [any,any][], PhList extends any[]> = Top<[PhList[0], unknown],Top<[PhList[1], unknown],Top<[PhList[2], unknown], Top<[PhList[3], unknown], Items> extends infer X4 ? Cast<X4,[any,any][]> : never> extends infer X3 ? Cast<X3,[any,any][]> : never> extends infer X2 ? Cast<X2,[any,any][]> : never>

type SelectMaskArgs<Args extends any[], PhUnion> = SelectMask<PhUnion, Args> extends infer XXX ? Cast<XXX, any[]> : never

type ZipFuncArgs<FuncArgs extends any[], Args extends any[], PhUnion> =
    Zip<
        SelectMaskArgs<
            Args,
            PhUnion
        >,
        FuncArgs
    > extends infer XXX ? Cast<XXX, [any,any][]> : never


type SelectedZipFuncPH<FuncArgs extends any[], Args extends any[], PhUnion> =
    Select<
        [PhUnion, unknown],
        ZipFuncArgs<
            FuncArgs, Args, PhUnion
        >
    > extends infer XXX ? Cast<XXX,[any,any][]> : never


type SortedZipFuncPH<FuncArgs extends any[], Args extends any[], PhList extends any[]> =
    SortZipByPH<
        SelectedZipFuncPH<
            FuncArgs,
            Args,
            ToUnion<PhList>
        > extends infer XXX ? Cast<XXX,[any,any][]> : never,        
        PhList
    >  

type PartialFreeArgsType<FuncArgs extends any[], Args extends any[], PhList extends any[]> =
    Unzip<
        SortedZipFuncPH<
            FuncArgs,Args,PhList
        > extends infer XXX ? Cast<XXX,[any,any][]>: never
    >[1] extends infer XXXX ? Cast<XXXX, any[]> : never

type FreeArgs<Func extends (...args:any[])=>any, Args extends any[]> =
    PartialFreeArgsType<        
        Parameters<Func> extends infer X1 ? Cast<X1, any[]> : never,
        Args,
        PH_LIST
    > extends infer XXX ? Cast<XXX, any[]> : never

type PHArg<Func extends (...args:any[])=>any, N extends number> = Parameters<Func>[N] | PH_UNION

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


// export function partial <Func extends (...args:any[])=>any>(func:Func, ...bindingArgs:any[]):(...unboundArgs:any[])=>ReturnType<Func>    
export function partial<Func extends (...args:any[])=>any>(func:Func, ...bindingArgs:any[]):(...unboundArgs:any[])=>ReturnType<Func> {
    return function (...unboundArgs:any[]):ReturnType<Func> {
        const args:any[] = unboundArgs    
        return func.call(func, ...args.reduce((result:any[], arg:any, idx:number)=>result.map((x:any)=>(x === PH_LIST[idx] ? arg : x)), bindingArgs))
    }    
}

////////////////////////////////////////////////////////////////////////
/// bundle
////////////////////////////////////////////////////////////////////////


export const bundle = <T, BundleType extends { [key:string]: (t:T, ...args:any[])=>any }>
        (t:T, bundle:BundleType):{ [Key in keyof BundleType]: (...args:Pop<Parameters<BundleType[Key]>>)=>ReturnType<BundleType[Key]> } => {
    return Object.entries(bundle).reduce((result, [name, func])=>{        
        return {
            ...result,
            [name]: (...args:Pop<Parameters<typeof func>>)=>func(t, ...args)
        }
    }, Object.create(null))    
}

////////////////////////////////////////////////////////////////////////
/// mkobjmap
////////////////////////////////////////////////////////////////////////

type MapGet<T, MapType extends [unknown, unknown][]> = Find<[T, unknown], MapType>[1]
type MapKey<MapType extends [unknown, unknown][]> = ToUnion<Unzip<MapType>[0]>
type MapValue<MapType extends [unknown, unknown][]> = ToUnion<Unzip<MapType>[1]>


/**
 * Create a converter of object values
 * 
 * Convert values of string-indexed object in type-safe manner, e.g. { age:20, name:"charlie" }
 */
export function mkmapobj<MapType extends [unknown, unknown][]>() {
    return <
        Obj extends { [key: string]: MapKey<MapType> },
        Conv extends (_: MapKey<MapType>) => MapValue<MapType>
    >(obj: Obj, conv: Conv):{ [K in keyof Obj]: MapGet<Obj[K], MapType> } => {    
        return Object.entries(obj).reduce((obj, [key, value]) => {            
            return {
                ...obj,
                [key]: conv(value)
            }             
        }, Object.create(null))
    }
}


////////////////////////////////////////////////////////////////////////
/// mergeobj
////////////////////////////////////////////////////////////////////////
type RecordType<K extends string | number | symbol> = Record<K, any>

export type MergeType<K extends string | number | symbol, A extends RecordType<K>, B extends RecordType<K>> =
    { [ Key in Extract<keyof A, keyof B>]: A[Key] extends RecordType<K> ? B[Key] extends RecordType<K> ? MergeType<K, A[Key], B[Key]> : B[Key] : B[Key] } &
    { [ Key in Exclude<keyof A, keyof B>]: A[Key] } &
    { [ Key in Exclude<keyof B, keyof A>]: B[Key] }

function isRecordType(target: unknown): target is RecordType<any> {
    return (typeof(target) === "object") && (!Array.isArray(target))
}

export function mergeobj<K extends string | number | symbol, A extends RecordType<K>, B extends RecordType<K>>(main: A, delta: B): MergeType<K,A,B>
export function mergeobj(main: RecordType<any>, delta: RecordType<any>): RecordType<any> {    
    const updated = Object.entries(main).reduce((acc, [key, mval]) => {        
        const dval = delta[key]
        return {
            ...acc,
            [key]: (isRecordType(mval) && isRecordType(dval)) ? mergeobj(mval, dval) : (dval !== undefined) ? dval : mval
        }
    }, main)

    return Object.entries(delta).reduce((acc, [key, dval]) => {
        return (key in main) ? acc: { ...acc, [key]: dval }
    }, updated)
}

////////////////////////////////////////////////////////////////////////
/// rot2curry
////////////////////////////////////////////////////////////////////////
export const rot2curry = <Func extends (...args1:any[])=>(...args2:any[])=>any>(func:Func):
    (...args2:Parameters<ReturnType<Func>>) =>
    (...args1:Parameters<Func>) =>
    ReturnType<ReturnType<Func>> =>
        (...args2)=>(...args1)=>func(...args1)(...args2)

export const rot3curry = <Func extends (...args1:any[])=>(...args2:any[])=>(...arg3s:any[])=>any>(func:Func):
    (...arg3:Parameters<ReturnType<ReturnType<Func>>>) =>
    (...args1:Parameters<Func>) =>
    (...args2:Parameters<ReturnType<Func>>) =>
    ReturnType<ReturnType<ReturnType<Func>>> =>
        (...args3)=>(...args1)=>(...args2)=>func(...args1)(...args2)(...args3)

export const rot4curry = <Func extends (...args1:any[])=>(...args2:any[])=>(...args:any[])=>(...args4:any[])=>any>(func:Func):
    (...arg4:Parameters<ReturnType<ReturnType<ReturnType<Func>>>>) =>
    (...args1:Parameters<Func>) =>
    (...args2:Parameters<ReturnType<Func>>) =>
    (...args3:Parameters<ReturnType<ReturnType<Func>>>) =>
    ReturnType<ReturnType<ReturnType<ReturnType<Func>>>> =>
        (...args4)=>(...args1)=>(...args2)=>(...args3)=>func(...args1)(...args2)(...args3)(...args4)