const   {generateMessage}           =   require("./utils/message"),
        {generateLocationMessage}   =   require("./utils/message");

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
        // console.log("createMessage :\n",message); // uncomment to see information exchange

        io.emit("newMessage",generateMessage(message.from,message.text));
        callback();
    });

    socket.emit("newMessage",generateMessage("Admin","welcome to chat app"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","new user joined"))
    
    socket.on("createLocationMessage",(cords)=>{
        io.emit("newLocationMessage",generateLocationMessage("Admin",cords.lat,cords.lng ));

    })


    
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });

})


app.use(express.static(publicPath));
const port = process.env.PORT||3000;


server.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
});
