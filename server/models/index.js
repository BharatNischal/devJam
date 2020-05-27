const mongoose=require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;
console.log(process.env.DATABASEURL);
const databaseURL=process.env.DATABASEURL||"mongodb://localhost/ProfileCreator";
console.log(databaseURL);
mongoose.connect(databaseURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log(`Database connected`))
.catch(err => console.log(`Database connection error: ${err.message}`));


module.exports.User=require("./user");
module.exports.Developer = require("./developer");
module.exports.Deliverable = require("./deliverable");
