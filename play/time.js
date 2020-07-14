const moment    =   require("moment");

let createdAt= 696969;
let date =moment(createdAt);
timeStamp=moment().valueOf()
console.log(timeStamp);
// date.subtract(1,"h")
console.log(date.format("k:mm:ss dddd Do-MMM-Y"));

