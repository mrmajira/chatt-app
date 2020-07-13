const expect = require("expect");
const { generateMessage } = require("./message");

describe("generateMessage",()=>{

    it("should return a valid mssage",()=>{
        expect(generateMessage("me","hey")).toMatchObject({
            from:"me",
            text:"hey"
        });
        expect(generateMessage("f","t").date).toBeTruthy();
    })
})
