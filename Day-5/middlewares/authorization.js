import config from "config";
import jwt from "jsonwebtoken";

export default function authorization(roles){
    return (req,res,nxt)=>{
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assuming it's in the format 'Bearer <token>'
        try {
          const decoded = jwt.verify(token, config.get("token.secretKey")); // Replace 'your_secret_key' with your actual secret key
          if( Array.isArray(roles) && roles.includes(decoded.role)  ) return nxt();
          else return res.send({message:"Access Denied!"})
        } catch (err) {
          return res.send({message:"Access Denied!"})
        }
    } else {
      return    res.send({message:"Access Denied!"})
    }
  }
}