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

    // socket.emit("newEmail",{
    //     from:"mista ",
    //     text:"hey sup this my 1st mail, from server",
    //     createdAt:6969
    // });
    // socket.on("createEmail",(newEmail)=>{
    //     console.log("createEmail\n",newEmail);
    // });

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });

    // newMessage & createMessage

    socket.emit("newMessage",{
        text:"chat test1",
        createdAt:new Date().toString()
    })
    
    socket.on("createMessage",(message)=>{
        console.log(`New Message - Date:${new Date().toString()}`);
        console.log(message);
    })
})


app.use(express.static(publicPath));
const port = process.env.PORT||3000;



server.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
});
