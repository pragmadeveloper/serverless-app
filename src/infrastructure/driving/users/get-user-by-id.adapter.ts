import { APIGatewayProxyEventV2 } from "aws-lambda";
import { extractQueryParameters } from "../../../utils/utils";
import { UserDynamoDBRepository } from "../../driven/repositorys/users/users.dynamo.repository";
import { GetUserById } from "../../../domain/usecases/get-user-by-id.usecase";


const userRespository = new UserDynamoDBRepository()
const getUserByIdUseCase = new GetUserById(userRespository)

export const getUserByIdHttpAdapter = async (event: APIGatewayProxyEventV2) => {
  try {
    const {id_user} = extractQueryParameters(event)
    const user = await getUserByIdUseCase.invoke(id_user!)
    return user
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}