import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { Messages } from '../constants/messages'
import { updateBookByIdHttpAdapter } from '../infrastructure/driving/books/update-book-by-id.adapter '
import { httpResponses } from '../utils/http-responses'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const bookUpdate = await updateBookByIdHttpAdapter(event)

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: httpResponses._200_OK(bookUpdate)
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