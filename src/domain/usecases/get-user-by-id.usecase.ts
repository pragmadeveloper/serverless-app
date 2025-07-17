import { Messages } from "../../constants/messages"
import { IUserRepository } from "../../infrastructure/driven/repositorys/users/users.dynamo.interface"
import { ServiceUnavailableError } from "../../utils/service-unavailable-error"
import { ValidationError } from "../../utils/validation-error"


export class GetUserById {

  constructor(private readonly userRespository: IUserRepository) { }

  async invoke(userId: string) {
    try {

    if (!userId) {
            throw new ValidationError('Must specify bookId')
        }
      const book = await this.userRespository.getUserById(userId)
      return book
    } catch (error: any) {
      if (error.message === 'Must specify bookId') {
        throw new ValidationError(error.message)
      }

      if (error.message === Messages.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)
      }

      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}