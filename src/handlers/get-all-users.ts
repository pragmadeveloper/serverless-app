import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { Messages } from '../constants/messages'
import { httpResponses } from '../utils/http-responses'
import { getAllUsersHttpAdapter } from '../infrastructure/driving/users/get-all-users.adapter'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const usersFound = await getAllUsersHttpAdapter(event)

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: httpResponses._200_OK(usersFound)
    })
  } catch (error: any) {
    if (error.message === Messages.SERVICE_UNAVAILABLE) {
      return responseMessage({
        statusCode: StatusCodes.OPERATION_SUCCESSFUL,
        body: httpResponses._503_SERVICE_UNAVAILABLE()
      })
    }

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: httpResponses._500_UNCONTROLLER_ERROR()
    })
  }
}
