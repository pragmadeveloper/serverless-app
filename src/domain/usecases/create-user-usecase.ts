import { CreateUserModel } from './../models/create-user-model';
import { Messages } from '../../constants/messages';
import { ServiceUnavailableError } from '../../utils/service-unavailable-error';
import { ValidationError } from '../../utils/validation-error';
import { IUserRepository } from '../../infrastructure/driven/repositorys/users/users.dynamo.interface';


export class CreateUserUseCase {

  constructor (private readonly userRespository: IUserRepository) {}

  async invoke (user: CreateUserModel) {
    try {
      console.log('ingreso a usecase');
      const newUser = await this.userRespository.createUser(user)
      return newUser

    } catch (error: any) {
      if (error.message === 'Must specify required data') throw new ValidationError(error.message)

      if (error.message === Messages.SERVICE_UNAVAILABLE) throw new ServiceUnavailableError(Messages.SERVICE_UNAVAILABLE)

      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}