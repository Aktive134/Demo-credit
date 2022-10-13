import { Router } from "express" 
import accountController from "./accounts.controller"

const {
    createWallet,
    generateAccountNumber,
    getAccount
} = accountController

const accountRouter = Router() 

accountRouter.post("/create-wallet", createWallet) 
accountRouter.get("/generate-accountNo", generateAccountNumber)
accountRouter.get("/account", getAccount)


export default accountRouter