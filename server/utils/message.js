const   moment  = require("moment");
let     date    = moment();

let generateMessage=(from,text)=>{
    message={
        from,
        text,
        date:moment().valueOf()
    }   
    return message;
}
let generateLocationMessage=(from,lat,lng)=>{
    message={
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        date:moment().valueOf()
    }   
    return message;
}

module.exports={generateMessage,generateLocationMessage}


