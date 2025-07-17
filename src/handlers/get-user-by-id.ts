import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { Messages } from '../constants/messages'
import { httpResponses } from '../utils/http-responses'
import { getUserByIdHttpAdapter } from '../infrastructure/driving/users/get-user-by-id.adapter'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const userFound = await getUserByIdHttpAdapter(event)

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: httpResponses._200_OK(userFound)
    })
  } catch (error: any) {
    if (error.message === 'Must specify Id') {
      return responseMessage({
        statusCode: StatusCodes.OPERATION_SUCCESSFUL,
        body: httpResponses._400_BAD_REQUEST( 'Must specify book id')
      })
    }

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