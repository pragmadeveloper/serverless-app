import { APIGatewayProxyEventV2 } from "aws-lambda";

/**
 * Extracts and parses the JSON body from an AWS API Gateway event.
 *
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * 
 * @returns {Record<string, any>} The parsed body as an object. Returns an empty object if the body is not present.
 */
export const extractBody = (event: APIGatewayProxyEventV2) => {
  return event.body ? JSON.parse(event.body) : {}
}

/**
 * Extracts and parses the JSON queryStringParameters from an AWS API Gateway event.
 *
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * 
 * @returns {Record<string, any>} The parsed queryStringParameters as an object. Returns an empty object if the queryStringParameters is not present.
 */
export const extractQueryParameters = (event: APIGatewayProxyEventV2) => {
  return event.queryStringParameters ?? {}
}