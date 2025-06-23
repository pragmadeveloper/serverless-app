import { APIGatewayProxyResultV2 } from 'aws-lambda'

/**
 * Generates a standardized HTTP response for AWS API Gateway.
 *
 * @param {Object} params - Parameters for constructing the response.
 * @param {number} params.statusCode - The HTTP status code of the response.
 * @param {any} [params.body] - Optional response body. If provided, it will be stringified as JSON.
 * 
 * @returns {APIGatewayProxyResultV2} An object representing the HTTP response with
 * headers, status code, and optional body.
 */
export const responseMessage = ({
    statusCode,
    body
  }: {
    statusCode: number
    body?: any
  }): APIGatewayProxyResultV2 => {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}