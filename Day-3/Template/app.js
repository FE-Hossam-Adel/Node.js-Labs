const express = require('express');
const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true});

const path = require('path');
const fs = require('fs');

const app = express();


// app.get('/index.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'FRONT/pages/index.html'))
// })


app.get('*', (req, res, nxt) => {

    if(/(\.html)$/.test(req.url)){
        res.status(200).sendFile(path.join(__dirname, 'FRONT/pages', req.url));
    }
    else
    nxt() 
});

app.get('*', (req, res, nxt) => {

    if(/(\.css)$/.test(req.url))
        {
            // res.writeHead(200,{"content-type":"text/css"})
            res.status(200).sendFile(path.join(__dirname, 'FRONT/css', req.url));
        }
    else
    nxt()
});

app.get('*', (req, res, nxt) => {

    if(/(\.js)$/.test(req.url))
        {
            // res.writeHead(200,{"content-type":"application/javascript"})
            res.status(200).sendFile(path.join(__dirname, 'FRONT/js', req.url));
        }
    else
    nxt()
});

const productSchema = {
    type: "object",
    properties: {
      productName: {type: "string",minLength:3},
      price: {type: 'string',
      pattern: '^[0-9]+$',

    }
    },
    required: ["productName","price"],
    additionalProperties: false,

  }

app.use(express.urlencoded({extended:true}))
app.post('/add-product',(req,res)=>{
    const valid = ajv.validate(productSchema, req.body)
    const errors = {}

    if(ajv.errors?.length){
        ajv.errors.forEach(element => {
            errors[element.instancePath.slice(1)] = element.message;
        });
        
        app.set('err',errors)
        res.redirect('/validation')
    }else{
        app.set('product',req.body)
        res.redirect('/added')
    }

})


app.get('/validation',(req,res)=>{
    res.send(app.get('err'))
})

app.get('/added',(req,res)=>{
    res.send({
        message:"success",
        product:app.get('product')
    })
})
app.listen(3000,x=>console.log(3000))