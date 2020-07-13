let socket=io();
        
socket.on("connect",function(){
    console.log("connected to server");

    // socket.emit("createEmail",{
    //     to:"someOne@someMail.com im user sending this",
    //     text:"some text"
    // })
})
socket.on("disconnect",function(){
    console.log("disconnected from server");
});
// socket.on("newEmail",function(email){
//     console.log("new Email\n",email);
// })

socket.on("newMessage",function(message){
    console.log("new message:\n",message);

    socket.emit("createMessage",{
        text:"some random text from user"
    })
})
