import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const hello = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '¡Hola desde tu función Serverless de TypeScript creada manualmente!',
        input: event,
      },
      null,
      2
    ),
  };
};