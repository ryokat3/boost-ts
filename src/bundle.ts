import { Pop } from "./tuplelib"

export const bundle = <T, BundleType extends { [key:string]: (t:T, ...args:any[])=>any }>
        (t:T, bundle:BundleType):{ [Key in keyof BundleType]: (...args:Pop<Parameters<BundleType[Key]>>)=>ReturnType<BundleType[Key]> } => {
    return Object.entries(bundle).reduce((result, [name, func])=>{
        return {
            ...result,
            [name]: (...args:Pop<Parameters<typeof func>>)=>func(t, ...args)
        }
    }, {} as { [Key in keyof BundleType]: (...args:Pop<Parameters<BundleType[Key]>>)=>ReturnType<BundleType[Key]> })
}