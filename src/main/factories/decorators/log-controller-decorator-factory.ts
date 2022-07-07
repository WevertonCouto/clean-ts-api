import { LogMongoRepository } from '../../../infra/database/mongodb/log/log-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator => {
  const logMongoRepository = new LogMongoRepository()
  const logControllerDecorator = new LogControllerDecorator(controller, logMongoRepository)
  return logControllerDecorator
}
