//imports
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import "./utils/dbConnention.js"

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
//variables
const app = express();



//middlwares
app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1',userRouter) 




app.listen(3000 ,()=>console.log("http://localhost:3000"))