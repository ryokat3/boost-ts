import { Length } from "../src/typelib"

describe("typelib", ()=>{
    it("Length", ()=>{

        type Len3 = Length<[number, boolean, string]>
        // @ts-ignore    
        const len3:Len3 = 3 
    })   
})