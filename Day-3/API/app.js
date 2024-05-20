const express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors:true});

const app = express();
let allProducts= [];


app.get('/products',(req,res)=>{
    res.status(200).send(allProducts)
})

app.get('/products/:id',(req,res)=>{
    const product = allProducts.find((ele)=>{
        return ele.id == req.params.id;
    })
    if(product)
    res.status(200).send({message:"success", product})
    else
    res.status(404).send({message:"not found"})
})

const productSchema = {
    type: "object",
    properties: {
      productName: {type: "string",minLength:3},
      price: {type: 'integer',
    }
    },
    required: ["productName","price"],
    additionalProperties: false,

  }

  app.use(express.json())
  app.post('/products',(req,res,nxt)=>{
      const valid = ajv.validate(productSchema, req.body)
      const errors = {}
  
      if(ajv.errors?.length){
          ajv.errors.forEach(element => {
              errors[element.instancePath.slice(1)] = element.message;
          });
          
         res.send({message:"invalid data",errors})
      }else{
        req.body.id =(allProducts.length)?(allProducts[allProducts.length-1].id+1):1;            
          nxt()
      }
  
  },(req,res)=>{
    allProducts.push(req.body)
    res.send(allProducts)
  })
  

  app.put('/products/:id',(req,res)=>{
    let updated;
     allProducts = allProducts.map((ele)=>{
        // return ele.id == req.params.id;
        if(ele.id == req.params.id){
            updated = {...ele,...req.body};
           return updated;
        }
        return ele;
    })
    if(updated)
    res.status(200).send({message:"success", product:updated})
    else
    res.status(404).send({message:"not found"})
})

app.delete('/products/:id',(req,res)=>{
    let deletedEle;
     allProducts = allProducts.filter((ele)=>{
        if(ele.id != req.params.id){
           return ele;
        }
        deletedEle =ele;
    })
    if(deletedEle)
    res.status(200).send({message:"success", product:deletedEle})
    else
    res.status(404).send({message:"not found"})
})
app.listen(3000,()=>{
    console.log(3000);
})