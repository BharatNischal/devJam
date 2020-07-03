const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
const          express = require('express'),
                app = express();
const fs = require('fs');
deepai.setApiKey('3d0a52e5-8f98-4c55-a854-c37b3cda545a');

try{
(async function() {
    var resp = await deepai.callStandardApi("image-similarity", {
            image1: "https://res.cloudinary.com/bharatnischal/image/upload/v1568002016/t9l7poh7clueeprm4vra.jpg",
            image2: "https://res.cloudinary.com/bharatnischal/image/upload/v1565425311/vqrejhytby9sjmbict6r.jpg",
    });
    console.log(resp);
})()
}
catch(err){
  console.log(err.message);
}

const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log("Listening on port ",port);
});