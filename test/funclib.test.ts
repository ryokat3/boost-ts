import * as chai from "chai"
import { partial, _1, _2, _3, _4, _5, _6, _7, _8, bundle, mkmapobj, mergeobj, rot2curry, rot3curry, rot4curry } from "../src/funclib"


describe("funclib", ()=>{

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

    it("bundle", ()=>{

        interface Config {
            dir:string
        }

        const intf = {
            dirname: (config:Config) => config.dir,
            read: (config:Config, name:string) => config.dir + "/" + name,
            write: (config:Config, name:string, content:string) => config.dir + "/" + name + "="  + content
        }
        const bound1 = bundle({ dir:"dir1"}, intf)
        const bound2 = bundle({ dir:"dir2"}, intf)

        chai.assert.equal(bound1.dirname(), "dir1")
        chai.assert.equal(bound2.dirname(), "dir2")

        chai.assert.equal(bound1.read("hehe"), "dir1/hehe")
        chai.assert.equal(bound2.read("hehe"), "dir2/hehe")        
    })

    it("mkmapobj", () => {

        type Box<T> = { value: T }

        function boxify<T>(t: T):Box<T> {
            return { value: t }
        }
        
        const data = {
            name: "John",
            age: 26
        }

        ////////////////////////////////////////////////////////////////
        // Unexpected Case
        const unexpected = Object.entries(data).reduce((acc, [key, value])=>{
            return {
                ...acc,
                [key]: boxify(value)    
            }    
        }, {})
        // unexpected.name is ERROR!!
        chai.assert.equal(Object.keys(unexpected).length, 2)
        
        ////////////////////////////////////////////////////////////////
        // Expected Case

        type BoxMapType<T> = { [P in keyof T]: [T[P], Box<T[P]>] }
        // List all possible types for reuse
        type BoxKeyType = [string, number, boolean, string[], number[]]

        const mapobj = mkmapobj<BoxMapType<BoxKeyType>>()

        const dataBox = mapobj(data, boxify)

        chai.assert.equal(dataBox.name.value, data.name) 
        chai.assert.equal(dataBox.age.value, data.age)
    })

    it("mergeobj new value", () => {
        const result = mergeobj( { a: 1, b: 3 }, { a: 2 })
        chai.assert.equal(result.a, 2)
    })

    it("mergeobj new key", () => {
        const result = mergeobj( { a: { b: 3 } }, { a: { c: 2 } })        
        chai.assert.equal(result.a.b, 3)
        chai.assert.equal(result.a.c, 2)
        
    })
    
    it("mergeobj README example", ()=>{
        const recordA = {
            personal: {
                name: "John",
                age: "26"
            }    
        }
        
        const recordB = {
            personal: {
                age: 26,
                nationality: "American"
            } 
        }
        
        const merged = mergeobj(recordA, recordB)
        chai.assert.equal(merged.personal.age, 26)   
        chai.assert.equal(merged.personal.name, "John")   
        chai.assert.equal(merged.personal.nationality, "American")   
    })

    it(("rot2curry"), ()=>{
        const target = (s:string)=>(n:number)=>s.length + n
        chai.assert.equal(rot2curry(target)(10)("hello"), target("hello")(10))
    })
    
    it(("rot3curry"), ()=>{
        const target = (s:string)=>(n:number)=>(b:boolean)=>s.length + n + ((b)?1:0)
        chai.assert.equal(rot3curry(target)(true)("hello")(10), target("hello")(10)(true))
    })
        
    it(("rot4curry"), ()=>{
        const target = (s:string)=>(n:number)=>(b:boolean)=>(m:number)=>s.length + n + ((b)?1:0) + m
        chai.assert.equal(rot4curry(target)(20)("hello")(10)(true), target("hello")(10)(true)(20))
    }) 
})