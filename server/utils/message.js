let generateMessage=(from,text)=>{
    message={
        from,
        text,
        date:new Date().toTimeString()
    }   
    return message;
}

module.exports={generateMessage}


