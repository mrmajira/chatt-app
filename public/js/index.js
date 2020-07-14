let socket=io();
        
// socket.on("connect",function(){
//     socket.emit("join",{user:"test user"})
// });

socket.on("newMessage",function(message){
    console.log("new message:\n",message);
    let li= jQuery("<li></li>");
    // li.text(`- ${message.from}: ${message.text} | ${message.date}`);
    li.text(`- ${message.from}: ${message.text}`);

    jQuery("#messages").append(li);
})


socket.on("disconnect",function(){
    console.log("disconnected from server");
});

let messageTextBox= jQuery("[name=message]")
jQuery("#message-form").on("submit",function(e){
    e.preventDefault();

    socket.emit("createMessage",{
        from:"Anonymous User",
        text:messageTextBox.val()
    },function(){
       messageTextBox.val("");
    });
});

let locationButton= jQuery("#send-location");
locationButton.on("click",function(){
    if(!navigator.geolocation){ 
        return alert("Geolocation not supported by your browser");
    }
    locationButton.attr("disabled","disabled").text("Sendin location ..");

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send location");;
        socket.emit("createLocationMessage",{
            lng :position.coords.longitude,
            lat :position.coords.latitude
        })
    },function(){
        locationButton.removeAttr("disabled").text("Send location");;
        alert("Unable to fetch location");
    });
});

socket.on("newLocationMessage",function(message){
    let li= jQuery("<li></li>");
    let a= jQuery("<a target='_blank'>My Current location</a>");
    let str = jQuery("<strong></strong>");

    li.text(`- ${message.from}: `);
    a.attr("href",` ${message.url}`);

    li.append(a); 
    // jQuery("#messages").append(str); 
    jQuery("#messages").append(li); 
})


