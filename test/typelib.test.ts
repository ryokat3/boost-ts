import { Length, SeparateUnion } from "../src/typelib"

describe("typelib", ()=>{
    it("Length", ()=>{

        type Len3 = Length<[number, boolean, string]>
        // @ts-ignore    
        const len3:Len3 = 3 
    })
    
    it("SeparateUnion", ()=>{

        type PrimitiveTypes = string | number | boolean | Date | undefined | null
        // @ts-ignore
        type NotBoolean = SeparateUnion<boolean, PrimitiveTypes> // NotBoolean = string | number | Date | undefined | null
        // @ts-ignore
        type NotNumberString = SeparateUnion<string|number, PrimitiveTypes> // NotNumberString = boolean | Date | undefined | null

        type StateTypes = "init" | "running" | "done"
        // @ts-ignore
        type NotRunning = SeparateUnion<"running", StateTypes> // NotRunning = "init" | "done"
        // @ts-ignore
        type NoChange = SeparateUnion<"unknown", StateTypes> // NoChnage = "init" | "running" | "done"

    })    
})