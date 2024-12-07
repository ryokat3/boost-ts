import * as chai from "chai"
import { expectType, expectNotType } from "tsd"
import { Length, SelectObject ,FilterObject, UnionToList } from "../src/typelib"

describe("typelib", ()=>{
    it("Length", ()=>{

        type Len3 = Length<[number, boolean, string]>
        
        const len3:Len3 = 3

        chai.assert.equal(len3, 3)        
    })
    
    it("SelectObject", ()=>{
        type Target = {
            str1: string,
            num1: number,
            bool1: boolean,
            str2: string,
            num2: number,
            bool2: boolean            
        }

        const expected = {
            str1: "hello",
            str2: "world"
        }

        
        const value:SelectObject<Target, string> = expected

        chai.assert.equal(value, expected)        
    }) 
    
    it("FileterObject", ()=>{
        type Target = {
            str1: string,
            num1: number,
            bool1: boolean,
            str2: string,
            num2: number
            bool2: boolean
        }

        const expected = {
            num1: 1,
            num2: 2,
            bool1: true,
            bool2: false
        }
        
        const value:FilterObject<Target, string> = expected
        
        chai.assert.equal(value, expected)  
    })

    it("UnionToList", ()=>{
        const target = {
            key1: "value1",
            key2: "value2",            
            key3: 3
        }
        const expected:UnionToList<keyof typeof target> = ["key1", "key2", "key3"]
        

        expectType<["key1", "key2", "key3"]>(expected)
        expectNotType<["key2", "key3", "key1"]>(expected)        
    })
})