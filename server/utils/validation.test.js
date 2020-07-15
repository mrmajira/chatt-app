const  expect = require("expect");
const { isRealString } = require("./validation");

describe("isRealString",()=>{
    it("should reject empty string",()=>{ 
        expect(isRealString("  ") ).toBeFalsy()
    })

    it("should reject non string",()=>{
        expect(isRealString(4) ).toBeFalsy()
    })

    it("should allow non-empty string",()=>{
        expect(isRealString("t") ).toBeTruthy()
    })
})