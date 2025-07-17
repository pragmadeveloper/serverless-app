import { APIGatewayProxyEventV2 } from "aws-lambda";
import { extractBody } from "../../../utils/utils";
import { UserDynamoDBRepository } from "../../driven/repositorys/users/users.dynamo.repository";
import { CreateUserUseCase } from "../../../domain/usecases/create-user-usecase";

const userRespository = new UserDynamoDBRepository()
const userCreateUseCase = new CreateUserUseCase(userRespository)

export const createUserHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    const {name, email, gender} = extractBody(_event)
    const userCreated = await userCreateUseCase.invoke({name,email,gender})
    return userCreated
  } catch (error: any) {
     console.log('error adapter');
    throw new Error(error.message)
  }
}