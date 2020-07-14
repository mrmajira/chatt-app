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

let locationButton= jQuery("#send-location");
locationButton.on("click",function(){
    if(!navigator.geolocation){ 
        return alert("Geolocation not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        socket.emit("createLocationMessage",{
            lng :position.coords.longitude,
            lat :position.coords.latitude
        })
    },function(){
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


