const nodeHtmlToImage = require('node-html-to-image');
 
nodeHtmlToImage({
  output: './image.png',
  html: '<html><style> h1{color:red;} </style><body><h1>Hello world!</h1></body></html>'
})
  .then(() => console.log('The image was created successfully!'))