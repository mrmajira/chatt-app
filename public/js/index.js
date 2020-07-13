let socket=io();
        
// socket.on("connect",function(){
//     socket.emit("join",{user:"test user"})
// });


socket.on("newMessage",function(message){
    console.log("new message:\n",message);
})


socket.on("disconnect",function(){
    console.log("disconnected from server");
});
