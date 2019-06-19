import * as chai from "chai"
import { readerable, ReaderableEnvType, readerify, readerifyRunArgs, ReaderifyEnvType, ReaderifyCallType, ReaderifyRunType, _1, _2, _3, _4, _5, _6, _7, _8 } from "../src/readerlib"
import { ReturnValueType } from "../src/functionlib"
import { Reader } from "fp-ts/lib/Reader"
import { ReaderTaskEither, tryCatch, ask } from "fp-ts/lib/ReaderTaskEither"


function getReaderMonad<Func extends (...args:any[])=>any, Args extends ReaderifyCallType<Func> >(func:Func, ...args:Args):Reader<ReaderableEnvType<Func, Args>,ReturnType<Func>> {    
    return new Reader(readerable(func, ...(args as unknown[])))
}

function getReaderTaskEitherMonad<Func extends (...args:any[])=>Promise<any>, Args extends ReaderifyCallType<Func> >(func:Func, ...args:Args):ReaderTaskEither<ReaderableEnvType<Func, Args>, string, ReturnValueType<Func>> {    
    return tryCatch(readerable(func, ...(args as unknown[])), (err:any)=>`${err} ${func.name}`)
}

export function readerifyTryCatch<Func extends (...args:any[])=>Promise<any>, Args extends ReaderifyCallType<Func> >(func:Func, ...args:Args):ReaderTaskEither<ReaderifyEnvType<Func, Args>, string, ReturnValueType<Func>> {    
    return tryCatch(readerify(func, ...args), (err:any)=>`${err} ${func.name}`)
}

const test = (x:number, y:string):string=> `${x}, ${y}`
const atest = async (x:number, y:string):Promise<string>=> `${x}, ${y}`



describe("fp-ts", ()=>{
    it("readerable Reader", ()=>{

        const re = getReaderMonad(test, _1, "start")
        chai.assert.equal(re.run(8), "8, start")
    })

    it("readerable ReaderTaskEither async", async ()=>{        
        const re = getReaderTaskEitherMonad(atest, _1, "start")
        const result = await re.run(8)
        chai.assert.equal(result.getOrElse("failed"), "8, start")
    }) 

    it("readering ReaderTaskEither async", async ()=>{        
        const re = readerifyTryCatch(atest, _1, "start")
        const result = await re.run([8, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
        chai.assert.equal(result.getOrElse("failed"), "8, start")
    })

    it("readering ReaderTaskEither chain", async ()=>{
        const task = ask<[number, string, undefined, undefined, undefined, undefined, undefined, undefined], string>()
            .chain(()=>readerifyTryCatch(atest, _1, "start"))
            .chain(()=>readerifyTryCatch(atest, _1, _2))
            .chain(()=>readerifyTryCatch(atest, 10, _2))
    
        const result = await task.run([8, "hello", undefined, undefined, undefined, undefined, undefined, undefined])
        console.log(result.getOrElse("failed"))
    })

    it("readering ReaderTaskEither chain", async ()=>{
        // Define environment type for Reader moand    
        type EnvType = { 1:number, 2:string }

        // Chaining Reader monad w/o cordinating environment type
        const task = ask<ReaderifyRunType<EnvType>, string>()
            .chain(()=>readerifyTryCatch(atest, _1, "start"))   // env: 'number'
            .chain(()=>readerifyTryCatch(atest, _1, _2))        // env: 'number', 'string'
            .chain(()=>readerifyTryCatch(atest, 10, _2))        // env: 'string'
    
        const result = await task.run(readerifyRunArgs({1:8, 2:"hello"}))

        console.log(result.getOrElse("failed"))
    }) 

    it("nullable argument", async ()=>{
        const test = async (a:number, b?:number) => (b) ? a + b : a
        const result = await readerifyTryCatch(test, _1).run(readerifyRunArgs({1:5}))
        chai.assert.equal(result.getOrElse(0), 5)

        const result2 = await readerifyTryCatch(test, _1, 10).run(readerifyRunArgs({1:5}))        
        chai.assert.equal(result2.getOrElse(0), 15)
    })    

    it("ReaderTaskEither object", async ()=>{             
        ask<{ 1:string, 2:number, 3:boolean }, string>()
        .chain(()=>tryCatch(async (n:{ 1:string, 2:number, 3:any })=>{return n}, ()=>"hehe"))  
        .chain(()=>tryCatch(async (n:{ 1:any, 2:number, 3:any })=>{return n}, ()=>"hehe"))  
    })
    
    it("ReaderTaskEither tuple", async ()=>{             
        ask<[string, number, boolean, undefined ], string>()
        .chain(()=>tryCatch(async (n:[string, number, any, any ])=>{return n}, ()=>"hehe"))  
        .chain(()=>tryCatch(async (n:[any, number, any, any])=>{return n}, ()=>"hehe"))
        .run(["hello", 5, true, undefined ])
    }) 

    it("ReaderTaskEither object", ()=>{
        type ENV1 = {
            msg: string
        }
        type ENV2 = {
            msg: string
            id : number    
        }

        ask<ENV2, void>().chain(()=>ask<ENV1, void>().local((e)=>e))
    })
})

