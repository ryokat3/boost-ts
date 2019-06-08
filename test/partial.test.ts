import * as chai from "chai"
import { partial, _1, _2, _3, _4 } from "../src/partial"
import { partialX, _X1, _X2, _X3, _X4 } from "../src/partial"


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

    it("partialX bind argument", ()=>{        
        const subX = partialX(sub, _1, _X1)
        chai.assert.equal(subX(5)(20), 15)
    })

    it("partialX swap argument", ()=>{        
        const subX = partialX(sub, _2, _1)
        chai.assert.equal(subX()(5, 20), 15)
    })

    it("partialX swap argumentX", ()=>{        
        const subX = partialX(sub, _X2, _X1)
        chai.assert.equal(subX(5, 20)(), 15)
    })

    it("partialX mixed", ()=>{        
        const mixedX = partialX(mixed, _2, _X2, true, _1, _X1)
        chai.assert.equal(mixedX(false, 5)("bound", false), "bound")
    })
})