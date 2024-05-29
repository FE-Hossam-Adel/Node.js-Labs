import {Router} from "express";
import authController from "../controllers/auth.controller.js";
import validator from "../middlewares/validator.mw.js";
import userValidator, { loginValidatorSchema, registerValidatorSchema } from "../utils/schemas/user.validator.js";
const authRouter = Router();

authRouter.post('/register', validator(userValidator(registerValidatorSchema)) , authController.register );
authRouter.post('/login', validator(userValidator(loginValidatorSchema)) , authController.login );



export default authRouter;