import * as chai from "chai"
import { partial, _1, _2, _3, _4, _5, _6, _7, _8 } from "../src/partial"


describe("boost-ts", ()=>{

    const sub = (a:number, b:number):number => a - b
    const mixed = (a:boolean, b:number, c:boolean, d:string|number, e:string|boolean):string => `${(a) ? (b) : (c) ? d : e}`
    

    it("partial bind argument", ()=>{        
        const subP = partial(sub, _1, 5)
        chai.assert.equal(subP(20), 15)
    })

    it("partial swap argument", ()=>{        
        const subP = partial(sub, _2, _1)
        chai.assert.equal(subP(5, 20), 15)
    })
    
    it("partial mixed", ()=>{        
        const mixedP = partial(mixed, _2, 5, true, _1, false)
        chai.assert.equal(mixedP("bound", false), "bound")
    })
})