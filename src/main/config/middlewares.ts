import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/content-type'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
