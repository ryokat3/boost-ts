import * as chai from "chai"
import { bundle } from "../src/bundle"

interface Config {
    dir:string
}

describe("bundle", ()=>{
    it("simple", ()=>{

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
})