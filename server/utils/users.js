class Users{
    constructor(){
        this.users=[]
    }

    addUser(id, name, room){
        let user={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        let found = this.getUser(id);
        if(found){
            this.users=this.users.filter((user)=>user.id!==id)
        }
        return found;
    }
    getUser(id){
        return this.users.filter((user)=>user.id===id)[0]
    }
    getUserList(room){
        let results=this.users.filter((user)=>user.room===room)
        let namesArray= results.map((user)=>user.name)
        return namesArray;
   }
}


module.exports={Users}