import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION
})

export const dynamoClient = DynamoDBDocumentClient.from(dynamoDBClient, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true
  },
  unmarshallOptions: {
    convertWithoutMapWrapper: true,
    wrapNumbers: false
  }
})