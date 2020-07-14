const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage",()=>{

    it("should return a valid mssage",()=>{
        expect(generateMessage("me","hey")).toMatchObject({
            from:"me",
            text:"hey"
        });
        expect(typeof generateMessage("f","t").date).toBe("number");
    });
});

describe("generateLocationMessage",()=>{
    it("should create a valid location message",()=>{
        let lat=69;
        let lng=69;
        let message=generateLocationMessage("me",lat,lng);

        expect (message).toMatchObject({
            from:"me",
            url:`https://www.google.com/maps?q=69,69`
        });
        expect(typeof message.date).toBe("number");
    });
});
