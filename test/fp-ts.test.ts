import * as chai from "chai"
import { _1, _2, _3, _4, PartialBindingType } from "../src/partial"
import { readerable, ReaderEnvType, OverallEnv } from "../src/readerlib"
import { ReturnValueType } from "../src/functionlib"
import { Reader } from "fp-ts/lib/Reader"
import { ReaderTaskEither, tryCatch, ask } from "fp-ts/lib/ReaderTaskEither"


export function readerify<Func extends (...args:any[])=>any, Args extends PartialBindingType<Func> >(func:Func, ...args:Args):Reader<ReaderEnvType<Func, Args>,ReturnType<Func>> {    
    return new Reader(readerable(func, ...(args as unknown[])))
}


export function readerTaskify<Func extends (...args:any[])=>Promise<any>, Args extends PartialBindingType<Func> >(func:Func, ...args:Args):ReaderTaskEither<ReaderEnvType<Func, Args>, string, ReturnValueType<Func>> {    
    return tryCatch(readerable(func, ...(args as unknown[])), (err:any)=>`${err} ${func.name}`)
}


const test = (x:number, y:string):string=> `${x}, ${y}`
const atest = async (x:number, y:string):Promise<string>=> `${x}, ${y}`


describe("fp-ts", ()=>{
    it("readerable Reader", ()=>{

        const re = readerify(test, _1, "start")
        chai.assert.equal(re.run(8), "8, start")
    })

    it("readerable ReaderTaskEither async", async ()=>{        
        const re = readerTaskify(atest, _1, "start")
        const result = await re.run(8)
        chai.assert.equal(result.getOrElse("failed"), "8, start")
    }) 

    it("readerable ReaderTaskEither async", async ()=>{             
        ask<OverallEnv<[string, number, boolean ]>, string>()
            .chain(()=>tryCatch(async (n:[string, number])=>{}, ()=>"hehe"))
            .chain(()=>tryCatch(async (n:[string])=>{}, ()=>"hehe"))
            .chain(()=>tryCatch(async (n:[string, number, boolean])=>{}, ()=>"hehe"))   
    })        
})

