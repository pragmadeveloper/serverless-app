import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { UserDynamoDBRepository } from '../../driven/repositorys/users/users.dynamo.repository'
import { GetAllUsers } from '../../../domain/usecases/get-all-users.usecase'

const userRepository = new UserDynamoDBRepository()
const getAllUsesUseCase = new GetAllUsers(userRepository)

export const getAllUsersHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    const usersFound = await getAllUsesUseCase.invoke()
    return usersFound
  } catch (error: any) {
    throw new Error(error.message)
  }
}