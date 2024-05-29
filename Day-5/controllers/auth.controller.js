import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import config from 'config';
import Role from "../models/role.model.js";



const authController = {
    register:async (req,res)=>{
        const {name,email,password,role} = req.body;

        let user = await User.find({ email }).exec();
        if(user.length) return res.status(400).send({message:"this email is alredy exist"});
      
        //req.body name , email , pass , roleid 
        if(role){
        let roles = await Role.findById(role).exec();
        if(roles){
  
        let createdUser = new User(req.body);
        await createdUser.save();

        return res.status(201).send({ message: 'User created successfully!', user : createdUser });
        }
        return res.status(404).send({ message: 'invalid role id' });
        }else{
        let createdUser = new User(req.body);
        await createdUser.save();
        return res.status(201).send({ message: 'User created successfully!', user : createdUser });
        }
    },
    login:async (req,res)=>{ 
        const {email,password} = req.body;
        //check user exist
        let [user] = await User.find({ email }).populate('role').exec(); 
        if(!user) return res.status(400).send({message:"Email or password is incorrect"});
        //compare pass
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send({message:"Email or password is incorrect"});

        //create token
        const payload = { userId: user._id , email:user.email , role:user.role.name};
        const token = user.generateToken(payload, '1h'); 
        res.setHeader(config.get('token.tokenKeyInHeader'),token)
        res.status(200).send({ message: 'Login successful' });        
    },
    allUsers:async(req,res)=>{  
        try {
            
            let allUsers = await User.find({}).populate({
                path: 'role',
                select: 'name  -_id' // specify the properties you want to include
              }).exec();
            res.send(allUsers);
          } catch (err) {
            console.error(err);
          }
    }
};

export default authController; 