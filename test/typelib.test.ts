import * as chai from "chai"
import { Length } from "../src/typelib"

describe("typelib", ()=>{
    it("Length", ()=>{
        type Len3 = Length<[number, boolean, string]>
        const len3:Len3 = 3        
        chai.assert.equal(len3, 3)
    })
    
})