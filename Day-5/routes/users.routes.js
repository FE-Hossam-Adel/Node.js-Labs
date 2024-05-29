import {Router} from "express";
import config from "config";
import jwt from "jsonwebtoken";
import authController from "../controllers/auth.controller.js";
import authorization from "../middlewares/authorization.js";


const userRouter = Router();

userRouter.get('/users',authorization(['super_admin']), authController.allUsers );



export default userRouter;