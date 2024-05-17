const http = require('http');
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
      }

      
    break;

    case 'POST':
    break;
  }
}).listen(3000,()=>{
  console.log("http://localhost:3000");
})


