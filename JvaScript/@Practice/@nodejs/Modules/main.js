// const http = require('node:http');
// // const fs = require(`fs`)
// import http from "http"





// const hostname = `127.0.0.1`;

// const port = 3000


// const server = http.createServer((req, res) => {
//     res.statusCode = 200; // OK
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>hello rokey</>');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });





// import {a} from "./mymodule.js"

// console.log(a)


// "type": "module",




// import rokey from "./mymodule.js"
// console.log(rokey)





// (function(exports, require, module, __filename, __dirname) {

//     // Module code actually lives here
  
//   });




const a = require("./mymodule2.js");

console.log(a, __dirname, __filename);