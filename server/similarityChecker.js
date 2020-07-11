const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
const          express = require('express'),
                app = express();
const fs = require('fs');
var https = require('https');
deepai.setApiKey('3d0a52e5-8f98-4c55-a854-c37b3cda545a');

// try{
// (async function() {
//     var resp = await deepai.callStandardApi("image-similarity", {
//             image1: "",
//             image2: "https://firebasestorage.googleapis.com/v0/b/devjam-cb9e8.appspot.com/o/images%2F1593799019960Screenshot%20from%202020-07-03%2012-35-05.png?alt=media&token=225aff14-eab3-47c7-8f7d-c60f4ea9e495",
//     });
//     console.log(resp);
// })()
// }
// catch(err){
//   console.log(err.message);
// }

saveImageToDisk("https://firebasestorage.googleapis.com/v0/b/devjam-cb9e8.appspot.com/o/images%2F1593799019960Screenshot%20from%202020-07-03%2012-35-05.png?alt=media&token=225aff14-eab3-47c7-8f7d-c60f4ea9e495",'./abc.png');

const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log("Listening on port ",port);
});

function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function(response) {
    console.log(response.headers['content-type']);
    response.pipe(file);
});
}
