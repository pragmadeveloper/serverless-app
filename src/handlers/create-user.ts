import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { Messages } from '../constants/messages'
import { httpResponses } from '../utils/http-responses'
import { createUserHttpAdapter } from '../infrastructure/driving/users/create-user.adapter'

export const handler = async (event: APIGatewayProxyEventV2) => {
  
  try {
    console.log('ingreso a handler');
    const createUser = await createUserHttpAdapter(event)
    
    return responseMessage({statusCode: StatusCodes.OPERATION_SUCCESSFUL,body: httpResponses._200_OK(createUser)})
  
  } catch (error: any) {
    console.log('error handler', error);
    if (error.message === 'Must specify required data') {
      return responseMessage({
        statusCode: StatusCodes.OPERATION_SUCCESSFUL,
        body: httpResponses._400_BAD_REQUEST(undefined, 'Must specify required data')
      })
    }
    if (error.message === Messages.SERVICE_UNAVAILABLE) {
      return responseMessage({statusCode: StatusCodes.SERVICE_NOT_AVAILABLE,body: httpResponses._503_SERVICE_UNAVAILABLE()})
    }
    return responseMessage({statusCode: StatusCodes.UNCONTROLLER_ERROR,body: httpResponses._500_UNCONTROLLER_ERROR()})
  }
}