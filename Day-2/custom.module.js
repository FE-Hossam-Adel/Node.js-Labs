const fs = require('fs');
module.exports = {
    readStaticFiles:(file , MIME)=>{
        try{
            let data ;
            if(MIME.includes('image')){
                data = fs.readFileSync(file);
            }else{
                data = fs.readFileSync(file).toString();
            }
            return {status:200,data:data,contentType:MIME};
        }catch(err){
            return {status:404,data:"Not Found!",contentType:"text/plain"}; }
    },
    writeStaticFiles:(file,data)=>{
        try{
            fs.writeFileSync(file,data,"utf8")
        }catch(err){
            console.log(err);
        }
    }
}