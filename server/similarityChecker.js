const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
const          express = require('express'),
                app = express();
deepai.setApiKey('3d0a52e5-8f98-4c55-a854-c37b3cda545a');

try{
  (async function() {
      var resp = await deepai.callStandardApi("image-similarity", {
              image1: "https://www.pexels.com/photo/blue-bmw-sedan-near-green-lawn-grass-170811/",
              image2: "https://www.pexels.com/photo/blue-bmw-sedan-near-green-lawn-grass-170811/",
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
