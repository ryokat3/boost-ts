import * as chai from "chai"
import { partial, _1, _2, _3, _4 } from "../src/boost-ts"


describe("boost-ts", ()=>{

    const sub = (a:number, b:number):number => a - b
    const mixed = (a:boolean, b:number, c:boolean, d:string|number, e:string|boolean):string => `${(a) ? (b) : (c) ? d : e}`
    

    it("partial bind argument", ()=>{        
        const sub5 = partial(sub, _1, 5)
        chai.assert.equal(sub5(20), 15)
    })

    it("partial swap argument", ()=>{        
        const sub_reversed = partial(sub, _2, _1)
        chai.assert.equal(sub_reversed(5, 20), 15)
    })
    
    it("partial mixed", ()=>{        
        const mixed_bound = partial(mixed, _2, 5, true, _1, false)
        chai.assert.equal(mixed_bound("bound", false), "bound")
    })
})