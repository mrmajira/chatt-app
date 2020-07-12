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

    socket.on("disconnect",(socket)=>{
        console.log("user disconnected");
    });
})


app.use(express.static(publicPath));
const port = process.env.PORT||3000;



server.listen(port,()=>{
    console.log(`server listening on port : ${port}`);
});
