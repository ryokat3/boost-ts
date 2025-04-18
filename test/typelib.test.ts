import * as chai from "chai"
import { IsAllTrue, Equals, NotEquals, None, Length, Tail, Unshift, SelectObject ,FilterObject, UnionTail, UnionPop, UnionToList, KeyPathList } from "../src/typelib"


describe("typelib", ()=>{

    it("Equals, NotEquals", ()=>{
        const result:IsAllTrue<[
            NotEquals<any, true>,
            NotEquals<true, unknown>,
            NotEquals<any, unknown>,
            NotEquals<any, never>,
            NotEquals<any, null>,            
            NotEquals<()=>any, ()=>null>,            
            NotEquals<(x:any)=>void, (x:null)=>unknown>,                        
            Equals<any, any>,            
            Equals<unknown, unknown>,            
        ]> = true

        chai.assert.isTrue(result)        
    })
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
    it("Tail", ()=>{

        const result:IsAllTrue<[
            Equals<Tail<[string, number]>, number>,
            Equals<Tail<[string, number, "hello"]>, "hello">,
            Equals<Tail<[]>, None>
        ]> = true

        chai.assert.isTrue(result)
    })
    it("Unshift", ()=>{

        const result:IsAllTrue<[
            Equals<Unshift<[string, number]>, [string]>,
            Equals<Unshift<[string, "hello", number]>, [string, "hello"]>,
            Equals<Unshift<[string]>, []>,
            Equals<Unshift<[]>, []>,
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
    it("TailUnion", ()=>{
        const result:IsAllTrue<[
            Equals<UnionTail<string|number>, number>,
            Equals<UnionTail<string>, string>,
            Equals<UnionTail<boolean>, true>,
            Equals<UnionTail<1|2|3|4>, 4>
        ]> = true
        
        chai.assert.isTrue(result)
    }),
    it("UnionPop", ()=>{
        const result:IsAllTrue<[
            Equals<UnionPop<string|number>, string>,
            Equals<UnionPop<string>, never>,
            Equals<UnionPop<boolean>, false>,
            Equals<UnionPop<1|2|3|4>, 1|2|3>
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
            Equals<UnionToList<keyof {}>, []>
        ]> = true
        
        chai.assert.isTrue(result)
    })
    it("KeyPathList", ()=>{
        type Target = { "key1": { "key2": string|number, "key3": number}, "key4": null}

        const result:IsAllTrue<[            
            Equals<KeyPathList<Target>[".key1.key2"], string|number>,
            Equals<KeyPathList<Target>[".key1.key3"], number>,
            Equals<KeyPathList<Target>[".key4"], null>,
            Equals<Length<UnionToList<keyof KeyPathList<Target>>>, 3>
        ]> = true
                
        chai.assert.isTrue(result)
    })
})