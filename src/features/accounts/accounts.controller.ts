import { NextFunction, Request, Response } from 'express'
import ApplicationError from '../../common/error-handler/ApplicationError'
import ModelService from '../../provider/model.service'
import Constant from '../../constant'
import BadRequestError from '../../common/error-handler/BadRequestError'
import Chance from 'chance'

const accountServices = new ModelService('accounts')
const Messages = Constant.messages

class AccountController {
  async createWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals.payload
      const { account_number } = req.body

      const [hasAccount] = await accountServices.findOne({ user_id: id })

      if (hasAccount)
        return next(
          new BadRequestError(
            `User has a registered account: ${hasAccount.account_number}`,
          ),
        )

      const data = {
        user_id: id,
        account_number,
        balance: 0,
      }
      await accountServices.create(data)
      const [accountDetails] = await accountServices.findOne({ user_id: id })

      res.status(201).json({
        message: Messages.accountAdded,
        data: {
          'Account details': {
              user_id: accountDetails.user_id,
              account_number: accountDetails.account_number,
              balance: accountDetails.balance
          }
        },
        status: true,
      });
    } catch (error: any) {
      return next(new ApplicationError(error.message))
    }
  }

  async generateAccountNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const chance = new Chance()
      const userID = res.locals.payload.id
      const accountNo = chance.natural({ min: 5000000000, max: 5099999999 })
      const [isExisting] = await accountServices.findOne({
        account_number: accountNo,
      })
      const [userHasAccount] = await accountServices.findOne({
        user_id: userID,
      })

      if (isExisting)
        return next(new BadRequestError(Messages.generateAccountError))
      if (userHasAccount)
        return next(
          new BadRequestError(
            `User has a registered account: ${userHasAccount.account_number}`,
          ),
        )

      res.status(200).json({
        message: Messages.generateAccount,
        data: {
          'Account number': accountNo,
        },
        status: true,
      })
    } catch (error: any) {
      return next(new ApplicationError(error.message))
    }
  }
  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = res.locals.payload.id
      const [userHasAccount] = await accountServices.findOne({
        user_id: userID,
      })

      if (!userHasAccount) {
        return next(new BadRequestError(Messages.noAccount))
      }

      res.status(200).json({
        message: 'Fetched successfully',
        data: {
          'Account details': userHasAccount,
        },
        status: true,
      })
    } catch (error: any) {
      return next(new ApplicationError(error.message))
    }
  }
}

export default new AccountController()