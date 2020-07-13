let socket=io();
        



socket.on("newMessage",function(message){
    console.log("new message:\n",message);
})


socket.on("disconnect",function(){
    console.log("disconnected from server");
});
