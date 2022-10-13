import { Router } from "express" 
import transController from "./transactions.controller"
import validateAmount from "../../middleware/validate-amount"

const {
    fundAccount,
    withdrawFunds,
    transferFunds
} = transController

const transactionRouter = Router() 

transactionRouter.post("/fund", validateAmount, fundAccount)
transactionRouter.post("/withdraw", validateAmount, withdrawFunds)
transactionRouter.post("/transfer", transferFunds) 

export default transactionRouter