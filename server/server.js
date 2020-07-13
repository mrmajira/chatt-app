const   path    =   require("path"),
        http    =   require("http");

const   express     =   require("express"),
        socketIO    =   require("socket.io");

const publicPath=path.join(__dirname,"../public")
let app=express();
let server=http.createServer(app);
let io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("neww user connected");

    socket.on("createMessage",(message)=>{
        message.createdAt=new Date().toTimeString();
        // message.createdAt=new Date().getTime();

        // io.emit("newMessage",message)

        socket.broadcast.emit("newMessage",message)
    });

    socket.emit("newMessage",{
        text:`welcome to chat app`,
        date:new Date().toTimeString()
    });
    socket.broadcast.emit("newMessage",{
        text:`user joined server`,
        date:new Date().toTimeString()
    })

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
