const   {generateMessage}   =   require("./utils/message");

const   path        =   require("path"),
        http        =   require("http"),
        express     =   require("express"),
        socketIO    =   require("socket.io");


const publicPath=path.join(__dirname,"../public")
let app=express();
let server=http.createServer(app);
let io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("neww user connected");

    socket.on("createMessage",(message, callback)=>{
        console.log("createMessage :\n",message);

        io.emit("newMessage",generateMessage(message.from,message.text));
        if(callback)
        {callback("this is from server");}
        callback();
        // socket.broadcast.emit("newMessage",generateMessage(message.from,message.text));
    });

    socket.emit("newMessage",generateMessage("Admin","welcome to chat app"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","new user joined"))

    // socket.on("join",(message)=>{

    //     message.date=new Date().toTimeString();
    //     // let userM = {message};
    //     // let allM = {message};

    //     // userM.message.text=`welcome to server ${userM.message.user}`
    //     // socket.emit("newMessage",userM.message);
    //     // allM.message.text=`${allM.message.user} joined server`

    //     socket.emit("newMessage",{
    //         text:`welcome to server ${message.user}`,
    //         date:message.date
    //     });
    //     socket.broadcast.emit("newMessage",{
    //         text:`${message.user} joined server`,
    //         date:message.date
    //     })
    // });


    
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });

})


app.use(express.static(publicPath));
const port = process.env.PORT||3000;



server.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
});
