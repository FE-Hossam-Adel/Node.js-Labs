const http = require('http');
const fs = require('fs');
const { readStaticFiles,writeStaticFiles } = require("./custom.module");
let {data:fileBefore} = readStaticFiles(`pages/welcome.html`,'text/html');

http.createServer((req,res)=>{
  switch(req.method){
    case 'GET':
      if(/(\.css)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`css/${req.url.slice(req.url.lastIndexOf('/'))}` , "text/css")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.js)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`js/${req.url.slice(req.url.lastIndexOf('/'))}` , "text/js")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.html)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`pages/${req.url.slice(req.url.lastIndexOf('/'))}` , "text/html")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.ico)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`images/${req.url.slice(req.url.lastIndexOf('/'))}` , "image/x-icon")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.jpg|\.jpeg)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`images/${req.url.slice(req.url.lastIndexOf('/'))}` , "image/jpeg")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.png)$/.test(req.url)){
        const {status , data , contentType} = readStaticFiles(`images/${req.url.slice(req.url.lastIndexOf('/'))}` , "image/png")
        res.writeHead(status , {"content-type":contentType});
        res.end(data)
      }else if(/(\.html)/.test(req.url)){
        const uname = req.url.replace(/\+/g ," ").split('?')[1].split("=")[1];
        let file = fileBefore;
        writeStaticFiles(`pages/${req.url.slice(req.url.lastIndexOf('/'),req.url.lastIndexOf('?'))}`,file.replace(' { name } ',uname))
        const {status , data , contentType} = readStaticFiles(`pages/${req.url.slice(req.url.lastIndexOf('/'),req.url.lastIndexOf('?'))}` , "text/html")
        res.writeHead(status , {"content-type":contentType});
        res.end(data) 
      }else{
        if(req.url === "/users"){
          let {data} =  readStaticFiles(`DB/db.json` , "applicaion/json")
          res.end(data)
        }
      }

      
    break;

    case 'POST':
      if(req.url === "/addUser"){
        let data = "";
        req.on('data',(chunk)=>{
          data+=chunk;
        })
        req.on('end',()=>{
          let DB =  readStaticFiles(`DB/db.json` , "applicaion/json")
          let list = JSON.parse(DB.data);
          list.push(parseStringToObject(decodeURIComponent(data).replace(/=/g , ':').replace(/&/g,',')));
          writeStaticFiles(`DB/db.json`,JSON.stringify(list))
          res.writeHead(302, {
            'Location': '/users'
          });
          res.end();
                })
      }
    break;
  }
}).listen(3000,()=>{
  console.log("http://localhost:3000");
})


function parseStringToObject(dataString) {
  // Split the string into an array of key-value pairs
  const keyValuePairs = dataString.split(',');

  // Initialize an empty object to store parsed data
  const parsedObject = {};

  // Iterate through each key-value pair
  keyValuePairs.forEach(pair => {
      // Split the pair into key and value
      const [key, value] = pair.split(':');

      // Remove any leading/trailing whitespace from key and value
      const cleanedKey = key.trim();
      const cleanedValue = value.trim();

      // Add the key-value pair to the parsed object
      parsedObject[cleanedKey] = cleanedValue;
  });

  return parsedObject;
}