let generateMessage=(from,text)=>{
    message={
        from,
        text,
        date:new Date().toDateString()
    }   
    return message;
}
let generateLocationMessage=(from,lat,lng)=>{
    message={
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        date:new Date().getTime()
    }   
    return message;
}

module.exports={generateMessage,generateLocationMessage}


