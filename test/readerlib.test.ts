import * as chai from "chai"
import { readerable, readerify } from "../src/readerlib"
import { _1, _2, _3, _4, _X1, _X2, _X3, _X4 } from "../src/partial"
import { Reader } from "fp-ts/lib/Reader"


const test = (x:number, y:string)=> `${x}, ${y}`
const test2 = (x:number, y:string, z:string)=> `${x}, ${y}, ${z}`
const newReader = <E,A>(run:(e:E)=>A)=>{ return new Reader(run) }



describe("readerlib", ()=>{

    it ("readerable arg#0", ()=>{
        const func = readerable(()=>5)    
        chai.assert.equal(func(), 5)
    })

    it ("readerable arg#1", ()=>{
        const func = readerable((a:number)=>a, _1)        
        chai.assert.equal(func(6), 6)
    })

    it("readerable basic", ()=>{        
        const func = readerable(test, _1, "hello")
        chai.assert.equal(func(1), "1, hello")
    }) 

    it("readerable tupled", ()=>{        
        const func = readerable(test, _1, _2)
        chai.assert.equal(func([1, "hello"]), "1, hello")
    })

    it("readerable Reader basic", ()=>{        
        const reader = newReader(readerable(test, _1, "hello"))
        chai.assert.equal(reader.run(1), "1, hello")
    })

    it("readerable Reader tupled", ()=>{        
        const reader = newReader(readerable(test, _1, _2))
        chai.assert.equal(reader.run([1, "hello"]), "1, hello")
    })
   
    it("readerable Reader chained", ()=>{
        const result = newReader(readerable(test, _1, "start"))
            .chain((x:string)=>newReader(readerable(test, _1, x)))
            .chain((x:string)=>newReader(readerable(test, _1, x)))            
            .run(5)
        chai.assert.equal(result, "5, 5, 5, start")
    })

       
    it("readerable Reader local", ()=>{
        const pickNum = (tup:[number, string])=>tup[0]

        const result = newReader(readerable(test, _1, "start")).local(pickNum)
            .chain((x:string)=>newReader(readerable(test, _1, x)).local(pickNum))  
            .chain((x:string)=>newReader(readerable(test2, _1, _2, x)))            
            .chain((x:string)=>newReader(readerable(test, _1, x)).local(pickNum))
            .chain((x:string)=>newReader(readerable(test, _1, x)).local(pickNum))
            .run([5, "end"])
        chai.assert.equal(result, "5, 5, 5, end, 5, 5, start")
    })

    it("readerable Reader local 2", ()=>{
        const pickNum = (tup:[number, string])=>tup[0]

        const result = newReader(readerable(test, _1, "start"))
            .chain((x:string)=>newReader(readerable(test, _1, x)))
            .local(pickNum)
            .chain((x:string)=>newReader(readerable(test2, _1, _2, x)))            
            .chain((x:string)=>newReader(readerable(test, _1, x))
                .chain((x:string)=>newReader(readerable(test, _1, x))).local(pickNum))
            .run([5, "end"])
        chai.assert.equal(result, "5, 5, 5, end, 5, 5, start")
    })  
    
    it("reading", ()=>{
        const func1 = (a:number, b:string, c:boolean, d?:string, e?:number) => `${a}, ${b}, ${c}, ${d}, ${e}`
        const func2 = readerify(func1, 5, _3, _2, _1, _4)
        chai.assert.equal(func2(["hello", true, "bye", 5, undefined, undefined, undefined, undefined]), "5, bye, true, hello, 5")
    }) 
})