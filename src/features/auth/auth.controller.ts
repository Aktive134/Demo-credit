import { NextFunction, Request, Response } from 'express'
import ApplicationError from '../../common/error-handler/ApplicationError'
import ModelService from '../../provider/model.service'
import bcrypt from 'bcrypt'
import Config from '../../config'
import Constant from '../../constant'
import NotAuthorizeError from '../../common/error-handler/NotAuthorizeError'
import generateToken from '../../lib/generate-token'
import BadRequestError from '../../common/error-handler/BadRequestError'
import { v4 } from 'uuid'

const userServices = new ModelService('users')
const Messages = Constant.messages

class AuthController {
  async createHandler (req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body
      const iuser = await userServices.findOne({ email: email })

      if (iuser.length) {
        return next(new BadRequestError(Messages.userExist))
      }
      const id = v4()
      const salt = await bcrypt.genSalt(Config.saltFactor)
      const hashedPassword = await bcrypt.hash(password, salt)

      await userServices.create({
        id,
        name: username,
        email,
        password: hashedPassword,
      })

      const [user] = await userServices.findOne({ id })
      res.status(201).json({
        message: Messages.userCreated,
        data: {
          id: user.id,
          email: user.email,
        },
        status: true,
      })
    } catch (error: any) {
      return next(new ApplicationError(error.message))
    }
  }

  async loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return next(new BadRequestError('Incorrect email or password'))
      }
      const [ user ] = await userServices.findOne({ email })
      const correctPassword = await bcrypt.compare(password, user.password)

      if (!user || !correctPassword) {
        res.set(
          'WWW-Authenticate',
          'Basic realm=Access to login token, charset=UTF-8',
        )
        return next(new NotAuthorizeError('Invalid Login Credentials'))
      }

      const { id, name } = user

      const userTokenData: Record<string, any> = {
        id,
        email,
        username: name,
      }
      const token = generateToken(userTokenData) as string
      const userData: Record<string, any> = {
        id: user.id,
        username: name,
        email,
      }
      res.status(200).json({
        message: Messages.loginSuccess,
        data: {
          token,
          user: userData,
        },
        status: true,
      })
    } catch (error: any) {
      return next(new ApplicationError(error))
    }
  }

  async logoutHandler(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.payload = null
      res.locals.token = null

      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Logout successful',
      })
    } catch (error: any) {
      return next(new ApplicationError(error))
    }
  }
}

export default new AuthController()