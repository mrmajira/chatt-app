const   {generateMessage}           =   require("./utils/message"),
        {generateLocationMessage}   =   require("./utils/message"),
        {isRealString}              =   require("./utils/validation"),
        {Users}                     =   require("./utils/users");
        
const   path        =   require("path"),
        http        =   require("http"),
        express     =   require("express"),
        socketIO    =   require("socket.io");


const publicPath=path.join(__dirname,"../public")
let app=express();
let server=http.createServer(app);
let io = socketIO(server);
let allUsers=new Users();

io.on("connection",(socket)=>{
    console.log("neww user connected");

    socket.on("join",(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name & Room name are required")
        }

        socket.join(params.room);
        allUsers.removeUser(socket.id);
        allUsers.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit("updateUserList",allUsers.getUserList(params.room))

        socket
        .emit("newMessage",generateMessage("Admin",`welcome to chat app, ${params.name}`));
        socket.broadcast.to(params.room)
        .emit("newMessage",generateMessage("Admin",`${params.name} joined`))
    
        callback();
    });
    

    socket.on("createMessage",(message, callback)=>{
        // console.log("createMessage :\n",message); // uncomment to see information exchange
        let user = allUsers.getUser(socket.id);
        if(user && isRealString(message.text) ){
            io.to(user.room)
            .emit("newMessage",generateMessage(user.name,message.text));
        }
        callback();
    });
    
    socket.on("createLocationMessage",(cords)=>{
        let user = allUsers.getUser(socket.id);

        if(user){
            io.to(user.room).emit("newLocationMessage",
            generateLocationMessage(user.name,cords.lat,cords.lng ));
        }
    });


    
    socket.on("disconnect",()=>{
        console.log("user disconnected");
        let user=allUsers.removeUser(socket.id)

        if(user){
            io.to(user.room).emit("newMessage",
            generateMessage("Admin",`${user.name} left the chat`));
            io.to(user.room).emit("updateUserList",
            allUsers.getUserList(user.room));
        }
    });

})


app.use(express.static(publicPath));
const port = process.env.PORT||3000;


server.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
});
