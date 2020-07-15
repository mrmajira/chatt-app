let socket  =   io();
let date    =   moment;

function scrollToBottom(send){
    // slectors
    let messages=jQuery("#messages");
    let newMessage=messages.children("li:last-child");
    // heights
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    // scrollBottom=scrollHeight-(scrollTop+clientHeight)

    if(send){messages.scrollTop(scrollHeight)}
    else if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        // console.log("should scroll");
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect",function(){
    let params=jQuery.deparam(window.location.search)
    console.log(params);

    socket.emit("join", params, function(err){
        if(err){
            console.log(err);
            alert(err);
            window.location.href="/"
        }else{
            console.log("no err");
        }
    })
})


socket.on("newMessage",function(message){
    let formattedTime=date(message.date).subtract(1,"h").format("LT");
    let template = jQuery("#message-template").html();
    let html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        date:formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom(false);
})

socket.on("newLocationMessage",function(message){
    let formattedTime = date(message.date).subtract(1,"h").format("LT");
    let template = jQuery("#location-message-template").html();
    let html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        text:"Anon. User current location",
        date:formattedTime
    })

    jQuery("#messages").append(html);
    scrollToBottom(false);
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
    scrollToBottom(true);
});

let locationButton= jQuery("#send-location");
locationButton.on("click",function(){
    if(!navigator.geolocation){ 
        return alert("Geolocation not supported by your browser");
    }
    locationButton.attr("disabled","disabled").text("Sending location ..");

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send location");;
        socket.emit("createLocationMessage",{
            lng :position.coords.longitude,
            lat :position.coords.latitude
        });
    },function(){
        locationButton.removeAttr("disabled").text("Send location");;
        alert("Unable to fetch location");
    });
    scrollToBottom(true);
});

socket.on("updateUserList",function(usersList){
    let ul=jQuery("<ul></ul>");
    let users=jQuery("#users");

    usersList.forEach((username)=>{
        ul.append(jQuery("<li></li>").text(username));
    });
    users.html(ul);


})


