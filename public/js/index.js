let socket=io();
        
// socket.on("connect",function(){
//     socket.emit("join",{user:"test user"})
// });

socket.on("newMessage",function(message){
    console.log("new message:\n",message);
    let li= jQuery("<li></li>");
    li.text(`- ${message.from}: ${message.text} | ${message.date}`);

    jQuery("#messages").append(li);
})


socket.on("disconnect",function(){
    console.log("disconnected from server");
});

jQuery("#message-form").on("submit",function(e){
    e.preventDefault();

    socket.emit("createMessage",{
        from:"Browser User",
        text:jQuery("[name=message]").val()
    },function(){});
});