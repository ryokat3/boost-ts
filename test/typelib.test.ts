import * as chai from "chai"
import { IsAllTrue, Equals, NotEquals, Length, SelectObject ,FilterObject, UnionToList } from "../src/typelib"


describe("typelib", ()=>{
    it("IsAllTrue", ()=>{
        
        const result:IsAllTrue<[
            Equals<IsAllTrue<[true, true, true, true]>, true>,
            Equals<IsAllTrue<[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]>, true>,
            Equals<IsAllTrue<[]>, true>,
            Equals<IsAllTrue<[boolean]>, false>,
            Equals<IsAllTrue<[false, true, true]>, false>,
            Equals<IsAllTrue<[true, boolean, true]>, false>,
            Equals<IsAllTrue<[true, true, never]>, false>,
            Equals<IsAllTrue<[true, unknown, true]>, false>,
            Equals<IsAllTrue<[true, any, true]>, false>
        ]> = true

        chai.assert.isTrue(result)
    })
    it("Length", ()=>{        
        
        const result:IsAllTrue<[
            Equals<Length<[number, boolean, string]>, 3>,
            Equals<Length<[]>, 0>            
        ]> = true
        
        chai.assert.isTrue(result)
    })
    
    it("SelectObject", ()=>{
    
        type Target1 = {
            str1: string,
            num1: number,
            bool1: boolean,
            str2: string,
            num2: number,
            bool2: boolean            
        }

        const result:IsAllTrue<[
            Equals<SelectObject<Target1, string>, { str1:string, str2:string}>,
            Equals<SelectObject<Target1, number>, { num1:number, num2:number}>,
            Equals<SelectObject<Target1, Date>, { }>
        ]> = true

        chai.assert.isTrue(result)        
     
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

        type Expected = {
            num1: number,
            num2: number,
            bool1: boolean,
            bool2: boolean
        }
        
        const result:IsAllTrue<[
            Equals<FilterObject<Target, string>, Expected>
        ]> = true        
        
        chai.assert.isTrue(result)  
    })

    it("UnionToList", ()=>{
        type Target = {
            key1: String,
            key2: string,            
            key3: number
        }
        const result:IsAllTrue<[
            Equals<UnionToList<keyof Target>, ["key1", "key2", "key3"]>,
            NotEquals<UnionToList<keyof Target>, ["key2", "key3", "key1"]>,
        ]> = true
        
        chai.assert.isTrue(result)
    })
})