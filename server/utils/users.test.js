const expect = require("expect");

const {Users} = require("./users");
const users = require("./users");

describe("User",()=>{

    let testUsers;
    beforeEach(()=>{
        testUsers=new Users();
        testUsers.users=[{
            id:'1',
            name:'user one',
            room:'room 1'
        },{
            id:'2',
            name:'user two',
            room:'room 2'
        },{
            id:'3',
            name:'user three',
            room:'room 1'
        }]

    });

    it("should add valid user to users array",()=>{
        let user={
            name:"mr",
            id:"someid",
            room:"some room"
        }
        MyUsers=new Users();
        resUser=MyUsers.addUser(user.id,user.name,user.room)
        expect(MyUsers.users).toEqual([user])
    })
    it("should remove user from users array",()=>{
        let resUser=testUsers.removeUser("1");
        expect(testUsers.users[0]).not.toEqual(resUser);
        expect(resUser.id).toBe("1");
        expect(testUsers.users.length).toBe(2);

    })
    it("should not remove user",()=>{
        let resUser=testUsers.removeUser("5");
        expect(resUser).toBeUndefined();
        expect(testUsers.users.length).toBe(3);

    })
    it("should get user from users array",()=>{
        let resUser=testUsers.getUser("1");
        expect(testUsers.users[0]).toEqual(resUser);
        expect(testUsers.users.length).toBe(3);

    })
    it("should not get user from users array",()=>{
        let resUser=testUsers.getUser("5");
        expect(resUser).toBeUndefined();
        expect(testUsers.users.length).toBe(3);

    })
    it("should get users list in a room",()=>{
        let resUsers=testUsers.getUserList("room 1");
        expect(resUsers).toEqual([
            testUsers.users[0].name,
            testUsers.users[2].name
        ]);
        expect(resUsers.length).toBe(2);

    })


});



