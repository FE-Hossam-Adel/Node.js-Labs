import mongoose from 'mongoose';
import config from 'config';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uri = config.get('database.connectionString');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri)
    .then(async() => {
        console.log('Connected to MongoDB');
        const roles= await Role.find({}).exec();
        if(!roles.length){
            const rolesData = await Role.create([
                {name:'super_admin'},
                {name:'user'},
                ])
                fs.readFile(path.join(__dirname,'../config/development.json'),'utf-8',(err,data)=>{
                    let envVars = JSON.parse(data);
                    let databaseInfo = {...envVars.database, superAdminId:rolesData[0]._id,defaultRoleId:rolesData[1]._id, };
                    envVars = {...envVars , database:databaseInfo}
                    fs.writeFile(path.join(__dirname,'../config/development.json'),JSON.stringify(envVars),async (err)=>{
                        if(!err){
                            const dbUsers = await User.find({}).exec();
                            if(!dbUsers.length){
                                const superAdmin =  User({
                                    name:"admin",  
                                    email:"admin@admin.com",
                                    password:envVars.database.superAdminPassword,
                                    role:envVars.database.superAdminId
                                }) 
                                await superAdmin.save(); 
                            }                        } 
                    })
    
                }) 
        }
    })
    .catch((err) => { 
        console.error('Error connecting to MongoDB:', err); 
    });
