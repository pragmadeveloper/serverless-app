import { APIGatewayProxyEventV2 } from "aws-lambda";
import { BookDynamoDBRepository } from "../../driven/repositorys/books/books.dynamo.repository";
import { CreateBooktUseCase } from "../../../domain/usecases/create-book.usecase";
import { extractBody } from "../../../utils/utils";

const bookRespository = new BookDynamoDBRepository()
const bookCreateUseCase = new CreateBooktUseCase(bookRespository)

export const createBookHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    
    const {documentTypeAndNumber,title,description} = extractBody(_event)

    const postCreated = await bookCreateUseCase.invoke({documentTypeAndNumber,title,description})

    return postCreated
  
} catch (error: any) {
    throw new Error(error.message)
  }
}