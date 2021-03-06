import { Express } from 'express'
import { cors, bodyParser, contentType } from '../middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
