import { Messages } from "../../constants/messages"
import { IUserRepository } from "../../infrastructure/driven/repositorys/users/users.dynamo.interface"
import { ServiceUnavailableError } from "../../utils/service-unavailable-error"


export class GetAllUsers {

  constructor(private readonly userRespository: IUserRepository) { }

  async invoke() {
    try {
        const users = await this.userRespository.getAllUsers()
        return users
    } catch (error: any) {

      if (error.message === Messages.SERVICE_UNAVAILABLE) throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)

      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}