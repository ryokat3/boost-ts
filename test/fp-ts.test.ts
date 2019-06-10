import * as chai from "chai"
import { _1, _2, _3, _4, PHArg } from "../src/partial"
import { readerable, ReaderEnvType } from "../src/readerlib"
import { Reader } from "fp-ts/lib/Reader"


export function readerify<Func extends (...args:any[])=>any>
    (func:Func):Reader<ReaderEnvType<Func,[]>,ReturnType<Func>>    
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>>
    (func:Func, a1:A1):Reader<ReaderEnvType<Func,[A1]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>>
    (func:Func, a1:A1, a2:A2):Reader<ReaderEnvType<Func,[A1,A2]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>>
    (func:Func, a1:A1, a2:A2):Reader<ReaderEnvType<Func,[A1,A2]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>>
    (func:Func, a1:A1, a2:A2, a3:A3):Reader<ReaderEnvType<Func,[A1,A2,A3]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4):Reader<ReaderEnvType<Func,[A1,A2,A3,A4]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5):Reader<ReaderEnvType<Func,[A1,A2,A3,A4,A5]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6):Reader<ReaderEnvType<Func,[A1,A2,A3,A4,A5,A6]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7):Reader<ReaderEnvType<Func,[A1,A2,A3,A4,A5,A6,A7]>,ReturnType<Func>>
export function readerify<Func extends (...args:any[])=>any,
    A1 extends PHArg<Func,0>, A2 extends PHArg<Func,1>, A3 extends PHArg<Func,2>, A4 extends PHArg<Func,3>,
    A5 extends PHArg<Func,4>, A6 extends PHArg<Func,5>, A7 extends PHArg<Func,6>, A8 extends PHArg<Func,7>>
    (func:Func, a1:A1, a2:A2, a3:A3, a4:A4, a5:A5, a6:A6, a7:A7, a8:A8):Reader<ReaderEnvType<Func,[A1,A2,A3,A4,A5,A6,A7,A8]>,ReturnType<Func>>

export function readerify(func:(...args:unknown[])=>unknown, ...args:unknown[]):Reader<unknown, unknown>
export function readerify(func:(...args:any[])=>any, ...args:any[]):Reader<any, any> {
    return new Reader(readerable(func, ...args))
}

const test = (x:number, y:string)=> `${x}, ${y}`

describe("fp-ts", ()=>{
    it("readerable getReader", ()=>{

        const re = readerify(test, _1, "start")

        chai.assert.equal(re.run(8), "8, start")

    })
})
