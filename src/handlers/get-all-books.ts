import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { getAllBooksHttpAdapter } from '../infrastructure/driving/books/get-all-books.adapter'
import { Messages } from '../constants/messages'
import { httpResponses } from '../utils/http-responses'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const booksFound = await getAllBooksHttpAdapter(event)

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: httpResponses._200_OK(booksFound)
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
