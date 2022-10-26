import { Router } from "express" 
import authController from "./auth.controller"
import validateLoginData from "../../middleware/validate-user-login"
import validateSignupData from "../../middleware/validate-user-signUp"

const { createHandler, loginHandler, logoutHandler } = authController;

const authRouter = Router()

authRouter.post("/sign-up", validateSignupData, createHandler);
authRouter.post("/login", validateLoginData, loginHandler);
authRouter.get("/logout", logoutHandler);

export default authRouter